"use client";

/**
 * Estado de la reservación — SIMULADO.
 *
 * Vive solo en memoria y en `sessionStorage` del navegador. No hay backend,
 * base de datos ni sesión: al cerrar la pestaña se pierde.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { extras as todosLosExtras, getExtra } from "@/data/extras";
import { getPaquete } from "@/data/paquetes";

export type DatosCliente = {
  nombre: string;
  telefono: string;
  email: string;
  edadFestejado: string;
  ninos: string;
  comentarios: string;
};

export type EstadoReserva = {
  paquete: string | null;
  fecha: string | null;
  horario: string | null;
  extras: string[];
  datos: DatosCliente;
};

const DATOS_VACIOS: DatosCliente = {
  nombre: "",
  telefono: "",
  email: "",
  edadFestejado: "",
  ninos: "",
  comentarios: "",
};

const INICIAL: EstadoReserva = {
  paquete: null,
  fecha: null,
  horario: null,
  extras: [],
  datos: DATOS_VACIOS,
};

const LLAVE = "piccolo:reserva";

type Ctx = {
  reserva: EstadoReserva;
  listo: boolean;
  setPaquete: (slug: string) => void;
  setFecha: (fecha: string | null) => void;
  setHorario: (hora: string | null) => void;
  alternarExtra: (id: string) => void;
  setDatos: (parcial: Partial<DatosCliente>) => void;
  reiniciar: () => void;
};

const ReservaContext = createContext<Ctx | null>(null);

export function ProveedorReserva({ children }: { children: ReactNode }) {
  const [reserva, setReserva] = useState<EstadoReserva>(INICIAL);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    try {
      const guardado = sessionStorage.getItem(LLAVE);
      if (guardado) setReserva({ ...INICIAL, ...JSON.parse(guardado) });
    } catch {
      /* sessionStorage puede no estar disponible */
    }
    setListo(true);
  }, []);

  useEffect(() => {
    if (!listo) return;
    try {
      sessionStorage.setItem(LLAVE, JSON.stringify(reserva));
    } catch {
      /* ignorar */
    }
  }, [reserva, listo]);

  const setPaquete = useCallback((slug: string) => {
    setReserva((r) => {
      if (r.paquete === slug) return r;
      // Al cambiar de paquete se conservan fecha, horario y datos; solo se
      // depuran los extras que no aplican al paquete nuevo.
      const validos = new Set(todosLosExtras.map((e) => e.id));
      return { ...r, paquete: slug, extras: r.extras.filter((e) => validos.has(e)) };
    });
  }, []);

  const setFecha = useCallback((fecha: string | null) => {
    setReserva((r) => (r.fecha === fecha ? r : { ...r, fecha, horario: null }));
  }, []);

  const setHorario = useCallback((horario: string | null) => {
    setReserva((r) => ({ ...r, horario }));
  }, []);

  const alternarExtra = useCallback((id: string) => {
    setReserva((r) => ({
      ...r,
      extras: r.extras.includes(id) ? r.extras.filter((e) => e !== id) : [...r.extras, id],
    }));
  }, []);

  const setDatos = useCallback((parcial: Partial<DatosCliente>) => {
    setReserva((r) => ({ ...r, datos: { ...r.datos, ...parcial } }));
  }, []);

  const reiniciar = useCallback(() => setReserva(INICIAL), []);

  const valor = useMemo(
    () => ({ reserva, listo, setPaquete, setFecha, setHorario, alternarExtra, setDatos, reiniciar }),
    [reserva, listo, setPaquete, setFecha, setHorario, alternarExtra, setDatos, reiniciar],
  );

  return <ReservaContext.Provider value={valor}>{children}</ReservaContext.Provider>;
}

export function useReserva() {
  const ctx = useContext(ReservaContext);
  if (!ctx) throw new Error("useReserva debe usarse dentro de <ProveedorReserva>");
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Cálculo del total                                                  */
/* ------------------------------------------------------------------ */

export type RenglonTotal = { concepto: string; detalle?: string; importe: number };

export type Desglose = {
  ninos: number;
  ninosCobrados: number;
  bajoMinimo: boolean;
  renglones: RenglonTotal[];
  subtotalPaquete: number;
  subtotalExtras: number;
  total: number;
  anticipo: number;
};

export function calcularDesglose(reserva: EstadoReserva, porcentajeAnticipo = 50): Desglose | null {
  const paquete = reserva.paquete ? getPaquete(reserva.paquete) : null;
  if (!paquete) return null;

  const pedidos = parseInt(reserva.datos.ninos, 10);
  const ninos = Number.isFinite(pedidos) && pedidos > 0 ? pedidos : paquete.minNinos;
  const ninosCobrados = Math.max(ninos, paquete.minNinos);

  const subtotalPaquete = ninosCobrados * paquete.precioPorNino;

  const renglones: RenglonTotal[] = [
    {
      concepto: `Paquete ${paquete.nombre}`,
      detalle: `${ninosCobrados} niños × ${paquete.precioPorNino.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
        maximumFractionDigits: 0,
      })}`,
      importe: subtotalPaquete,
    },
  ];

  let subtotalExtras = 0;
  for (const id of reserva.extras) {
    const extra = getExtra(id);
    if (!extra) continue;
    const importe = extra.tipo === "porNino" ? extra.precio * ninosCobrados : extra.precio;
    subtotalExtras += importe;
    renglones.push({
      concepto: extra.nombre,
      detalle: extra.tipo === "porNino" ? `${ninosCobrados} × $${extra.precio}` : undefined,
      importe,
    });
  }

  const total = subtotalPaquete + subtotalExtras;

  return {
    ninos,
    ninosCobrados,
    bajoMinimo: ninos < paquete.minNinos,
    renglones,
    subtotalPaquete,
    subtotalExtras,
    total,
    anticipo: Math.round((total * porcentajeAnticipo) / 100),
  };
}

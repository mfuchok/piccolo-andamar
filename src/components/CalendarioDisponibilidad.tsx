"use client";

import { useMemo, useState } from "react";
import {
  ETIQUETA_ESTADO,
  MESES_DEMO,
  aISO,
  getDia,
  type EstadoDia,
} from "@/data/disponibilidad";
import { nombreMes } from "@/lib/formato";
import { FlechaIzq, Flecha } from "./Iconos";

const DIAS_CORTOS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

/** Punto sólido para la leyenda. */
const PUNTO: Record<EstadoDia, string> = {
  disponible: "bg-ok",
  pocos: "bg-medio",
  lleno: "bg-no/70",
  cerrado: "bg-tinta-suave/40",
};

/** Relleno pastel del día dentro del calendario. */
const RELLENO: Record<EstadoDia, string> = {
  disponible: "bg-ok-fondo text-tinta hover:ring-2 hover:ring-ok/35",
  pocos: "bg-medio-fondo text-tinta hover:ring-2 hover:ring-medio/40",
  lleno: "bg-no-fondo/70 text-no/70",
  cerrado: "bg-arena/60 text-tinta-suave/60",
};

export default function CalendarioDisponibilidad({
  seleccionada,
  alSeleccionar,
  diasSemana,
}: {
  seleccionada: string | null;
  alSeleccionar: (fecha: string) => void;
  /** Días en que aplica el paquete elegido. Sin valor, todos aplican. */
  diasSemana?: number[];
}) {
  const [indiceMes, setIndiceMes] = useState(() => {
    if (!seleccionada) return 0;
    const i = MESES_DEMO.findIndex(
      (m) => `${m.anio}-${String(m.mes + 1).padStart(2, "0")}` === seleccionada.slice(0, 7),
    );
    return i >= 0 ? i : 0;
  });

  const { anio, mes } = MESES_DEMO[indiceMes];

  const celdas = useMemo(() => {
    const primero = new Date(anio, mes, 1);
    // getDay(): 0 domingo … 6 sábado → la semana empieza en lunes
    const offset = (primero.getDay() + 6) % 7;
    const totalDias = new Date(anio, mes + 1, 0).getDate();
    const lista: ({ fecha: string; numero: number; estado: EstadoDia; aplica: boolean } | null)[] =
      [];
    for (let i = 0; i < offset; i++) lista.push(null);
    for (let d = 1; d <= totalDias; d++) {
      const dia = new Date(anio, mes, d);
      const fecha = aISO(dia);
      const aplica = !diasSemana || diasSemana.includes(dia.getDay());
      lista.push({ fecha, numero: d, estado: getDia(fecha).estado, aplica });
    }
    return lista;
  }, [anio, mes, diasSemana]);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-serif text-[20px] tracking-[-0.02em]">
          {nombreMes(mes).charAt(0).toUpperCase() + nombreMes(mes).slice(1)} {anio}
        </h2>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIndiceMes((i) => Math.max(0, i - 1))}
            disabled={indiceMes === 0}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-borde text-tinta-media transition-colors duration-200 hover:border-tinta-suave hover:text-tinta disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-borde"
          >
            <span className="sr-only">Mes anterior</span>
            <FlechaIzq />
          </button>
          <button
            type="button"
            onClick={() => setIndiceMes((i) => Math.min(MESES_DEMO.length - 1, i + 1))}
            disabled={indiceMes === MESES_DEMO.length - 1}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-borde text-tinta-media transition-colors duration-200 hover:border-tinta-suave hover:text-tinta disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-borde"
          >
            <span className="sr-only">Mes siguiente</span>
            <Flecha />
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-7 text-center text-[11px] uppercase tracking-[0.1em] text-tinta-suave">
        {DIAS_CORTOS.map((d) => (
          <div key={d} className="pb-2">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5">
        {celdas.map((celda, i) => {
          if (!celda) return <div key={`v${i}`} aria-hidden="true" />;
          const activa = seleccionada === celda.fecha;
          const bloqueada = !celda.aplica || celda.estado === "lleno" || celda.estado === "cerrado";
          const motivo = !celda.aplica
            ? "El paquete elegido no aplica este día"
            : ETIQUETA_ESTADO[celda.estado];
          return (
            <button
              key={celda.fecha}
              type="button"
              disabled={bloqueada}
              onClick={() => alSeleccionar(celda.fecha)}
              aria-pressed={activa}
              aria-label={`${celda.numero} de ${nombreMes(mes)} — ${motivo}`}
              className={`flex aspect-square items-center justify-center ${
                bloqueada ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <span
                className={`flex h-[38px] w-[38px] items-center justify-center rounded-full text-[14.5px] transition-all duration-200 sm:h-[42px] sm:w-[42px] ${
                  activa
                    ? "bg-tinta text-crema"
                    : !celda.aplica
                      ? "text-tinta-suave/35"
                      : RELLENO[celda.estado]
                }`}
              >
                <span className="numeros-tabulares">{celda.numero}</span>
              </span>
            </button>
          );
        })}
      </div>

      <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-borde pt-5 text-[12.5px] text-tinta-media">
        {(["disponible", "pocos", "lleno"] as const).map((e) => (
          <li key={e} className="flex items-center gap-2">
            <span aria-hidden="true" className={`h-[6px] w-[6px] rounded-full ${PUNTO[e]}`} />
            {ETIQUETA_ESTADO[e]}
          </li>
        ))}
        {diasSemana && diasSemana.length < 7 && (
          <li className="flex items-center gap-2 text-tinta-suave">
            <span aria-hidden="true" className="h-[6px] w-[6px] rounded-full border border-borde" />
            El paquete no aplica
          </li>
        )}
      </ul>
    </div>
  );
}

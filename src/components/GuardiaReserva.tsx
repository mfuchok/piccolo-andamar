"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useReserva } from "@/lib/reserva";
import { Flecha } from "./Iconos";

/**
 * Evita que alguien llegue a un paso del flujo sin haber elegido lo anterior.
 * En vez de redirigir en silencio, explica qué falta.
 */
export default function GuardiaReserva({
  requiere,
  children,
}: {
  requiere: ("paquete" | "fecha" | "horario" | "datos")[];
  children: ReactNode;
}) {
  const { reserva, listo } = useReserva();

  if (!listo) {
    return <div className="contenedor py-24" aria-busy="true" />;
  }

  const falta =
    (requiere.includes("paquete") && !reserva.paquete) ||
    (requiere.includes("fecha") && !reserva.fecha) ||
    (requiere.includes("horario") && !reserva.horario)
      ? "fecha"
      : requiere.includes("datos") && !reserva.datos.nombre.trim()
        ? "datos"
        : null;

  if (falta === "fecha") {
    return (
      <div className="contenedor py-24 sm:py-32">
        <p className="eyebrow">Falta un paso</p>
        <h1 className="titular mt-5">Primero elige paquete, fecha y horario.</h1>
        <p className="mt-6 max-w-[48ch] text-[16px] leading-relaxed text-tinta-media">
          Para armar tu estimado necesitamos saber qué paquete te interesa y cuándo quieres
          celebrar.
        </p>
        <Link href="/disponibilidad" className="boton mt-9">
          Consulta tu fecha <Flecha />
        </Link>
      </div>
    );
  }

  if (falta === "datos") {
    return (
      <div className="contenedor py-24 sm:py-32">
        <p className="eyebrow">Falta un paso</p>
        <h1 className="titular mt-5">Nos faltan tus datos.</h1>
        <p className="mt-6 max-w-[48ch] text-[16px] leading-relaxed text-tinta-media">
          Déjanos tu nombre y un teléfono para poder preparar el resumen de tu fiesta.
        </p>
        <Link href="/reservar/datos" className="boton mt-9">
          Ir al formulario <Flecha />
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}

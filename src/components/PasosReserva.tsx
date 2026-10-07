"use client";

import Link from "next/link";
import { useReserva } from "@/lib/reserva";

const PASOS = [
  { n: 1, texto: "Paquete", href: "/paquetes" },
  { n: 2, texto: "Fecha", href: "/disponibilidad" },
  { n: 3, texto: "Horario", href: "/disponibilidad" },
  { n: 4, texto: "Extras", href: "/reservar/extras" },
  { n: 5, texto: "Tus datos", href: "/reservar/datos" },
  { n: 6, texto: "Resumen", href: "/reservar/resumen" },
];

/** Indicador discreto del avance. Los pasos ya completados son navegables. */
export default function PasosReserva({ actual }: { actual: number }) {
  const { reserva } = useReserva();

  const alcanzado = (n: number) => {
    if (n <= actual) return true;
    if (n === 2) return Boolean(reserva.paquete);
    if (n === 3) return Boolean(reserva.fecha);
    if (n === 4) return Boolean(reserva.horario);
    if (n === 5) return Boolean(reserva.horario);
    if (n === 6) return Boolean(reserva.datos.nombre);
    return false;
  };

  return (
    <nav aria-label="Pasos de la reservación" className="overflow-x-auto">
      <ol className="flex min-w-max items-center gap-x-6 gap-y-2 text-[12.5px] sm:gap-x-8">
        {PASOS.map((p) => {
          const activo = p.n === actual;
          const navegable = alcanzado(p.n) && !activo;
          const contenido = (
            <>
              <span className="numeros-tabulares tabular-nums">{p.n}</span>
              <span>{p.texto}</span>
            </>
          );
          return (
            <li key={p.n}>
              {navegable ? (
                <Link
                  href={p.href}
                  className="flex items-center gap-2 text-tinta-media transition-colors duration-200 hover:text-tinta"
                >
                  {contenido}
                </Link>
              ) : (
                <span
                  aria-current={activo ? "step" : undefined}
                  className={`flex items-center gap-2 ${
                    activo ? "text-tinta" : "text-tinta-suave/70"
                  }`}
                >
                  {contenido}
                  {activo && (
                    <span aria-hidden="true" className="ml-0.5 h-[3px] w-[3px] rounded-full bg-naranja" />
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

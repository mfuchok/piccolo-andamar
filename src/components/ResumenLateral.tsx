"use client";

import Image from "next/image";
import { getPaquete, portada } from "@/data/paquetes";
import { getDia } from "@/data/disponibilidad";
import { negocio } from "@/data/negocio";
import { fechaMedia, mxn } from "@/lib/formato";
import { calcularDesglose, useReserva } from "@/lib/reserva";
import { Calendario, Ninos, Reloj } from "./Iconos";

export default function ResumenLateral({ compacto = false }: { compacto?: boolean }) {
  const { reserva } = useReserva();
  const paquete = reserva.paquete ? getPaquete(reserva.paquete) : null;
  const desglose = calcularDesglose(reserva, negocio.anticipoPorcentaje);
  if (!paquete || !desglose) return null;

  // Mientras `imagenes` esté vacía no hay miniatura y el bloque se queda solo
  // con el nombre y el precio; al añadir fotos aparece sin tocar nada.
  const miniatura = portada(paquete);

  const horario = reserva.fecha && reserva.horario
    ? getDia(reserva.fecha).horarios.find((h) => h.hora === reserva.horario)
    : null;

  return (
    <div className="rounded-[14px] border border-borde bg-marfil p-7 sm:p-8">
      <p className="eyebrow-neutro">Resumen</p>

      <div className="mt-5 flex items-center gap-4">
        {miniatura && (
          <div className="relative h-[54px] w-[72px] shrink-0 overflow-hidden rounded-[12px] bg-arena">
            <Image src={miniatura} alt="" fill sizes="72px" className="object-cover" />
          </div>
        )}
        <div className="min-w-0">
          <p className="font-serif text-[20px] leading-tight tracking-[-0.02em]">
            Paquete {paquete.nombre}
          </p>
          <p className="numeros-tabulares text-[13px] text-tinta-suave">
            {mxn(paquete.precioPorNino)} por niño
          </p>
        </div>
      </div>

      <ul className="mt-7 space-y-3 border-t border-borde pt-6 text-[14px]">
        {reserva.fecha && (
          <li className="flex items-center gap-3">
            <Calendario className="shrink-0 text-tinta-suave" />
            {fechaMedia(reserva.fecha)}
          </li>
        )}
        {horario && (
          <li className="flex items-center gap-3">
            <Reloj className="shrink-0 text-tinta-suave" />
            {horario.etiqueta} · {paquete.horas} horas
          </li>
        )}
        <li className="flex items-center gap-3">
          <Ninos className="shrink-0 text-tinta-suave" />
          {desglose.ninosCobrados} niños
          {desglose.bajoMinimo && (
            <span className="text-[12.5px] text-tinta-suave">(mínimo del paquete)</span>
          )}
        </li>
      </ul>

      {!compacto && (
        <dl className="mt-6 space-y-2.5 border-t border-borde pt-6 text-[14px]">
          {desglose.renglones.map((r) => (
            <div key={r.concepto} className="flex items-baseline justify-between gap-4">
              <dt className="text-tinta-media">
                {r.concepto}
                {r.detalle && (
                  <span className="block text-[12px] text-tinta-suave">{r.detalle}</span>
                )}
              </dt>
              <dd className="numeros-tabulares shrink-0">{mxn(r.importe)}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-borde pt-6">
        <p className="text-[14px] text-tinta-media">Total estimado</p>
        <p className="numeros-tabulares font-serif text-[26px] tracking-[-0.02em]">
          {mxn(desglose.total)}
        </p>
      </div>

      <p className="mt-4 text-[12px] leading-relaxed text-tinta-suave">
        Resumen informativo. La disponibilidad y el precio final se confirman por WhatsApp.
      </p>
    </div>
  );
}

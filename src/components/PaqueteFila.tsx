import Image from "next/image";
import Link from "next/link";
import { ACENTO, desde, type Paquete } from "@/data/paquetes";
import { mxn } from "@/lib/formato";
import { Calendario, Flecha, Ninos, Reloj } from "./Iconos";

/** Fila editorial para la página de paquetes. */
export default function PaqueteFila({
  paquete,
  invertida = false,
}: {
  paquete: Paquete;
  invertida?: boolean;
}) {
  return (
    <article className="relative isolate">
      <span
        aria-hidden="true"
        className={`absolute top-6 hidden h-28 w-28 rounded-full lg:block ${
          invertida ? "right-[-28px]" : "left-[-28px]"
        }`}
        style={{ background: ACENTO[paquete.acento], zIndex: -1 }}
      />

      <Link
        href={`/paquetes/${paquete.slug}`}
        className="foto-zoom group grid items-center gap-7 md:grid-cols-12 md:gap-10 lg:gap-14"
      >
        <div
          className={`relative aspect-4/5 overflow-hidden rounded-[16px] bg-arena md:col-span-5 ${
            invertida ? "md:order-2 md:col-start-8" : ""
          }`}
        >
          <Image
            src={paquete.imagen}
            alt={`Montaje de una fiesta del paquete ${paquete.nombre} en Piccolo`}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
          {paquete.privado && (
            <span className="absolute left-3 top-3 rounded-full bg-crema/92 px-3 py-1 text-[11px] font-medium text-tinta backdrop-blur-xs">
              Evento privado
            </span>
          )}
        </div>

        <div className={`md:col-span-6 ${invertida ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}>
          <h2 className="titular">{paquete.nombre}</h2>
          <p className="mt-3.5 max-w-[46ch] text-[15.5px] leading-relaxed text-tinta-media">
            {paquete.descripcion}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            <li className="pildora">
              <Ninos className="h-[15px] w-[15px]" /> {paquete.minNinos} a {paquete.maxNinos} niños
            </li>
            <li className="pildora">
              <Reloj className="h-[15px] w-[15px]" /> {paquete.horas} horas
            </li>
            <li className="pildora">
              <Calendario className="h-[15px] w-[15px]" /> {paquete.dias}
            </li>
            <li className="pildora">Edades {paquete.edades.replace("De ", "")}</li>
          </ul>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-5 border-t border-borde pt-5">
            <div>
              <p className="numeros-tabulares font-serif text-[27px] leading-none tracking-[-0.02em]">
                {mxn(desde(paquete))}
              </p>
              <p className="mt-1.5 text-[12.5px] text-tinta-suave">
                {mxn(paquete.precioPorNino)} por niño · mínimo {paquete.minNinos}
              </p>
            </div>
            <span className="enlace-flecha">
              Ver el paquete <Flecha />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

import Link from "next/link";
import CarruselPaquete from "./CarruselPaquete";
import { ACENTO, desde, type Paquete } from "@/data/paquetes";
import { mxn } from "@/lib/formato";
import { Flecha } from "./Iconos";

/**
 * Tarjeta fotográfica de paquete. Es la pieza con la que una mamá compara
 * visualmente en el inicio: foto grande, nombre, capacidad y precio desde.
 * Toda la tarjeta es el enlace; no lleva botón.
 */
export default function PaqueteTarjeta({ paquete }: { paquete: Paquete }) {
  return (
    <Link href={`/paquetes/${paquete.slug}`} className="group relative block">
      <span
        aria-hidden="true"
        className="absolute -right-3 -top-3 h-16 w-16 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: ACENTO[paquete.acento], zIndex: -1 }}
      />

      {/* La proporción vive en este contenedor, no en las fotos: así se pueden
          añadir o quitar imágenes sin que la tarjeta cambie de tamaño. */}
      <div className="foto-zoom relative aspect-4/5 overflow-hidden rounded-[16px] bg-arena">
        <CarruselPaquete
          imagenes={paquete.imagenes}
          alt={`Montaje de una fiesta del paquete ${paquete.nombre} en Piccolo`}
          acento={ACENTO[paquete.acento]}
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 32vw"
        />
        {paquete.privado && (
          <span className="absolute left-3 top-3 rounded-full bg-crema/92 px-3 py-1 text-[11px] font-medium tracking-[0.04em] text-tinta backdrop-blur-xs">
            Evento privado
          </span>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="titular-sm">{paquete.nombre}</h3>
          <span
            aria-hidden="true"
            className="h-[7px] w-[7px] shrink-0 rounded-full"
            style={{ background: ACENTO[paquete.acento] }}
          />
        </div>
        <p className="mt-1.5 text-[13px] text-tinta-suave">
          Hasta {paquete.maxNinos} niños · {paquete.horas} horas
        </p>
        <div className="mt-3 flex items-end justify-between gap-3 border-t border-borde-suave pt-3">
          <p className="numeros-tabulares text-[15px]">
            <span className="text-tinta-suave">Desde </span>
            <span className="font-serif text-[20px] tracking-[-0.01em]">{mxn(desde(paquete))}</span>
          </p>
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-borde text-tinta-media transition-colors duration-300 group-hover:border-naranja group-hover:bg-naranja group-hover:text-white"
          >
            <Flecha />
          </span>
        </div>
      </div>
    </Link>
  );
}

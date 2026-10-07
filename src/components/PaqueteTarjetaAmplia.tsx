import Link from "next/link";
import CarruselPaquete from "./CarruselPaquete";
import { ACENTO, desde, type Paquete } from "@/data/paquetes";
import { mxn } from "@/lib/formato";
import { Calendario, Flecha, Globo, Ninos, Palomita, Reloj } from "./Iconos";

/**
 * Tarjeta de paquete para la página dedicada.
 *
 * Es la hermana mayor de `PaqueteTarjeta` (inicio): mismo lenguaje —foto arriba,
 * pastel del paquete, precio desde—, pero con descripción y los datos completos
 * que aquí sí se comparan. Toda la tarjeta es el enlace.
 *
 * Las fotos se leen de `paquete.imagenes` a través de `CarruselPaquete`: mientras
 * el array esté vacío se dibuja el marcador pastel, y en cuanto se añadan rutas la
 * tarjeta empieza a alternarlas sola, sin tocar este componente.
 */
export default function PaqueteTarjetaAmplia({
  paquete,
  destacado = false,
}: {
  paquete: Paquete;
  /** Dibuja el distintivo "Más solicitado". Lo decide la página, no los datos. */
  destacado?: boolean;
}) {
  const acento = ACENTO[paquete.acento];

  return (
    <div className="group/tarjeta relative isolate h-full">
      {/* Círculo pastel que asoma por la esquina al pasar el cursor */}
      <span
        aria-hidden="true"
        className="absolute -right-3 -top-3 -z-10 h-20 w-20 rounded-full opacity-0 transition-opacity duration-500 group-hover/tarjeta:opacity-100"
        style={{ background: acento }}
      />

      <Link
        href={`/paquetes/${paquete.slug}`}
        className="foto-zoom relative flex h-full flex-col overflow-hidden rounded-[24px] border border-borde-suave bg-marfil transition-colors duration-300 hover:border-borde"
      >
        {/* La proporción vive en el contenedor, no en las fotos: añadir o quitar
            imágenes nunca cambia la altura de la tarjeta. */}
        <div className="relative aspect-4/3 overflow-hidden">
          <CarruselPaquete
            imagenes={paquete.imagenes}
            alt={`Montaje de una fiesta del paquete ${paquete.nombre} en Piccolo`}
            acento={acento}
            sizes="(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 31vw"
          />
          {destacado && (
            <span
              className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.13em] text-tinta"
              style={{ background: acento }}
            >
              Más solicitado
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="titular-sm">{paquete.nombre}</h2>
            <span
              aria-hidden="true"
              className="h-[7px] w-[7px] shrink-0 rounded-full"
              style={{ background: acento }}
            />
          </div>

          <p className="mt-3 text-[14.5px] leading-relaxed text-tinta-media">
            {paquete.descripcion}
          </p>

          {/* `mt-auto` ancla datos, precio y llamada al pie: las tres tarjetas
              los alinean entre sí aunque la descripción tenga otro largo. */}
          <div className="mt-auto pt-6">
            <ul className="flex flex-wrap gap-2">
              <li className="pildora bg-crema">
                <Ninos className="h-[15px] w-[15px]" /> {paquete.minNinos} a {paquete.maxNinos} niños
              </li>
              <li className="pildora bg-crema">
                <Reloj className="h-[15px] w-[15px]" /> {paquete.horas} horas
              </li>
              <li className="pildora bg-crema">
                <Calendario className="h-[15px] w-[15px]" /> {paquete.dias}
              </li>
              <li className="pildora bg-crema">
                <Globo className="h-[15px] w-[15px]" /> Edades {paquete.edades.replace("De ", "")}
              </li>
              {paquete.privado && (
                <li className="pildora text-tinta" style={{ background: acento }}>
                  <Palomita className="h-[14px] w-[14px]" /> Evento privado
                </li>
              )}
            </ul>

            <div className="mt-5 border-t border-borde-suave pt-5">
              <p className="numeros-tabulares flex items-baseline gap-2">
                <span className="text-[13px] text-tinta-suave">Desde</span>
                <span className="font-serif text-[27px] leading-none tracking-[-0.022em]">
                  {mxn(desde(paquete))}
                </span>
              </p>
              <p className="numeros-tabulares mt-2 text-[12.5px] text-tinta-suave">
                {mxn(paquete.precioPorNino)} por niño · mínimo {paquete.minNinos} niños
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="text-[14.5px] text-tinta transition-colors duration-300 group-hover/tarjeta:text-naranja">
                Ver paquete
              </span>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-borde text-tinta-media transition-colors duration-300 group-hover/tarjeta:border-naranja group-hover/tarjeta:bg-naranja group-hover/tarjeta:text-white"
              >
                <Flecha />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

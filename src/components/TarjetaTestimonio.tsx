import Image from "next/image";
import { PASTEL_TESTIMONIO, type Testimonio } from "@/data/testimonios";
import { Estrella } from "./Iconos";

/** Las cinco estrellas de la valoración. Siempre cinco: no hay media variable. */
function Estrellas() {
  return (
    <span className="flex items-center gap-[3px] text-medio" role="img" aria-label="Cinco de cinco estrellas">
      {[0, 1, 2, 3, 4].map((i) => (
        <Estrella key={i} />
      ))}
    </span>
  );
}

/**
 * Tarjeta de testimonio.
 *
 * El avatar y el nombre encabezan la pieza, pero quien manda es la reseña.
 * Mientras `foto` sea nula se dibujan las iniciales sobre el pastel del
 * testimonio; en cuanto haya ruta, la fotografía ocupa el mismo círculo.
 */
export default function TarjetaTestimonio({ testimonio }: { testimonio: Testimonio }) {
  const pastel = PASTEL_TESTIMONIO[testimonio.acento];

  return (
    <figure
      className="rounded-[18px] border border-borde-suave bg-marfil p-6 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-[3px] hover:border-borde sm:p-7"
      style={
        testimonio.tinte
          ? { backgroundColor: `color-mix(in srgb, ${pastel} 45%, white)` }
          : undefined
      }
    >
      <div className="flex items-center gap-3.5">
        <span
          className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full text-[13px] font-medium tracking-[0.03em] text-tinta-media"
          style={{ background: pastel }}
        >
          {testimonio.foto ? (
            <Image
              src={testimonio.foto}
              alt=""
              fill
              sizes="44px"
              className="object-cover"
            />
          ) : (
            <span aria-hidden="true">{testimonio.iniciales}</span>
          )}
        </span>

        <div>
          <figcaption className="text-[15px] text-tinta">{testimonio.nombre}</figcaption>
          <Estrellas />
        </div>
      </div>

      <blockquote className="mt-5 text-[14.5px] leading-relaxed text-tinta-media">
        {testimonio.texto}
      </blockquote>

      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-tinta-suave">
        {testimonio.celebracion}
      </p>
    </figure>
  );
}

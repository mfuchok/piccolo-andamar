import Image from "next/image";
import Link from "next/link";
import { Flecha } from "./Iconos";
import { PASTEL_TAGS, type Categoria } from "@/data/conocenos";

/** Tono del marcador de posición mientras no hay fotografía. */
const MARCADOR = "#f3eee7";

/**
 * Tarjeta de categoría. Toda la tarjeta es el enlace; «Ver más» es la pista
 * visual, no un segundo control.
 *
 * `destacada` solo cambia la proporción de la imagen: vertical para la tarjeta
 * grande, apaisada para las dos de la columna derecha.
 */
export default function TarjetaCategoria({
  categoria,
  destacada = false,
}: {
  categoria: Categoria;
  destacada?: boolean;
}) {
  const { titulo, texto, imagen, alt, marcador, acento, href, tags } = categoria;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col focus-visible:outline-none"
      aria-label={`${titulo} — ver más`}
    >
      <div
        className={`relative overflow-hidden rounded-[18px] ${
          destacada
            ? "aspect-4/5 md:aspect-3/2 lg:aspect-4/5"
            : "aspect-16/10 lg:aspect-auto lg:min-h-[180px] lg:flex-1"
        } group-focus-visible:outline-2 group-focus-visible:outline-offset-3 group-focus-visible:outline-naranja`}
        style={{ backgroundColor: MARCADOR }}
      >
        {imagen ? (
          <Image
            src={imagen}
            alt={alt}
            fill
            sizes={destacada ? "(max-width: 1024px) 100vw, 48vw" : "(max-width: 1024px) 100vw, 48vw"}
            className="object-cover transition-transform duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.035]"
          />
        ) : (
          <>
            {/* Marcador de posición. Desaparece en cuanto `imagen` tenga ruta. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 transition-transform duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.035]"
              style={{
                background: `radial-gradient(120% 90% at 70% 15%, ${acento} 0%, transparent 62%)`,
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="rounded-full bg-crema/70 px-4 py-1.5 text-[11.5px] uppercase tracking-[0.14em] text-tinta-suave">
                {marcador}
              </span>
            </span>
          </>
        )}
      </div>

      <div className="pt-5">
        <h3 className="titular-sm transition-transform duration-300 ease-out group-hover:translate-x-[3px]">
          {titulo}
        </h3>
        <p className="mt-2 max-w-[42ch] text-[14.5px] leading-relaxed text-tinta-media">{texto}</p>

        {tags && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {tags.map((t, i) => (
              <li
                key={t}
                className="rounded-full px-3 py-1 text-[12px] text-tinta"
                style={{ background: PASTEL_TAGS[i % PASTEL_TAGS.length] }}
              >
                {t}
              </li>
            ))}
          </ul>
        )}

        <span className="mt-5 inline-flex items-center gap-2 border-b border-borde pb-[3px] text-[13.5px] text-tinta-media transition-colors duration-300 group-hover:border-naranja group-hover:text-naranja">
          Ver más
          <Flecha className="transition-transform duration-300 group-hover:translate-x-[3px]" />
        </span>
      </div>
    </Link>
  );
}

import Image from "next/image";
import { ACENTO_EXPERIENCIA, type Experiencia } from "@/data/experiencias";

/**
 * Tarjeta de área.
 *
 * Arriba la zona de imagen, siempre con la misma proporción; debajo el nombre
 * y la descripción. La zona de arriba lee `imagenes`:
 *
 *   0 fotos → marcador: un degradado del pastel del área, sin texto ni icono.
 *   1 o más → se muestra la primera.
 *
 * Con varias fotos el sitio está listo para encadenarlas: la proporción vive en
 * el contenedor y las capas van en absoluto, así que añadir el crossfade aquí
 * no mueve el resto de la tarjeta.
 */
export default function TarjetaExperiencia({
  experiencia,
  sizes,
  prioridad = false,
}: {
  experiencia: Experiencia;
  sizes: string;
  prioridad?: boolean;
}) {
  const portada = experiencia.imagenes[0] ?? null;
  const acento = ACENTO_EXPERIENCIA[experiencia.acento];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[18px] border border-borde-suave bg-marfil">
      <div className="relative aspect-16/10 overflow-hidden bg-crema">
        {portada ? (
          <Image
            src={portada}
            alt={experiencia.alt}
            fill
            priority={prioridad}
            sizes={sizes}
            className="object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: `radial-gradient(130% 100% at 72% 12%, ${acento} 0%, transparent 70%)`,
            }}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="titular-sm">{experiencia.nombre}</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-tinta-media">
          {experiencia.descripcion}
        </p>
      </div>
    </article>
  );
}

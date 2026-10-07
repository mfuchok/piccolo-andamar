import Image from "next/image";
import { ilustracionFaq } from "@/data/faq";

/**
 * Tarjeta de la columna izquierda de preguntas frecuentes.
 *
 * La ilustración ocupa toda la tarjeta como fondo y el texto se apoya abajo a
 * la izquierda sobre un degradado cálido. Mientras no haya imagen, el fondo es
 * una mezcla pastel; al rellenar `ilustracionFaq.src` no hay que tocar nada más.
 */
export default function TarjetaFaq() {
  const { src, alt } = ilustracionFaq;

  return (
    <div className="relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden rounded-[22px] md:min-h-[320px]">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 70% at 72% 18%, var(--color-lavanda) 0%, transparent 60%)," +
              "radial-gradient(85% 65% at 18% 8%, var(--color-durazno) 0%, transparent 58%)," +
              "linear-gradient(180deg, #f6f0f6 0%, #f9efe6 100%)",
          }}
        />
      )}

      {/* Degradado de legibilidad: apenas se nota sobre el pastel y hace su
          trabajo en cuanto haya fotografía debajo. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-3/5"
        style={{
          background:
            "linear-gradient(180deg, rgba(253,250,246,0) 0%, rgba(253,250,246,0.72) 52%, rgba(253,250,246,0.94) 100%)",
        }}
      />

      {!src && (
        <span className="absolute left-1/2 top-9 -translate-x-1/2 rounded-full bg-crema/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] text-tinta-suave md:top-14">
          Ilustración
        </span>
      )}

      <div className="relative p-7 md:p-8">
        <p className="eyebrow">Dudas</p>
        <h2 className="titular mt-3">Preguntas frecuentes.</h2>
      </div>
    </div>
  );
}

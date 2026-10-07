"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";
import type { TemaFaq } from "@/data/faq";

/** Pastel de cada tema, rebajado casi hasta el blanco. */
const FONDO: Record<TemaFaq["acento"], string> = {
  cielo: "color-mix(in srgb, var(--color-cielo) 34%, white)",
  durazno: "color-mix(in srgb, var(--color-durazno) 34%, white)",
  lavanda: "color-mix(in srgb, var(--color-lavanda) 34%, white)",
};

/**
 * Bloque temático de preguntas.
 *
 * La tarjeta agrupa; las preguntas van una debajo de otra separadas por una
 * línea, sin caja propia. Solo una abierta a la vez dentro del mismo tema.
 *
 * El panel se abre con `grid-template-rows` de 0fr a 1fr: la altura se anima
 * sola, sin medir nada y sin el salto de un `hidden`. Cerrado va `inert`, así
 * que ni el teclado ni los lectores de pantalla entran en él.
 */
export default function TarjetaTemaFaq({
  tema,
  decoracion,
}: {
  tema: TemaFaq;
  /** Forma pastel que asoma por la esquina. La decide la página. */
  decoracion?: ReactNode;
}) {
  const [abierta, setAbierta] = useState<string | null>(null);
  const id = useId();

  return (
    <div className="relative isolate">
      {decoracion}

      <section
        className="rounded-[26px] border border-borde-suave px-6 pb-3 pt-7 sm:px-7 sm:pt-8"
        style={{ background: FONDO[tema.acento] }}
        aria-labelledby={`${id}-titulo`}
      >
        <p className="eyebrow-neutro">{tema.eyebrow}</p>
        <h2 id={`${id}-titulo`} className="titular-sm mt-2.5">
          {tema.titulo}
        </h2>

        <div className="mt-6">
          {tema.preguntas.map((p, i) => {
            const activa = abierta === p.id;
            return (
              <div
                key={p.id}
                className={i === 0 ? "" : "border-t border-borde-suave"}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setAbierta(activa ? null : p.id)}
                    aria-expanded={activa}
                    aria-controls={`${id}-${p.id}`}
                    className="flex w-full items-start justify-between gap-5 py-4 text-left"
                  >
                    <span className="text-[14.5px] leading-snug text-tinta sm:text-[15px]">
                      {p.pregunta}
                    </span>
                    {/* Una cruz girada 45° es el mismo trazo que un «+». */}
                    <span
                      aria-hidden="true"
                      className={`relative mt-[3px] h-[13px] w-[13px] shrink-0 text-tinta-media transition-transform duration-300 ease-out ${
                        activa ? "rotate-45" : ""
                      }`}
                    >
                      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
                    </span>
                  </button>
                </h3>

                <div
                  id={`${id}-${p.id}`}
                  role="region"
                  inert={!activa}
                  className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${
                    activa ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-6 text-[14px] leading-relaxed text-tinta-media">
                      {p.respuesta}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

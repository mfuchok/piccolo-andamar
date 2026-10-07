"use client";

import { useId, useState } from "react";
import type { Pregunta } from "@/data/faq";

export default function Acordeon({ preguntas }: { preguntas: Pregunta[] }) {
  const [abierta, setAbierta] = useState<number | null>(null);
  const id = useId();

  return (
    <div className="border-t border-borde">
      {preguntas.map((p, i) => {
        const activa = abierta === i;
        return (
          <div key={p.pregunta} className="border-b border-borde">
            <h3>
              <button
                type="button"
                onClick={() => setAbierta(activa ? null : i)}
                aria-expanded={activa}
                aria-controls={`${id}-${i}`}
                className="flex w-full items-center justify-between gap-6 py-[18px] text-left"
              >
                <span className="text-[15.5px] leading-snug text-tinta sm:text-[16px]">
                  {p.pregunta}
                </span>
                <span
                  aria-hidden="true"
                  className="relative mt-1 h-[13px] w-[13px] shrink-0 text-tinta-media"
                >
                  <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                  <span
                    className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-300 ${
                      activa ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-${i}`}
              hidden={!activa}
              className="pb-6 pr-10 text-[14.5px] leading-relaxed text-tinta-media"
            >
              {p.respuesta}
            </div>
          </div>
        );
      })}
    </div>
  );
}

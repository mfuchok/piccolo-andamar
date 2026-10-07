"use client";

import Image from "next/image";
import { useState } from "react";
import Modal from "./Modal";
import { Play } from "./Iconos";

export default function SeccionVideo() {
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <section aria-label="Así se vive una fiesta en Piccolo">
        <button
          type="button"
          onClick={() => setAbierto(true)}
          className="group relative block aspect-4/3 w-full overflow-hidden bg-arena sm:aspect-16/9 lg:aspect-[2.5/1]"
        >
          <Image
            src="/piccolo/home/video-poster.jpg"
            alt="Niño jugando durante una fiesta en Piccolo"
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-tinta/70 via-tinta/20 to-tinta/5"
          />
          <span className="absolute inset-x-5 bottom-6 flex flex-col items-start gap-4 text-left sm:inset-x-10 sm:bottom-9 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <span className="font-serif text-[clamp(1.6rem,1.1rem+1.9vw,2.6rem)] leading-[1.06] tracking-[-0.02em] text-crema">
              Así se vive una
              <br />
              fiesta en Piccolo.
            </span>
            <span className="flex items-center gap-3 text-[14px] text-crema">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-crema/60 bg-crema/15 backdrop-blur-xs transition-colors duration-300 group-hover:bg-crema group-hover:text-tinta">
                <Play className="ml-0.5" />
              </span>
              Ver el video
            </span>
          </span>
        </button>
      </section>

      <Modal abierto={abierto} alCerrar={() => setAbierto(false)} titulo="Video" ancho="max-w-xl">
        <p className="eyebrow">Demostración</p>
        <h2 className="mt-3 font-serif text-[27px] leading-tight tracking-[-0.02em]">
          Aquí iría el video de Piccolo.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-tinta-media">
          En la versión final este espacio reproduce un video corto de una fiesta real: la llegada
          de los niños, las áreas de juego, el montaje y el momento del pastel. Para el prototipo
          mostramos una fotografía del parque.
        </p>
        <p className="mt-4 text-[13.5px] leading-relaxed text-tinta-suave">
          Necesitamos de la clienta un video horizontal de 30 a 60 segundos, o una selección de
          clips que podamos editar.
        </p>
      </Modal>
    </>
  );
}

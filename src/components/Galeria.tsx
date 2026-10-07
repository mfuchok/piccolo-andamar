"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { galeria, type Foto } from "@/data/galeria";
import { Cerrar, FlechaIzq, Flecha } from "./Iconos";

const RATIO: Record<Foto["ratio"], string> = {
  alto: "aspect-3/4",
  ancho: "aspect-4/3",
  cuadro: "aspect-square",
};

export default function Galeria({ fotos = galeria }: { fotos?: Foto[] }) {
  const [indice, setIndice] = useState<number | null>(null);

  const cerrar = useCallback(() => setIndice(null), []);
  const mover = useCallback(
    (paso: number) =>
      setIndice((i) => (i === null ? null : (i + paso + fotos.length) % fotos.length)),
    [fotos.length],
  );

  useEffect(() => {
    if (indice === null) return;
    document.body.style.overflow = "hidden";
    const alTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    window.addEventListener("keydown", alTecla);
    return () => {
      window.removeEventListener("keydown", alTecla);
      document.body.style.overflow = "";
    };
  }, [indice, cerrar, mover]);

  const activa = indice === null ? null : fotos[indice];

  return (
    <>
      {/* Mosaico irregular en columnas */}
      <div className="columns-2 gap-2.5 sm:columns-3 sm:gap-3 lg:columns-4">
        {fotos.map((f, i) => (
          <button
            key={f.src}
            type="button"
            onClick={() => setIndice(i)}
            className="foto-zoom group mb-2.5 block w-full overflow-hidden rounded-[12px] bg-arena sm:mb-3"
          >
            <span className={`relative block w-full ${RATIO[f.ratio]}`}>
              <Image
                src={f.src}
                alt={f.alt}
                fill
                priority={i === 0}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 24vw"
                className="object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-tinta/0 transition-colors duration-500 group-hover:bg-tinta/8"
              />
            </span>
            <span className="sr-only">Ampliar: {f.alt}</span>
          </button>
        ))}
      </div>

      {activa && (
        <div
          className="fixed inset-0 z-[95] flex flex-col bg-tinta/95 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="Galería de fotos"
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="numeros-tabulares text-[13px] text-crema/70">
              {indice! + 1} / {fotos.length}
            </p>
            <button
              type="button"
              onClick={cerrar}
              className="flex h-10 w-10 items-center justify-center rounded-full text-crema/80 transition-colors duration-200 hover:bg-crema/10 hover:text-crema"
            >
              <span className="sr-only">Cerrar galería</span>
              <Cerrar className="h-[18px] w-[18px]" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-20">
            <div className="relative h-full w-full">
              <Image
                src={activa.src}
                alt={activa.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 px-5 pb-7 sm:pb-9">
            <button
              type="button"
              onClick={() => mover(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-crema/30 text-crema transition-colors duration-200 hover:bg-crema hover:text-tinta"
            >
              <span className="sr-only">Foto anterior</span>
              <FlechaIzq className="h-4 w-4" />
            </button>
            <p className="max-w-[46ch] px-2 text-center text-[13px] text-crema/70">{activa.alt}</p>
            <button
              type="button"
              onClick={() => mover(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-crema/30 text-crema transition-colors duration-200 hover:bg-crema hover:text-tinta"
            >
              <span className="sr-only">Foto siguiente</span>
              <Flecha className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

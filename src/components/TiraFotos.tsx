"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Flecha, FlechaIzq } from "./Iconos";

export type FotoTira = { src: string; alt: string };

/**
 * Tira fotográfica horizontal.
 *
 * Se apoya en el scroll nativo —así el swipe táctil y el trackpad salen
 * gratis— y encima añade arrastre con el ratón y dos flechas. No hay bucle ni
 * avance automático: es una tira que se recorre, no un carrusel.
 */
export default function TiraFotos({
  fotos,
  etiqueta,
}: {
  fotos: FotoTira[];
  /** Nombre accesible de la región desplazable. */
  etiqueta: string;
}) {
  const pista = useRef<HTMLDivElement>(null);
  const [alInicio, setAlInicio] = useState(true);
  const [alFinal, setAlFinal] = useState(false);

  const asentar = useRef<number | undefined>(undefined);

  /**
   * El scroll-snap reajusta la posición después del último evento `scroll`, así
   * que además de leer al vuelo se vuelve a mirar cuando todo se ha quedado
   * quieto. Sin esa segunda lectura las flechas se quedan con el estado previo.
   */
  const revisarExtremos = useCallback(() => {
    const leer = () => {
      const el = pista.current;
      if (!el) return;
      setAlInicio(el.scrollLeft <= 1);
      setAlFinal(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
    };
    leer();
    window.clearTimeout(asentar.current);
    asentar.current = window.setTimeout(leer, 160);
  }, []);

  useEffect(() => {
    revisarExtremos();
    window.addEventListener("resize", revisarExtremos);
    return () => {
      window.clearTimeout(asentar.current);
      window.removeEventListener("resize", revisarExtremos);
    };
  }, [revisarExtremos]);

  /** Distancia entre el inicio de una foto y la siguiente. */
  const paso = () => {
    const el = pista.current;
    if (!el || el.children.length < 2) return el?.clientWidth ?? 0;
    return (
      (el.children[1] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft
    );
  };

  const mover = (direccion: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    el.scrollTo({ left: el.scrollLeft + direccion * paso(), behavior: "smooth" });
  };

  /* ---- Arrastre con el ratón; el táctil ya lo cubre el scroll nativo ---- */
  const arrastre = useRef<{ x: number; scroll: number } | null>(null);

  const alBajarPuntero = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = pista.current;
    if (!el) return;
    arrastre.current = { x: e.clientX, scroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };

  const alMoverPuntero = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = pista.current;
    if (!arrastre.current || !el) return;
    el.scrollLeft = arrastre.current.scroll - (e.clientX - arrastre.current.x);
  };

  const alSoltarPuntero = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = pista.current;
    if (!arrastre.current || !el) return;
    arrastre.current = null;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  const flecha =
    "flex h-9 w-9 items-center justify-center rounded-full border border-borde text-tinta-media transition-colors duration-200 hover:border-naranja hover:bg-naranja-claro hover:text-naranja disabled:cursor-default disabled:border-borde-suave disabled:text-tinta-suave disabled:hover:bg-transparent";

  return (
    <>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={() => mover(-1)} disabled={alInicio} className={flecha}>
          <span className="sr-only">Fotografía anterior</span>
          <FlechaIzq />
        </button>
        <button type="button" onClick={() => mover(1)} disabled={alFinal} className={flecha}>
          <span className="sr-only">Fotografía siguiente</span>
          <Flecha />
        </button>
      </div>

      <div
        ref={pista}
        role="region"
        aria-label={etiqueta}
        tabIndex={0}
        onScroll={revisarExtremos}
        onPointerDown={alBajarPuntero}
        onPointerMove={alMoverPuntero}
        onPointerUp={alSoltarPuntero}
        onPointerCancel={alSoltarPuntero}
        className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {fotos.map((f) => (
          <figure
            key={f.src}
            className="relative aspect-4/3 w-[82vw] shrink-0 snap-start overflow-hidden rounded-[16px] bg-arena sm:w-[46%] lg:w-[28%]"
          >
            <Image
              src={f.src}
              alt={f.alt}
              fill
              sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 29vw"
              className="object-cover"
              draggable={false}
            />
          </figure>
        ))}
      </div>
    </>
  );
}

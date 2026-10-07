"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import {
  PASTELES_EVENTO,
  PLACEHOLDERS,
  galeriaEventos,
  type FotoEvento,
} from "@/data/galeriaEventos";
import Link from "next/link";
import Aparece from "./Aparece";
import { Flecha, FlechaIzq } from "./Iconos";

const INTERVALO = 2000;
/** Tras tocar el carrusel, cuánto esperamos antes de reanudar el avance solo. */
const REANUDAR = 4000;
const MARCADOR = "#f3eee7";

type Tarjeta = { clave: string; foto: FotoEvento | null; pastel: string };

function construirTarjetas(): Tarjeta[] {
  if (galeriaEventos.length > 0) {
    return galeriaEventos.map((foto, i) => ({
      clave: foto.src,
      foto,
      pastel: PASTELES_EVENTO[i % PASTELES_EVENTO.length],
    }));
  }
  return Array.from({ length: PLACEHOLDERS }, (_, i) => ({
    clave: `marcador-${i}`,
    foto: null,
    pastel: PASTELES_EVENTO[i % PASTELES_EVENTO.length],
  }));
}

/**
 * Carrusel horizontal de eventos.
 *
 * Se apoya en el scroll nativo, así que el swipe táctil, el trackpad y el
 * scroll-snap salen gratis; encima añadimos arrastre con el ratón, flechas y
 * avance automático.
 *
 * El bucle infinito se consigue duplicando la lista: cuando el scroll pasa de
 * la mitad, se le resta esa mitad de golpe. Como el contenido en esa posición
 * es idéntico, el salto no se ve.
 */
export default function SeccionGaleria() {
  const tarjetas = construirTarjetas();
  const total = tarjetas.length;
  const pista = useRef<HTMLDivElement>(null);
  const temporizador = useRef<number | undefined>(undefined);
  const reanudacion = useRef<number | undefined>(undefined);
  const finAnimacion = useRef<number | undefined>(undefined);
  const finScroll = useRef<number | undefined>(undefined);
  const pausado = useRef(false);
  /** True mientras corre un desplazamiento nuestro, para no confundirlo con el del usuario. */
  const animando = useRef(false);

  /** Distancia entre el inicio de una tarjeta y la siguiente. */
  const paso = useCallback(() => {
    const el = pista.current;
    if (!el || el.children.length < 2) return el?.clientWidth ?? 0;
    return (
      (el.children[1] as HTMLElement).offsetLeft -
      (el.children[0] as HTMLElement).offsetLeft
    );
  }, []);

  /**
   * Mantiene el scroll dentro de la copia central. El ciclo mide
   * `paso × nº de tarjetas`, no la mitad del scrollWidth: esa última se queda
   * corta por el hueco que falta tras la última tarjeta y daría un salto.
   */
  const normalizar = useCallback(() => {
    const el = pista.current;
    if (!el) return;
    const ciclo = paso() * total;
    if (ciclo <= 0) return;
    // 1 px de holgura: sin ella, el redondeo subpíxel del scroll hace rebotar
    // la posición justo en el borde de la banda.
    if (el.scrollLeft >= 2 * ciclo - 1) el.scrollLeft -= ciclo;
    else if (el.scrollLeft < ciclo - 1) el.scrollLeft += ciclo;
  }, [paso, total]);

  const mover = useCallback(
    (direccion: 1 | -1) => {
      const el = pista.current;
      if (!el) return;
      const salto = paso();
      if (salto <= 0) return;

      // Siempre hay una copia entera a cada lado, así que podemos animar
      // directamente y recolocar cuando el movimiento termine.
      animando.current = true;
      window.clearTimeout(finAnimacion.current);
      finAnimacion.current = window.setTimeout(() => {
        animando.current = false;
        normalizar();
      }, 700);

      el.scrollTo({
        left: el.scrollLeft + direccion * salto,
        behavior: "smooth",
      });
    },
    [normalizar, paso],
  );

  /** Pausa el avance automático y lo reanuda un rato después. */
  const pausarUnMomento = useCallback(() => {
    pausado.current = true;
    window.clearTimeout(reanudacion.current);
    reanudacion.current = window.setTimeout(() => {
      pausado.current = false;
    }, REANUDAR);
  }, []);

  /**
   * Solo normaliza cuando el scroll se queda quieto y no lo hemos provocado
   * nosotros. No pausa: el autoplay también dispara `scroll` y se frenaría solo.
   */
  const alScroll = useCallback(() => {
    window.clearTimeout(finScroll.current);
    finScroll.current = window.setTimeout(() => {
      if (!animando.current) normalizar();
    }, 160);
  }, [normalizar]);

  useEffect(() => {
    const el = pista.current;
    if (!el) return;

    // Empezamos en la copia central para tener recorrido hacia los dos lados.
    const ciclo = paso() * total;
    if (ciclo > 0 && el.scrollLeft < 1) el.scrollLeft = ciclo;

    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");

    const arrancar = () => {
      window.clearInterval(temporizador.current);
      // Sin desbordamiento no hay nada que pasar.
      if (consulta.matches || el.scrollWidth <= el.clientWidth + 8) return;
      temporizador.current = window.setInterval(() => {
        if (!pausado.current) mover(1);
      }, INTERVALO);
    };

    arrancar();
    consulta.addEventListener("change", arrancar);
    window.addEventListener("resize", arrancar);
    return () => {
      window.clearInterval(temporizador.current);
      window.clearTimeout(reanudacion.current);
      window.clearTimeout(finAnimacion.current);
      window.clearTimeout(finScroll.current);
      consulta.removeEventListener("change", arrancar);
      window.removeEventListener("resize", arrancar);
    };
  }, [mover, paso, total]);

  /* ---- Arrastre con el ratón (táctil y trackpad ya los cubre el scroll) ---- */
  const arrastre = useRef<{ x: number; scroll: number } | null>(null);

  const alBajarPuntero = (e: React.PointerEvent<HTMLDivElement>) => {
    pausarUnMomento();
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
    if (el.hasPointerCapture(e.pointerId))
      el.releasePointerCapture(e.pointerId);
    normalizar();
  };

  return (
    <section
      className="contenedor seccion"
      onMouseEnter={() => {
        pausado.current = true;
      }}
      onMouseLeave={() => {
        pausado.current = false;
      }}
    >
      <Aparece className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div>
          <p className="eyebrow">Galería</p>
          <h2 className="titular mt-3">
            Momentos reales,
            <br className="hidden sm:block" /> fiestas inolvidables.
          </h2>
        </div>

        <div className="flex items-center gap-5">
          <Link href="/galeria" className="enlace-flecha">
            Ver la galería completa <Flecha />
          </Link>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                pausarUnMomento();
                mover(-1);
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-borde text-tinta-media transition-colors duration-200 hover:border-naranja hover:bg-naranja-claro hover:text-naranja"
            >
              <span className="sr-only">Fotografía anterior</span>
              <FlechaIzq />
            </button>
            <button
              type="button"
              onClick={() => {
                pausarUnMomento();
                mover(1);
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-borde text-tinta-media transition-colors duration-200 hover:border-naranja hover:bg-naranja-claro hover:text-naranja"
            >
              <span className="sr-only">Fotografía siguiente</span>
              <Flecha />
            </button>
          </div>
        </div>
      </Aparece>

      <Aparece className="mt-10" delay={60}>
        <div
          ref={pista}
          onScroll={alScroll}
          onWheel={pausarUnMomento}
          onPointerDown={alBajarPuntero}
          onPointerMove={alMoverPuntero}
          onPointerUp={alSoltarPuntero}
          onPointerCancel={alSoltarPuntero}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden"
        >
          {/* Tres copias: la del medio es la "real" y las otras dos dan
              recorrido a ambos lados para cerrar el bucle sin salto visible. */}
          {[...tarjetas, ...tarjetas, ...tarjetas].map((t, i) => {
            // Solo la copia central cuenta para lectores de pantalla.
            const copia = i < total || i >= total * 2;
            return (
              <figure
                key={`${t.clave}-${Math.floor(i / total)}`}
                aria-hidden={copia || undefined}
                className="relative aspect-4/5 w-[78%] shrink-0 snap-start overflow-hidden rounded-[16px] sm:w-[46%] lg:w-[30.5%]"
                style={{ backgroundColor: MARCADOR }}
              >
                {t.foto ? (
                  <Image
                    src={t.foto.src}
                    alt={copia ? "" : t.foto.alt}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 31vw"
                    className="object-cover"
                    draggable={false}
                  />
                ) : (
                  <>
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(120% 90% at 70% 15%, ${t.pastel} 0%, transparent 62%)`,
                      }}
                    />
                    <figcaption className="absolute inset-0 flex items-center justify-center">
                      <span className="rounded-full bg-crema/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] text-tinta-suave">
                        Imagen de evento
                      </span>
                    </figcaption>
                  </>
                )}
              </figure>
            );
          })}
        </div>
      </Aparece>
    </section>
  );
}

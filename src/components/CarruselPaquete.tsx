"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const INTERVALO = 2000;
const MARCADOR = "#f3eee7";

/**
 * Galería automática de la tarjeta de paquete.
 *
 * - Sin imágenes: marcador de posición.
 * - Una imagen: fija, sin animación.
 * - Dos o más: crossfade en bucle cada 2 s.
 *
 * Todas las capas van en absoluto dentro de un contenedor con proporción fija,
 * así que cambiar de foto nunca mueve el layout. Si el sistema pide reducir
 * movimiento, se queda en la primera.
 */
export default function CarruselPaquete({
  imagenes,
  alt,
  acento,
  sizes,
}: {
  imagenes: string[];
  alt: string;
  acento: string;
  sizes: string;
}) {
  const total = imagenes.length;
  const [activa, setActiva] = useState(0);

  useEffect(() => {
    if (total < 2) return;

    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    let id: number | undefined;

    const arrancar = () => {
      window.clearInterval(id);
      if (consulta.matches) {
        setActiva(0);
        return;
      }
      id = window.setInterval(() => setActiva((i) => (i + 1) % total), INTERVALO);
    };

    arrancar();
    consulta.addEventListener("change", arrancar);
    return () => {
      window.clearInterval(id);
      consulta.removeEventListener("change", arrancar);
    };
  }, [total]);

  if (total === 0) {
    return (
      <span className="absolute inset-0" style={{ backgroundColor: MARCADOR }}>
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 90% at 70% 15%, ${acento} 0%, transparent 62%)`,
          }}
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full bg-crema/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] text-tinta-suave">
            Imagen de paquete
          </span>
        </span>
      </span>
    );
  }

  return (
    <>
      {imagenes.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          aria-hidden={i === 0 ? undefined : true}
          fill
          sizes={sizes}
          priority={i === 0}
          className={`object-cover transition-opacity duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
            i === activa ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}

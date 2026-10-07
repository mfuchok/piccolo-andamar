import Image from "next/image";
import Link from "next/link";
import { Flecha } from "./Iconos";
import { negocio } from "@/data/negocio";

const CREMA = "253,250,246";

/**
 * Hero: la fotografía manda. Un solo archivo para las dos composiciones —
 * el recorte vertical de móvil se consigue con `object-position`, no con una
 * segunda imagen.
 */
const Contenido = () => (
  <div className="max-w-[320px] sm:max-w-[460px] lg:max-w-[560px]">
    <h1 className="titular-hero">
      Celebra
      <br />
      en grande
      <br />
      sus momentos
      <br />
      más pequeños.
    </h1>

    <div className="mt-8 flex flex-wrap items-center gap-3">
      <Link href="/paquetes" className="boton">
        Ver paquetes <Flecha />
      </Link>
      <a href="#conocenos" className="boton-linea">
        Conócenos
      </a>
    </div>

    <p className="mt-7 text-[12.5px] leading-relaxed text-tinta-suave">
      {negocio.edades.texto} · {negocio.direccion.corta}
    </p>
  </div>
);

export default function Hero() {
  return (
    <section className="relative isolate aspect-3/4 w-full overflow-hidden bg-arena sm:aspect-4/3 md:aspect-auto md:h-[clamp(540px,calc(100svh-140px),700px)]">
      <Image
        src="/piccolo/home/hero.jpg"
        alt="Niña sonriendo entre globos pastel durante una fiesta en Piccolo"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[64%_center] md:object-[62%_38%]"
      />

      {/* Velo cálido: en móvil entra desde abajo, en escritorio desde la izquierda */}
      <span
        aria-hidden="true"
        className="absolute inset-0 md:hidden"
        style={{
          background: `linear-gradient(180deg, rgba(${CREMA},0) 29%, rgba(${CREMA},0.66) 46%, rgba(${CREMA},0.95) 60%, rgba(${CREMA},1) 100%)`,
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 hidden md:block"
        style={{
          background: `linear-gradient(94deg, rgba(${CREMA},0.88) 0%, rgba(${CREMA},0.8) 26%, rgba(${CREMA},0.5) 44%, rgba(${CREMA},0.1) 62%, rgba(${CREMA},0) 75%)`,
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 hidden h-24 md:block"
        style={{
          background: `linear-gradient(180deg, rgba(${CREMA},0) 0%, rgba(${CREMA},1) 100%)`,
        }}
      />

      <div className="contenedor absolute inset-x-0 bottom-7 md:inset-y-0 md:bottom-0 md:flex md:items-center">
        <Contenido />
      </div>
    </section>
  );
}

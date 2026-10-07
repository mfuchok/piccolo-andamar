import Link from "next/link";
import Hero from "@/components/Hero";
import PaqueteTarjeta from "@/components/PaqueteTarjeta";
import SeccionVideo from "@/components/SeccionVideo";
import SeccionConocenos from "@/components/SeccionConocenos";
import SeccionGaleria from "@/components/SeccionGaleria";
import Acordeon from "@/components/Acordeon";
import TarjetaFaq from "@/components/TarjetaFaq";
import SeccionUbicacion from "@/components/SeccionUbicacion";
import Aparece from "@/components/Aparece";
import Proceso from "@/components/Proceso";
import { Arco, Confetis } from "@/components/Formas";
import { Flecha, Info } from "@/components/Iconos";
import { paquetes } from "@/data/paquetes";
import { faq } from "@/data/faq";
import { negocio } from "@/data/negocio";

export default function Inicio() {
  return (
    <>
      <Hero />

      <SeccionConocenos />

      {/* ---------------- Así de fácil ---------------- */}
      <section className="contenedor seccion">
        <Aparece>
          <p className="eyebrow-neutro">Paso a paso</p>
          <h2 className="titular mt-3">Así de fácil.</h2>
        </Aparece>

        <Proceso />
      </section>

      {/* ---------------- Paquetes ---------------- */}
      <section className="contenedor seccion relative isolate">
        <Confetis className="-right-6 top-0 hidden w-[120px] lg:block" />
        <Aparece className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <p className="eyebrow">Paquetes</p>
            <h2 className="titular mt-3">Encuentra la celebración perfecta.</h2>
          </div>
          <Link href="/paquetes" className="enlace-flecha">
            Ver el detalle de cada uno <Flecha />
          </Link>
        </Aparece>

        <Aparece className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {paquetes.map((p) => (
            <PaqueteTarjeta key={p.slug} paquete={p} />
          ))}
        </Aparece>

        <Aparece className="mt-7 flex items-center gap-3.5 rounded-[16px] bg-cielo px-4 py-4 sm:gap-5 sm:px-7 sm:py-5">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-crema/70 text-tinta-media sm:h-9 sm:w-9"
          >
            <Info />
          </span>
          <p className="text-[13px] leading-relaxed text-tinta sm:text-[14.5px]">
            El precio se cobra por niño e incluye un adulto acompañante por cada
            uno. La fecha se aparta con el {negocio.anticipoPorcentaje}% del
            total.
          </p>
        </Aparece>
      </section>

      {/* ---------------- Video ---------------- */}
      <div className="seccion">
        <SeccionVideo />
      </div>

      <SeccionGaleria />

      {/* ---------------- FAQ ---------------- */}
      <section className="contenedor seccion relative isolate">
        <Arco
          className="-left-14 top-24 hidden w-[130px] opacity-80 lg:block"
          color="var(--color-rosa)"
        />
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <Aparece className="md:col-span-4">
            <TarjetaFaq />
          </Aparece>
          <Aparece className="md:col-span-7 md:col-start-6" delay={70}>
            <Acordeon preguntas={faq.slice(0, 6)} />
          </Aparece>
        </div>
      </section>

      <SeccionUbicacion />
    </>
  );
}

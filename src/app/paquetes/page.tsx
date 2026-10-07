import type { Metadata } from "next";
import Link from "next/link";
import Encabezado from "@/components/Encabezado";
import Comparador from "@/components/Comparador";
import PaqueteTarjetaAmplia from "@/components/PaqueteTarjetaAmplia";
import Aparece from "@/components/Aparece";
import { Flecha, Info } from "@/components/Iconos";
import { paquetes } from "@/data/paquetes";
import { mxn } from "@/lib/formato";
import { negocio } from "@/data/negocio";

export const metadata: Metadata = {
  title: "Paquetes de fiesta",
  description:
    "Tres paquetes de fiesta infantil en Piccolo Andamar: capacidad, duración, qué incluye cada uno y precio por niño.",
};

export default function Paquetes() {
  return (
    <>
      <Encabezado
        eyebrow="Paquetes"
        titulo={<>Encuentra la celebración perfecta.</>}
        anchoTexto="max-w-[62ch] lg:max-w-[900px]"
        texto="Tres formatos para tres tipos de fiesta. Todos incluyen las áreas de juego, alimentos para los niños y acompañamiento de nuestro equipo. El precio es por niño e incluye un adulto por cada uno."
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/paquetes", texto: "Paquetes" },
        ]}
      />

      <div className="contenedor mt-9 grid gap-6 sm:mt-11 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {paquetes.map((p, i) => (
          <Aparece key={p.slug} className="h-full" delay={i * 70}>
            <PaqueteTarjetaAmplia paquete={p} destacado={p.slug === "aventura"} />
          </Aparece>
        ))}
      </div>

      <section className="contenedor mt-16 sm:mt-20">
        <Aparece>
          <p className="eyebrow">Comparación</p>
          <h2 className="titular mt-5">Lado a lado.</h2>
        </Aparece>

        <Aparece className="mt-8 sm:mt-10">
          <Comparador />
        </Aparece>

        <Aparece className="mt-5 flex items-center gap-4 rounded-[20px] bg-cielo px-5 py-4 sm:gap-5 sm:px-7 sm:py-5">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-crema/70 text-tinta-media"
          >
            <Info />
          </span>
          <p className="text-[13.5px] leading-relaxed text-tinta sm:text-[14.5px]">
            <span className="font-medium">
              Niño o adulto adicional: {mxn(negocio.cargoPersonaExtra)} por persona.
            </span>{" "}
            La fecha se aparta con el {negocio.anticipoPorcentaje}% del total y el resto se liquida
            el día del evento.
          </p>
        </Aparece>

        <div className="mt-10">
          <Link href="/disponibilidad" className="enlace-flecha">
            Consulta tu fecha <Flecha />
          </Link>
        </div>
      </section>
    </>
  );
}

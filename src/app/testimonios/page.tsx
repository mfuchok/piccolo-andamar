import type { Metadata } from "next";
import Link from "next/link";
import Encabezado from "@/components/Encabezado";
import Aparece from "@/components/Aparece";
import TarjetaTestimonio from "@/components/TarjetaTestimonio";
import { Flecha } from "@/components/Iconos";
import { DEMO, testimonios } from "@/data/testimonios";

export const metadata: Metadata = {
  title: "Testimonios",
  description:
    "Lo que dicen las familias que han celebrado en Piccolo Andamar: organización, atención del equipo e instalaciones.",
};

export default function Testimonios() {
  return (
    <>
      <Encabezado
        eyebrow="Testimonios"
        titulo={
          <>
            Celebraciones que
            <br className="hidden sm:block" /> se quedan en la memoria.
          </>
        }
        anchoTexto="max-w-[70ch] lg:max-w-[820px]"
        texto="Lo que dicen las familias que han celebrado con nosotros."
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/testimonios", texto: "Testimonios" },
        ]}
      />

      {/* Columnas CSS en lugar de rejilla: cada tarjeta conserva el alto que le
          pide su propia reseña y no se estira para igualar a sus vecinas. */}
      <div className="contenedor mt-9 sm:mt-11">
        <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3">
          {testimonios.map((t, i) => (
            <Aparece
              key={t.id}
              delay={(i % 3) * 70}
              className="mb-4 break-inside-avoid sm:mb-5"
            >
              <TarjetaTestimonio testimonio={t} />
            </Aparece>
          ))}
        </div>

        {DEMO && (
          <p className="mt-7 text-[12.5px] leading-relaxed text-tinta-suave">
            Testimonios de ejemplo para esta demostración. Se sustituirán por reseñas reales de
            familias de Piccolo.
          </p>
        )}
      </div>

      {/* Cierre */}
      <section className="contenedor seccion">
        <Aparece className="flex flex-col items-start gap-5 rounded-[20px] bg-cielo px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-9 sm:py-8">
          <h2 className="font-serif text-[22px] leading-tight tracking-[-0.02em] sm:text-[26px]">
            ¿Listos para crear su propia celebración?
          </h2>
          <Link href="/disponibilidad" className="boton shrink-0">
            Consulta tu fecha <Flecha />
          </Link>
        </Aparece>
      </section>
    </>
  );
}

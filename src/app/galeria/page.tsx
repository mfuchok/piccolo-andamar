import type { Metadata } from "next";
import Link from "next/link";
import Encabezado from "@/components/Encabezado";
import Galeria from "@/components/Galeria";
import { Flecha } from "@/components/Iconos";
import { negocio } from "@/data/negocio";

export const metadata: Metadata = {
  title: "Galería",
  description:
    "Fotografías de fiestas, montajes y áreas de juego en Piccolo Andamar, Boca del Río.",
};

export default function PaginaGaleria() {
  return (
    <>
      <Encabezado
        eyebrow="Galería"
        titulo={
          <>
            Momentos reales,
            <br /> fiestas inolvidables.
          </>
        }
        texto="Montajes, áreas de juego y celebraciones en Piccolo. Da clic en cualquier foto para verla en grande."
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/galeria", texto: "Galería" },
        ]}
      />

      <div className="contenedor seccion-corta">
        <Galeria />
      </div>

      <section className="contenedor seccion">
        <div className="linea flex flex-wrap items-center justify-between gap-6 pt-10">
          <p className="max-w-[46ch] text-[15px] leading-relaxed text-tinta-media">
            Puedes ver más fotos del día a día en nuestro Instagram{" "}
            <a
              href={negocio.contacto.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors duration-200 hover:text-naranja"
            >
              @{negocio.contacto.instagram}
            </a>
            .
          </p>
          <Link href="/disponibilidad" className="enlace-flecha">
            Consulta tu fecha <Flecha />
          </Link>
        </div>
      </section>
    </>
  );
}

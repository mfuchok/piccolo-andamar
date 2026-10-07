import type { Metadata } from "next";
import Encabezado from "@/components/Encabezado";
import Aparece from "@/components/Aparece";
import TarjetaExperiencia from "@/components/TarjetaExperiencia";
import PanelAcceso from "@/components/PanelAcceso";
import { experiencias } from "@/data/experiencias";

export const metadata: Metadata = {
  title: "Experiencias",
  description:
    "Ciudad de juego, zona de altura, supermercado, cafetería y zona de bebés: las áreas de Piccolo en Plaza Andamar.",
};

/** Una por fila, tres por fila: la medida sigue a la rejilla. */
const SIZES = "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw";

export default function Experiencias() {
  return (
    <>
      <Encabezado
        eyebrow="Experiencias"
        titulo={
          <>
            Un mundo pequeño,
            <br className="hidden sm:block" /> hecho a su medida.
          </>
        }
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/experiencias", texto: "Experiencias" },
        ]}
      />

      {/* ---------------- Accesos ---------------- */}
      <div className="contenedor mt-9 sm:mt-12">
        <Aparece>
          <PanelAcceso />
        </Aparece>
      </div>

      {/* ---------------- Áreas ---------------- */}
      <section className="contenedor mt-12 sm:mt-16">
        <Aparece>
          <p className="eyebrow">Áreas de Piccolo</p>
          <h2 className="titular mt-3">Todo un mundo para jugar.</h2>
        </Aparece>

        <div className="mt-7 grid gap-5 sm:mt-9 sm:grid-cols-2 lg:grid-cols-3">
          {experiencias.map((e, i) => (
            <Aparece key={e.id} delay={(i % 3) * 60} className="h-full">
              <TarjetaExperiencia experiencia={e} sizes={SIZES} prioridad={i === 0} />
            </Aparece>
          ))}
        </div>
      </section>
    </>
  );
}

"use client";

import Link from "next/link";
import Encabezado from "@/components/Encabezado";
import PasosReserva from "@/components/PasosReserva";
import SelectorExtras from "@/components/SelectorExtras";
import ResumenLateral from "@/components/ResumenLateral";
import GuardiaReserva from "@/components/GuardiaReserva";
import { Flecha, FlechaIzq } from "@/components/Iconos";

export default function Extras() {
  return (
    <GuardiaReserva requiere={["paquete", "fecha", "horario"]}>
      <Encabezado
        eyebrow="Paso 4 de 6"
        titulo="Personaliza tu fiesta."
        texto="Todo lo de abajo es opcional. El total se actualiza conforme eliges, para que veas el estimado real antes de escribirnos."
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/disponibilidad", texto: "Consulta tu fecha" },
          { href: "/reservar/extras", texto: "Extras" },
        ]}
      />

      <div className="contenedor mt-10 border-y border-borde py-4">
        <PasosReserva actual={4} />
      </div>

      <div className="contenedor mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SelectorExtras />

          <div className="mt-10 flex flex-wrap items-center justify-between gap-5">
            <Link href="/disponibilidad" className="enlace-flecha">
              <FlechaIzq /> Cambiar fecha
            </Link>
            <Link href="/reservar/datos" className="boton">
              Continuar <Flecha />
            </Link>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <ResumenLateral />
          </div>
        </aside>
      </div>
    </GuardiaReserva>
  );
}

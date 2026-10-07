import Link from "next/link";
import { Flecha } from "@/components/Iconos";

export default function NoEncontrado() {
  return (
    <div className="contenedor py-28 sm:py-40">
      <p className="eyebrow-neutro">Error 404</p>
      <h1 className="titular mt-5">Esta página se fue a jugar.</h1>
      <p className="mt-6 max-w-[44ch] text-[16.5px] leading-relaxed text-tinta-media">
        No encontramos lo que buscabas. Vuelve al inicio o revisa nuestros paquetes de fiesta.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-7">
        <Link href="/" className="boton">
          Ir al inicio <Flecha />
        </Link>
        <Link href="/paquetes" className="enlace-flecha">
          Ver paquetes <Flecha />
        </Link>
      </div>
    </div>
  );
}

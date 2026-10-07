import Image from "next/image";
import Aparece from "./Aparece";
import { Arco, Confetis } from "./Formas";
import { Flecha } from "./Iconos";
import { negocio } from "@/data/negocio";

/**
 * Cierre del inicio: una «destination card». La fotografía de la fachada manda
 * a todo lo ancho y la información vive encima, en una tarjeta translúcida.
 *
 * En móvil la tarjeta se monta sobre el borde inferior de la fotografía y
 * continúa por debajo, en vez de flotar dentro de ella.
 */
export default function SeccionUbicacion() {
  return (
    <section className="contenedor seccion relative isolate">
      <Confetis className="-right-2 top-2 hidden w-[120px] lg:block" />
      <Arco
        className="-left-16 bottom-24 hidden w-[140px] opacity-80 lg:block"
        color="var(--color-menta)"
      />

      <Aparece>
        {/* Sin titular, el eyebrow pasa a ser el encabezado de la sección
            para no dejar el bloque sin jerarquía en el documento. */}
        <h2 className="eyebrow">Visítanos</h2>
      </Aparece>

      <Aparece className="relative mt-6 lg:mt-7" delay={60}>
        <span
          aria-hidden="true"
          className="absolute -right-5 -top-6 hidden h-24 w-24 rounded-full bg-rosa lg:block"
          style={{ zIndex: -1 }}
        />

        <div className="relative aspect-4/5 w-full overflow-hidden rounded-[24px] bg-arena sm:aspect-16/10 lg:aspect-[2.2/1]">
          <Image
            src="/piccolo/ubicacion/fachada-ancha.jpg"
            alt="Fachada de Piccolo en Plaza Andamar, con el letrero de bienvenida"
            fill
            sizes="100vw"
            className="object-cover object-[58%_center] lg:object-center"
          />
          {/* Velo mínimo: calma la zona donde se apoya la tarjeta. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(100deg, rgba(43,35,32,0.22) 0%, rgba(43,35,32,0.05) 38%, rgba(43,35,32,0) 60%)",
            }}
          />
        </div>

        {/* Tarjeta flotante */}
        <div className="relative z-10 -mt-24 ml-4 mr-4 rounded-[20px] border border-borde-suave bg-crema/88 p-6 backdrop-blur-md sm:-mt-28 sm:mr-auto sm:max-w-[420px] lg:absolute lg:bottom-7 lg:left-7 lg:mx-0 lg:mt-0 lg:p-7">
          <h3 className="font-serif text-[22px] leading-tight tracking-[-0.02em]">
            {negocio.nombreCompleto}
          </h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-tinta-media">
            {negocio.direccion.resumen}
            <br />
            {negocio.direccion.ciudad}
          </p>

          <p className="eyebrow-neutro mt-6">Horarios</p>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {negocio.horarios.map((h) => (
              <div key={h.dias} className="rounded-[12px] bg-marfil px-3.5 py-3">
                <p className="text-[10.5px] uppercase tracking-[0.12em] text-tinta-suave">
                  {h.corto}
                </p>
                <p className="numeros-tabulares mt-1 whitespace-nowrap text-[13px] sm:text-[14px]">
                  {h.horario}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-5 border-t border-borde-suave pt-4 text-[12px] leading-relaxed text-tinta-suave">
            {negocio.direccion.completa}
          </p>

          <a
            href={negocio.direccion.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="boton mt-5 w-full justify-center sm:w-auto"
          >
            Cómo llegar <Flecha />
          </a>
        </div>
      </Aparece>
    </section>
  );
}

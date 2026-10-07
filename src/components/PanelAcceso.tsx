import Link from "next/link";
import { negocio } from "@/data/negocio";
import { mxn } from "@/lib/formato";
import { Flecha, Info } from "./Iconos";

/**
 * Accesos del día a día.
 *
 * Los dos primeros accesos del negocio son los pases que compra la gente; el
 * resto —adulto extra y los dos adicionales— son complementos. Una sola pieza
 * con dos renglones destacados arriba y los complementos como lista simple
 * debajo: el pastel solo marca la jerarquía, no convierte cada fila en tarjeta.
 */
const [PASE_NINOS, PASE_BEBES, ...OTROS_ACCESOS] = negocio.acceso;
const COMPLEMENTOS = [...OTROS_ACCESOS, ...negocio.accesoAdicionales];

const PASTEL_PASE = [
  "color-mix(in srgb, var(--color-cielo) 42%, white)",
  "color-mix(in srgb, var(--color-durazno) 42%, white)",
];

export default function PanelAcceso() {
  return (
    <div className="rounded-[26px] border border-borde-suave bg-white p-6 sm:p-8 lg:p-9">
      <p className="eyebrow">Sin fiesta de por medio</p>
      <h2 className="titular mt-3">También puedes venir a jugar.</h2>
      <p className="mt-4 max-w-[62ch] text-[15.5px] leading-relaxed text-tinta-media lg:max-w-[760px]">
        Piccolo abre todos los días. Puedes venir una tarde cualquiera, pagar el acceso y quedarte
        el tiempo que quieras.
      </p>

      {/* Los dos pases: el dato que la gente viene a buscar. */}
      <ul className="mt-8 space-y-3">
        {[PASE_NINOS, PASE_BEBES].map((a, i) => (
          <li
            key={a.nombre}
            className="rounded-[14px] px-5 py-4"
            style={{ background: PASTEL_PASE[i] }}
          >
            {/* Nombre y precio comparten línea de base; el detalle va debajo,
                así el importe no se descuelga en pantallas estrechas. */}
            <span className="flex items-baseline justify-between gap-5">
              <span className="text-[16px] text-tinta">{a.nombre}</span>
              <span className="numeros-tabulares shrink-0 font-serif text-[26px] leading-none tracking-[-0.025em] text-tinta">
                {mxn(a.precio)}
              </span>
            </span>
            <span className="mt-1 block text-[13px] text-tinta-media">{a.detalle}</span>
          </li>
        ))}
      </ul>

      {/* Complementos: misma rejilla, sin caja propia. */}
      <ul className="mt-6">
        {COMPLEMENTOS.map((a) => (
          <li
            key={a.nombre}
            className="border-t border-borde-suave px-1 py-4"
          >
            <span className="flex items-baseline justify-between gap-5">
              <span className="text-[15px] text-tinta">{a.nombre}</span>
              <span className="numeros-tabulares shrink-0 text-[16px] text-tinta">
                {mxn(a.precio)}
              </span>
            </span>
            <span className="mt-1 block text-[12.5px] text-tinta-suave">{a.detalle}</span>
          </li>
        ))}
      </ul>

      <div
        className="mt-7 flex items-center gap-3.5 rounded-[16px] px-4 py-3.5 sm:gap-4 sm:px-5 sm:py-4"
        style={{ background: "color-mix(in srgb, var(--color-menta) 48%, white)" }}
      >
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-crema/70 text-tinta-media"
        >
          <Info />
        </span>
        <p className="text-[12.5px] leading-relaxed text-tinta sm:text-[13.5px]">
          {negocio.edades.texto}. {negocio.politicaAlimentos}
        </p>
      </div>

      <Link href="/ubicacion" className="enlace-flecha mt-7">
        Horarios y ubicación <Flecha />
      </Link>
    </div>
  );
}

import type { ReactNode } from "react";
import Link from "next/link";
import { ACENTO, desde, paquetes, type Paquete } from "@/data/paquetes";
import { mxn } from "@/lib/formato";
import { Palomita } from "./Iconos";

/** Paquete que se resalta como el más pedido. Es criterio editorial, no un dato. */
const DESTACADO = "aventura";

type Fila = {
  etiqueta: string;
  valor: (p: Paquete) => ReactNode;
  /** Las dos filas de precio cierran el comparador y pesan más. */
  enfasis?: "precio" | "total";
};

const FILAS: Fila[] = [
  { etiqueta: "Niños", valor: (p) => `${p.minNinos} a ${p.maxNinos}` },
  { etiqueta: "Duración", valor: (p) => `${p.horas} horas` },
  { etiqueta: "Días", valor: (p) => p.dias },
  { etiqueta: "Edades sugeridas", valor: (p) => p.edades.replace("De ", "") },
  {
    etiqueta: "Evento privado",
    valor: (p) =>
      p.privado ? (
        <span className="inline-flex items-center gap-1.5">
          <Palomita className="h-[14px] w-[14px] text-ok" /> Sí
        </span>
      ) : (
        <span className="text-tinta-suave" aria-label="No incluido">
          —
        </span>
      ),
  },
  { etiqueta: "Precio por niño", valor: (p) => mxn(p.precioPorNino), enfasis: "precio" },
  { etiqueta: "Desde", valor: (p) => mxn(desde(p)), enfasis: "total" },
];

const claseValor = (enfasis?: Fila["enfasis"]) => {
  if (enfasis === "total") return "font-serif text-[23px] leading-none tracking-[-0.022em] text-tinta";
  if (enfasis === "precio") return "text-[16px] font-medium text-tinta";
  return "text-[14.5px] text-tinta-media";
};

/** Cabecera de columna: banda pastel con el nombre y, si toca, el distintivo. */
function Cabecera({ paquete }: { paquete: Paquete }) {
  const destacado = paquete.slug === DESTACADO;
  return (
    <div className="flex flex-col items-center">
      <span
        aria-hidden={!destacado}
        className={`mb-2 whitespace-nowrap rounded-full bg-crema px-2 py-1 text-[8.5px] font-semibold uppercase tracking-[0.08em] text-tinta-media sm:px-2.5 sm:text-[9.5px] sm:tracking-[0.12em] ${
          destacado ? "" : "invisible"
        }`}
      >
        Más solicitado
      </span>
      <Link
        href={`/paquetes/${paquete.slug}`}
        className="block w-full rounded-[14px] px-2 py-3 text-center font-serif text-[15.5px] tracking-[-0.02em] text-tinta transition-opacity duration-200 hover:opacity-70 sm:px-3 sm:text-[21px]"
        style={{ background: ACENTO[paquete.acento] }}
      >
        {paquete.nombre}
      </Link>
    </div>
  );
}

/** Lavado casi imperceptible que recorre la columna destacada de arriba abajo. */
const fondoColumna = (p: Paquete) =>
  p.slug === DESTACADO ? { backgroundColor: "color-mix(in srgb, var(--color-menta) 38%, transparent)" } : undefined;

export default function Comparador() {
  return (
    <div className="rounded-[26px] border border-borde-suave bg-white px-4 pb-5 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
      {/* ---------- Escritorio: una sola tabla ---------- */}
      <table className="hidden w-full border-separate border-spacing-0 md:table">
        <caption className="sr-only">Comparación de los tres paquetes de fiesta</caption>
        <thead>
          <tr>
            <th scope="col" className="w-[23%] align-bottom">
              <span className="sr-only">Característica</span>
            </th>
            {paquetes.map((p) => (
              <th key={p.slug} scope="col" className="w-[25.6%] px-2 pb-4 align-bottom lg:px-3">
                <Cabecera paquete={p} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FILAS.map((fila, i) => (
            <tr key={fila.etiqueta}>
              <th
                scope="row"
                className={`border-t border-borde-suave py-4 pr-5 text-left text-[14.5px] ${
                  fila.enfasis === "total"
                    ? "py-6 font-medium text-tinta"
                    : fila.enfasis
                      ? "font-normal text-tinta"
                      : "font-normal text-tinta-media"
                }`}
              >
                {fila.etiqueta}
              </th>
              {paquetes.map((p) => (
                <td
                  key={p.slug}
                  style={fondoColumna(p)}
                  className={`numeros-tabulares border-t border-borde-suave px-2 py-4 text-center lg:px-3 ${claseValor(
                    fila.enfasis,
                  )} ${fila.enfasis === "total" ? "py-6" : ""} ${i === 0 ? "rounded-t-[14px]" : ""} ${
                    i === FILAS.length - 1 ? "rounded-b-[14px]" : ""
                  }`}
                >
                  {fila.valor(p)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------- Móvil: mismas columnas, una característica a la vez ---------- */}
      <div className="md:hidden">
        <div className="sticky top-[78px] z-10 -mx-4 border-b border-borde-suave bg-white px-4 pb-3.5 pt-1">
          <div className="grid grid-cols-3 gap-2">
            {paquetes.map((p) => (
              <Cabecera key={p.slug} paquete={p} />
            ))}
          </div>
        </div>

        {FILAS.map((fila, i) => (
          <div
            key={fila.etiqueta}
            className={`pb-3.5 pt-3.5 ${i === 0 ? "" : "border-t border-borde-suave"}`}
          >
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-tinta-suave">
              {fila.etiqueta}
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {paquetes.map((p) => (
                <p
                  key={p.slug}
                  style={fondoColumna(p)}
                  className={`numeros-tabulares rounded-[10px] px-1.5 py-2 text-center ${claseValor(
                    fila.enfasis,
                  )}`}
                >
                  <span className="sr-only">{p.nombre}: </span>
                  {fila.valor(p)}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

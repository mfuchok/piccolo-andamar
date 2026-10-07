"use client";

import { paquetes, desde } from "@/data/paquetes";
import { mxn } from "@/lib/formato";
import { useReserva } from "@/lib/reserva";

/** Selector compacto de paquete, para quien llega directo al calendario. */
export default function SelectorPaquete() {
  const { reserva, setPaquete } = useReserva();

  return (
    <fieldset>
      <legend className="eyebrow-neutro">Paquete</legend>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {paquetes.map((p) => {
          const activo = reserva.paquete === p.slug;
          return (
            <label
              key={p.slug}
              className={`cursor-pointer rounded-[14px] border px-4 py-3.5 transition-colors duration-200 ${
                activo
                  ? "border-tinta bg-marfil"
                  : "border-borde hover:border-tinta-suave hover:bg-marfil/60"
              }`}
            >
              <input
                type="radio"
                name="paquete"
                value={p.slug}
                checked={activo}
                onChange={() => setPaquete(p.slug)}
                className="sr-only"
              />
              <span className="block font-serif text-[18px] tracking-[-0.02em]">{p.nombre}</span>
              <span className="numeros-tabulares mt-1 block text-[12.5px] text-tinta-suave">
                hasta {p.maxNinos} niños · desde {mxn(desde(p))}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

"use client";

import { extras } from "@/data/extras";
import { getPaquete } from "@/data/paquetes";
import { calcularDesglose, useReserva } from "@/lib/reserva";
import { mxn } from "@/lib/formato";
import { Palomita, Mas } from "./Iconos";

export default function SelectorExtras() {
  const { reserva, alternarExtra } = useReserva();
  const paquete = reserva.paquete ? getPaquete(reserva.paquete) : null;
  const desglose = calcularDesglose(reserva);
  const ninos = desglose?.ninosCobrados ?? paquete?.minNinos ?? 0;

  const ordenados = paquete
    ? [
        ...extras.filter((e) => paquete.extrasSugeridos.includes(e.id)),
        ...extras.filter((e) => !paquete.extrasSugeridos.includes(e.id)),
      ]
    : extras;

  return (
    <ul className="border-t border-borde">
      {ordenados.map((e) => {
        const activo = reserva.extras.includes(e.id);
        const importe = e.tipo === "porNino" ? e.precio * ninos : e.precio;
        return (
          <li key={e.id} className="border-b border-borde-suave">
            <label
              className={`-mx-3 flex cursor-pointer items-center gap-4 rounded-[12px] px-3 py-4 transition-colors duration-200 ${
                activo ? "bg-naranja-claro" : "hover:bg-marfil/70"
              }`}
            >
              <input
                type="checkbox"
                checked={activo}
                onChange={() => alternarExtra(e.id)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border transition-colors duration-200 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-naranja ${
                  activo
                    ? "border-naranja bg-naranja text-white"
                    : "border-borde text-tinta-suave"
                }`}
              >
                {activo ? <Palomita className="h-[13px] w-[13px]" /> : <Mas />}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[15.5px] text-tinta">{e.nombre}</span>
                <span className="block text-[13px] leading-snug text-tinta-suave">
                  {e.descripcion}
                </span>
              </span>

              <span className="shrink-0 text-right">
                <span className="numeros-tabulares block text-[15.5px]">+{mxn(importe)}</span>
                {e.tipo === "porNino" && (
                  <span className="block text-[12px] text-tinta-suave">
                    {ninos} × {mxn(e.precio)}
                  </span>
                )}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

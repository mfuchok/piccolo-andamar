import Aparece from "./Aparece";
import { Ajustes, Calendario, Confeti, Pastel } from "./Iconos";
import { proceso } from "@/data/proceso";

const PASOS = [
  { Icono: Pastel, fondo: "var(--color-durazno)" },
  { Icono: Calendario, fondo: "var(--color-cielo)" },
  { Icono: Ajustes, fondo: "var(--color-lavanda)" },
  { Icono: Confeti, fondo: "var(--color-verde)" },
];

/** Los cuatro pasos, en una sola línea en escritorio. */
export default function Proceso() {
  return (
    <ol className="mt-8 grid gap-x-8 gap-y-7 border-t border-borde pt-7 sm:grid-cols-2 lg:grid-cols-4">
      {proceso.map((paso, i) => {
        const { Icono, fondo } = PASOS[i];
        return (
          <Aparece as="li" key={paso.numero} delay={i * 60}>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full text-tinta"
                style={{ background: fondo }}
              >
                <Icono className="h-[18px] w-[18px]" />
              </span>
              <span className="numeros-tabulares text-[12px] tracking-[0.1em] text-tinta-suave">
                {paso.numero}
              </span>
            </div>
            <h3 className="mt-3.5 text-[16px] font-medium">{paso.titulo}</h3>
            <p className="mt-1.5 max-w-[30ch] text-[13.5px] leading-relaxed text-tinta-media">
              {paso.texto}
            </p>
          </Aparece>
        );
      })}
    </ol>
  );
}

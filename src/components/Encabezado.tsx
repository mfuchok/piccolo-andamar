import Link from "next/link";
import type { ReactNode } from "react";

export type Miga = { href: string; texto: string };

export default function Encabezado({
  eyebrow,
  titulo,
  texto,
  anchoTexto = "max-w-[56ch]",
  migas,
  children,
}: {
  eyebrow?: string;
  titulo: ReactNode;
  texto?: ReactNode;
  /**
   * Medida del párrafo de entrada. La columna estrecha es el valor por defecto
   * del sitio; una página con texto corto y mucho ancho libre puede ensancharla
   * sin cambiárselo a las demás.
   */
  anchoTexto?: string;
  migas?: Miga[];
  children?: ReactNode;
}) {
  return (
    <header className="contenedor pt-7 sm:pt-9">
      {migas && migas.length > 0 && (
        <nav aria-label="Ruta de navegación" className="mb-7 sm:mb-10">
          <ol className="flex flex-wrap items-center gap-2 text-[12.5px] text-tinta-suave">
            {migas.map((m, i) => (
              <li key={m.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === migas.length - 1 ? (
                  <span aria-current="page" className="text-tinta-media">
                    {m.texto}
                  </span>
                ) : (
                  <Link href={m.href} className="transition-colors duration-200 hover:text-tinta">
                    {m.texto}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className={`titular ${eyebrow ? "mt-5" : ""}`}>{titulo}</h1>
      {texto && (
        <p className={`mt-6 text-[16.5px] leading-relaxed text-tinta-media ${anchoTexto}`}>{texto}</p>
      )}
      {children}
    </header>
  );
}

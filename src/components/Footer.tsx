import Link from "next/link";
import Marca from "./Marca";
import { negocio, prototipo } from "@/data/negocio";
import { Flecha } from "./Iconos";

const COLUMNAS = [
  {
    titulo: "Fiestas",
    enlaces: [
      { href: "/paquetes", texto: "Paquetes" },
      { href: "/disponibilidad", texto: "Consulta tu fecha" },
    ],
  },
  {
    titulo: "Piccolo",
    enlaces: [
      { href: "/experiencias", texto: "Experiencias" },
      { href: "/galeria", texto: "Galería" },
      { href: "/faq", texto: "Preguntas frecuentes" },
      { href: "/ubicacion", texto: "Ubicación y horarios" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-borde bg-marfil sm:mt-24">
      <div className="contenedor py-14 sm:py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Marca />
            <p className="mt-5 max-w-[26ch] text-[14.5px] leading-relaxed text-tinta-media">
              Fiestas y experiencias para niños en Plaza Andamar, Boca del Río.
            </p>
            <Link href="/disponibilidad" className="enlace-flecha mt-7">
              Consulta tu fecha <Flecha />
            </Link>
          </div>

          {COLUMNAS.map((col) => (
            <nav key={col.titulo} aria-label={col.titulo}>
              <h2 className="eyebrow-neutro">{col.titulo}</h2>
              <ul className="mt-5 space-y-3">
                {col.enlaces.map((e) => (
                  <li key={e.href}>
                    <Link
                      href={e.href}
                      className="text-[14.5px] text-tinta-media transition-colors duration-200 hover:text-tinta"
                    >
                      {e.texto}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="eyebrow-neutro">Visítanos</h2>
            <address className="mt-5 space-y-1 text-[14.5px] not-italic leading-relaxed text-tinta-media">
              <p>{negocio.direccion.linea1}</p>
              <p>{negocio.direccion.linea3}</p>
              <p className="pt-3">
                <a
                  href={`tel:${negocio.contacto.telefonoE164}`}
                  className="transition-colors duration-200 hover:text-tinta"
                >
                  {negocio.contacto.telefono}
                </a>
              </p>
              <p>
                <a
                  href={negocio.contacto.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-tinta"
                >
                  @{negocio.contacto.instagram}
                </a>
              </p>
            </address>
            <dl className="mt-5 space-y-1 text-[13.5px] text-tinta-suave">
              {negocio.horarios.map((h) => (
                <div key={h.dias} className="flex justify-between gap-4">
                  <dt>{h.dias}</dt>
                  <dd className="numeros-tabulares">{h.horario}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="linea mt-14 flex flex-col gap-3 pt-7 text-[12.5px] text-tinta-suave sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Piccolo Ludo Andamar.</p>
          <p className="max-w-[62ch] sm:text-right">{prototipo.aviso}</p>
        </div>
      </div>
    </footer>
  );
}

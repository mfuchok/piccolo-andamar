"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Marca from "./Marca";
import { Cerrar } from "./Iconos";

const ENLACES = [
  { href: "/paquetes", texto: "Paquetes" },
  { href: "/experiencias", texto: "Experiencias" },
  { href: "/testimonios", texto: "Testimonios" },
  { href: "/faq", texto: "FAQ" },
  { href: "/ubicacion", texto: "Ubicación" },
];

export default function Navbar() {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [desplazado, setDesplazado] = useState(false);

  useEffect(() => setAbierto(false), [ruta]);

  useEffect(() => {
    const alScroll = () => setDesplazado(window.scrollY > 24);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  useEffect(() => {
    if (!abierto) return;
    const alEscape = (e: KeyboardEvent) =>
      e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", alEscape);
    return () => window.removeEventListener("keydown", alEscape);
  }, [abierto]);

  const activo = (href: string) => ruta === href || ruta.startsWith(href + "/");

  return (
    <>
      <header className="sticky top-0 z-50 bg-crema pb-2.5 pt-2.5">
        <div className="contenedor">
          <div
            className={`flex h-[58px] items-center justify-between gap-6 rounded-[18px] border px-4 transition-[border-color,box-shadow,background-color] duration-300 md:px-6 ${
              desplazado
                ? "border-borde-suave bg-white shadow-[0_10px_30px_-20px_rgba(46,37,33,0.45)]"
                : "border-borde-suave/70 bg-white/80 backdrop-blur-sm"
            }`}
          >
            <Marca />

            <nav aria-label="Principal" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {ENLACES.map((e) => (
                  <li key={e.href}>
                    <Link
                      href={e.href}
                      aria-current={activo(e.href) ? "page" : undefined}
                      className={`enlace-nav relative transition-colors duration-200 hover:text-tinta ${
                        activo(e.href) ? "text-tinta" : "text-tinta-media"
                      }`}
                    >
                      {e.texto}
                      <span
                        aria-hidden="true"
                        className={`absolute -bottom-[6px] left-0 h-px w-full origin-left bg-naranja transition-transform duration-300 ${
                          activo(e.href) ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/disponibilidad"
                className="enlace-nav hidden rounded-full border border-borde px-[18px] py-[8px] text-tinta transition-colors duration-200 hover:border-naranja hover:bg-naranja-claro lg:inline-block"
              >
                Consulta tu fecha
              </Link>

              <button
                type="button"
                onClick={() => setAbierto((v) => !v)}
                aria-expanded={abierto}
                aria-controls="menu-movil"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-tinta lg:hidden"
              >
                <span className="sr-only">
                  {abierto ? "Cerrar menú" : "Abrir menú"}
                </span>
                {abierto ? (
                  <Cerrar className="h-[18px] w-[18px]" />
                ) : (
                  <svg
                    viewBox="0 0 20 20"
                    className="h-[18px] w-[18px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M2.5 6h15M2.5 14h15" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menú móvil. Va fuera del <header> porque el `backdrop-blur` del
          encabezado crearía un bloque contenedor y rompería el `position: fixed`. */}
      <div
        id="menu-movil"
        hidden={!abierto}
        className="fixed inset-x-0 top-[78px] bottom-0 z-40 overflow-y-auto border-t border-borde-suave bg-crema lg:hidden"
      >
        <nav aria-label="Principal (móvil)" className="contenedor py-4">
          <ul>
            {ENLACES.map((e) => (
              <li key={e.href} className="border-b border-borde-suave">
                <Link
                  href={e.href}
                  className={`block py-[18px] font-nav text-[24px] font-light tracking-[0.01em] ${
                    activo(e.href) ? "text-naranja" : "text-tinta"
                  }`}
                >
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/disponibilidad"
            className="boton mt-8 w-full justify-center"
          >
            Consulta tu fecha
          </Link>
        </nav>
      </div>
    </>
  );
}

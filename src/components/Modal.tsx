"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Cerrar } from "./Iconos";

export default function Modal({
  abierto,
  alCerrar,
  titulo,
  children,
  ancho = "max-w-lg",
  oscuro = false,
}: {
  abierto: boolean;
  alCerrar: () => void;
  titulo: string;
  children: ReactNode;
  ancho?: string;
  oscuro?: boolean;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const anterior = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!abierto) return;
    anterior.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    const alTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        alCerrar();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const focos = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focos.length) return;
      const primero = focos[0];
      const ultimo = focos[focos.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };

    window.addEventListener("keydown", alTecla);
    const t = window.setTimeout(() => {
      panel.current?.querySelector<HTMLElement>("button, a[href]")?.focus();
    }, 40);

    return () => {
      window.removeEventListener("keydown", alTecla);
      window.clearTimeout(t);
      document.body.style.overflow = "";
      anterior.current?.focus?.();
    };
  }, [abierto, alCerrar]);

  if (!abierto) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={titulo}
    >
      <button
        type="button"
        aria-label="Cerrar"
        onClick={alCerrar}
        className={`absolute inset-0 cursor-default ${oscuro ? "bg-tinta/88" : "bg-tinta/35"} backdrop-blur-[2px]`}
      />
      <div
        ref={panel}
        className={`relative w-full ${ancho} max-h-[90vh] overflow-y-auto rounded-t-[14px] bg-crema p-7 shadow-[0_18px_60px_-20px_rgba(43,35,32,0.4)] sm:rounded-[6px] sm:p-9`}
      >
        <button
          type="button"
          onClick={alCerrar}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-tinta-media transition-colors duration-200 hover:bg-marfil hover:text-tinta"
        >
          <span className="sr-only">Cerrar</span>
          <Cerrar />
        </button>
        {children}
      </div>
    </div>
  );
}

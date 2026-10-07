type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Flecha({ className = "" }: P) {
  return (
    <svg viewBox="0 0 16 16" className={`flecha h-[13px] w-[13px] ${className}`} aria-hidden="true" {...base}>
      <path d="M2.5 8h11M9.5 4l4 4-4 4" />
    </svg>
  );
}

export function FlechaIzq({ className = "" }: P) {
  return (
    <svg viewBox="0 0 16 16" className={`h-[13px] w-[13px] ${className}`} aria-hidden="true" {...base}>
      <path d="M13.5 8h-11M6.5 4l-4 4 4 4" />
    </svg>
  );
}

export function Ninos({ className = "" }: P) {
  return (
    <svg viewBox="0 0 20 20" className={`h-[17px] w-[17px] ${className}`} aria-hidden="true" {...base}>
      <circle cx="7.4" cy="6.2" r="2.6" />
      <path d="M2.6 16.4c0-2.6 2.1-4.4 4.8-4.4s4.8 1.8 4.8 4.4" />
      <path d="M13.4 4.1a2.6 2.6 0 0 1 0 4.9M14.6 12.4c1.7.5 2.8 1.9 2.8 4" />
    </svg>
  );
}

export function Reloj({ className = "" }: P) {
  return (
    <svg viewBox="0 0 20 20" className={`h-[17px] w-[17px] ${className}`} aria-hidden="true" {...base}>
      <circle cx="10" cy="10" r="7.4" />
      <path d="M10 5.6V10l2.9 1.8" />
    </svg>
  );
}

export function Calendario({ className = "" }: P) {
  return (
    <svg viewBox="0 0 20 20" className={`h-[17px] w-[17px] ${className}`} aria-hidden="true" {...base}>
      <rect x="2.8" y="4.3" width="14.4" height="13" rx="1.6" />
      <path d="M2.8 8.2h14.4M6.6 2.6v3.2M13.4 2.6v3.2" />
    </svg>
  );
}

export function Globo({ className = "" }: P) {
  return (
    <svg viewBox="0 0 20 20" className={`h-[17px] w-[17px] ${className}`} aria-hidden="true" {...base}>
      <path d="M10 2.4c2.7 0 4.6 2.1 4.6 5 0 3.2-2.6 6-4.6 6s-4.6-2.8-4.6-6c0-2.9 1.9-5 4.6-5Z" />
      <path d="M10 13.4v1.4M8.7 17.6c0-1.3 2.6-1.3 2.6-2.8" />
    </svg>
  );
}

export function Pastel({ className = "" }: P) {
  return (
    <svg viewBox="0 0 20 20" className={`h-[17px] w-[17px] ${className}`} aria-hidden="true" {...base}>
      <path d="M3.2 17.4h13.6v-4.2c0-1.2-1-2.1-2.2-2.1H5.4c-1.2 0-2.2.9-2.2 2.1v4.2Z" />
      <path d="M3.2 14.2c1.3 0 1.3 1.2 2.6 1.2s1.4-1.2 2.7-1.2 1.4 1.2 2.7 1.2 1.4-1.2 2.7-1.2 1.3 1.2 2.9 1.2" />
      <path d="M10 11.1V8.4M10 6.2V5" />
    </svg>
  );
}

export function Ajustes({ className = "" }: P) {
  return (
    <svg viewBox="0 0 20 20" className={`h-[17px] w-[17px] ${className}`} aria-hidden="true" {...base}>
      <path d="M2.6 6.2h10.2M15.8 6.2h1.6M2.6 13.8h4.6M10.2 13.8h7.2" />
      <circle cx="14.4" cy="6.2" r="1.8" />
      <circle cx="8.6" cy="13.8" r="1.8" />
    </svg>
  );
}

export function Confeti({ className = "" }: P) {
  return (
    <svg viewBox="0 0 20 20" className={`h-[17px] w-[17px] ${className}`} aria-hidden="true" {...base}>
      <path d="M3 17.3 7.9 6.1l6.1 6.1L3 17.3Z" />
      <path d="M11.6 4.2c.6-1 1.8-1.3 2.6-.6M15.6 7.6c1-.6 2.3-.2 2.8.8M12.9 8.6l1.6-1.6M16.6 3.4l.6-.6" />
    </svg>
  );
}

export function Play({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden="true" fill="currentColor">
      <path d="M8.5 5.6a.7.7 0 0 1 1.07-.6l8 6.4a.7.7 0 0 1 0 1.2l-8 6.4a.7.7 0 0 1-1.07-.6V5.6Z" />
    </svg>
  );
}

export function Cerrar({ className = "" }: P) {
  return (
    <svg viewBox="0 0 20 20" className={`h-4 w-4 ${className}`} aria-hidden="true" {...base}>
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

export function Palomita({ className = "" }: P) {
  return (
    <svg viewBox="0 0 16 16" className={`h-[15px] w-[15px] ${className}`} aria-hidden="true" {...base}>
      <path d="M3 8.4l3.2 3.2L13 4.8" />
    </svg>
  );
}

export function Mas({ className = "" }: P) {
  return (
    <svg viewBox="0 0 16 16" className={`h-[14px] w-[14px] ${className}`} aria-hidden="true" {...base}>
      <path d="M8 3.2v9.6M3.2 8h9.6" />
    </svg>
  );
}

export function Menos({ className = "" }: P) {
  return (
    <svg viewBox="0 0 16 16" className={`h-[14px] w-[14px] ${className}`} aria-hidden="true" {...base}>
      <path d="M3.2 8h9.6" />
    </svg>
  );
}

export function Info({ className = "" }: P) {
  return (
    <svg viewBox="0 0 20 20" className={`h-[17px] w-[17px] ${className}`} aria-hidden="true" {...base}>
      <circle cx="10" cy="10" r="7.4" />
      <path d="M10 9.2v4.2" />
      <path d="M10 6.5v.6" />
    </svg>
  );
}

export function Pin({ className = "" }: P) {
  return (
    <svg viewBox="0 0 20 20" className={`h-[17px] w-[17px] ${className}`} aria-hidden="true" {...base}>
      <path d="M10 17.6s5.4-4.7 5.4-9a5.4 5.4 0 1 0-10.8 0c0 4.3 5.4 9 5.4 9Z" />
      <circle cx="10" cy="8.4" r="2" />
    </svg>
  );
}

export function Whatsapp({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`h-[17px] w-[17px] ${className}`} aria-hidden="true" fill="currentColor">
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.17-1.35a9.93 9.93 0 0 0 4.87 1.24h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2Zm0 18.15h-.01a8.26 8.26 0 0 1-4.21-1.15l-.3-.18-3.13.82.83-3.05-.2-.31a8.24 8.24 0 0 1-1.26-4.4c0-4.57 3.72-8.28 8.29-8.28 2.21 0 4.29.86 5.86 2.43a8.23 8.23 0 0 1 2.42 5.86c0 4.57-3.72 8.26-8.29 8.26Zm4.54-6.19c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.1-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.84-.2-.49-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.04 0 1.2.87 2.36.99 2.52.12.17 1.71 2.61 4.15 3.66.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

/** Estrella llena, para las valoraciones. */
export function Estrella({ className = "" }: P) {
  return (
    <svg viewBox="0 0 20 20" className={`h-[13px] w-[13px] ${className}`} aria-hidden="true" fill="currentColor">
      <path d="M10 2.6l2.3 4.66 5.15.75-3.72 3.63.88 5.12L10 14.34l-4.61 2.42.88-5.12L2.55 8.01l5.15-.75L10 2.6Z" />
    </svg>
  );
}

/** Fachada con columnas: transferencia bancaria. */
export function Banco({ className = "" }: P) {
  return (
    <svg viewBox="0 0 20 20" className={`h-[17px] w-[17px] ${className}`} aria-hidden="true" {...base}>
      <path d="M2.8 8.1 10 3.7l7.2 4.4" />
      <path d="M4.8 8.9v5.8M8.2 8.9v5.8M11.8 8.9v5.8M15.2 8.9v5.8" />
      <path d="M3.2 16.6h13.6" />
    </svg>
  );
}

/** Pase o comprobante impreso. */
export function Ticket({ className = "" }: P) {
  return (
    <svg viewBox="0 0 20 20" className={`h-[17px] w-[17px] ${className}`} aria-hidden="true" {...base}>
      <rect x="2.6" y="5.4" width="14.8" height="9.2" rx="1.8" />
      <path d="M12.6 5.4v9.2" strokeDasharray="1.5 1.6" />
      <path d="M5.4 8.6h4.6M5.4 11.4h3.2" />
    </svg>
  );
}

/**
 * Formas orgánicas decorativas.
 *
 * Pequeñas manchas pastel que rompen la rigidez editorial sin convertir la
 * página en un arcoíris. Son estáticas, no se animan y siempre van detrás del
 * contenido (`.forma` lleva `z-index: -1`).
 */

type Props = { className?: string; color?: string };

/** Mancha redondeada e irregular. */
export function Mancha({ className = "", color = "var(--color-durazno)" }: Props) {
  return (
    <svg viewBox="0 0 200 180" className={`forma ${className}`} aria-hidden="true">
      <path
        fill={color}
        d="M96 2c34 0 72 13 88 41 16 28 8 66-10 92-18 26-46 41-78 43-32 2-68-9-85-34C-6 119-1 83 13 55 27 27 62 2 96 2Z"
      />
    </svg>
  );
}

/** Gota suave, más alargada. */
export function Gota({ className = "", color = "var(--color-lavanda)" }: Props) {
  return (
    <svg viewBox="0 0 160 220" className={`forma ${className}`} aria-hidden="true">
      <path
        fill={color}
        d="M80 4c42 0 76 44 76 98 0 62-34 114-76 114S4 164 4 102C4 48 38 4 80 4Z"
      />
    </svg>
  );
}

/** Arco: guiño al arcoíris de neón del local. */
export function Arco({ className = "", color = "var(--color-amarillo)" }: Props) {
  return (
    <svg viewBox="0 0 160 90" className={`forma ${className}`} aria-hidden="true">
      <path
        d="M10 88a70 70 0 0 1 140 0"
        fill="none"
        stroke={color}
        strokeWidth="22"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Confeti disperso. */
export function Confetis({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 120" className={`forma ${className}`} aria-hidden="true">
      <circle cx="18" cy="24" r="7" fill="var(--color-rosa)" />
      <circle cx="104" cy="14" r="5" fill="var(--color-amarillo)" />
      <circle cx="126" cy="72" r="8" fill="var(--color-cielo)" />
      <circle cx="56" cy="96" r="6" fill="var(--color-verde)" />
      <circle cx="78" cy="48" r="4" fill="var(--color-durazno)" />
    </svg>
  );
}

/** Semicírculo: media luna plana, útil al pie de una fotografía. */
export function Medio({ className = "", color = "var(--color-menta)" }: Props) {
  return (
    <svg viewBox="0 0 180 90" className={`forma ${className}`} aria-hidden="true">
      <path fill={color} d="M0 90a90 90 0 0 1 180 0Z" />
    </svg>
  );
}

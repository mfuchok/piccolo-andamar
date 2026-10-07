/**
 * Fotografías del carrusel de eventos del inicio.
 *
 * Mientras el array esté vacío, el carrusel dibuja `PLACEHOLDERS` marcadores
 * de posición con la misma estructura y proporción que tendrán las fotos.
 * Para activarlo basta con añadir las rutas:
 *
 *   export const galeriaEventos: FotoEvento[] = [
 *     { src: "/piccolo/eventos/fiesta-01.jpg", alt: "Montaje de una fiesta temática" },
 *     { src: "/piccolo/eventos/fiesta-02.jpg", alt: "Mesa de pastel decorada" },
 *   ];
 */

export type FotoEvento = { src: string; alt: string };

export const galeriaEventos: FotoEvento[] = [];

/** Cuántos marcadores mostrar mientras no haya fotografías. */
export const PLACEHOLDERS = 5;

/** Pasteles que se turnan en los marcadores. */
export const PASTELES_EVENTO = [
  "var(--color-durazno)",
  "var(--color-menta)",
  "var(--color-lavanda)",
  "var(--color-cielo)",
  "var(--color-rosa)",
];

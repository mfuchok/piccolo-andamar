/**
 * Las tres categorías de la sección «Conoce Piccolo».
 *
 * CÓMO AÑADIR LAS FOTOGRAFÍAS
 * Basta con rellenar `imagen` con una ruta dentro de /public. Mientras valga
 * `null`, la tarjeta dibuja un marcador de posición. No hay que tocar el
 * componente.
 *
 *   imagen: "/piccolo/experiencias/eventos/evento1.png",
 *   imagen: "/piccolo/experiencias/lugar/ciudad.jpg",
 *   imagen: "/piccolo/experiencias/cafeteria/cafeteria.jpg",
 */

export type Categoria = {
  id: string;
  titulo: string;
  texto: string;
  /** Ruta local de la fotografía. `null` mientras no la tengamos. */
  imagen: string | null;
  /** Texto alternativo de la fotografía definitiva. */
  alt: string;
  /** Leyenda temporal del marcador de posición. */
  marcador: string;
  /** Pastel de marca que acompaña a la categoría. */
  acento: string;
  /** Destino del enlace. Más adelante abrirá la galería filtrada. */
  href: string;
  tags?: string[];
};

export const conocenos: Categoria[] = [
  {
    id: "eventos",
    titulo: "Eventos",
    texto: "Celebraciones que transforman cada cumpleaños en algo único.",
    imagen: null,
    alt: "Montaje de una fiesta en Piccolo",
    marcador: "Imagen de eventos",
    acento: "var(--color-durazno)",
    href: "/galeria",
  },
  {
    id: "areas-de-juego",
    titulo: "Explora y juega",
    texto: "Espacios creados para descubrir, imaginar y divertirse.",
    imagen: null,
    alt: "Áreas de juego de Piccolo",
    marcador: "Imagen de áreas de juego",
    acento: "var(--color-menta)",
    href: "/galeria",
    tags: ["Ciudad de juegos", "Supermercado", "Zona de altura", "Zona de bebés"],
  },
  {
    id: "cafeteria",
    titulo: "Cafetería",
    texto: "Un espacio para disfrutar mientras ellos juegan.",
    imagen: null,
    alt: "Cafetería de Piccolo",
    marcador: "Imagen de cafetería",
    acento: "var(--color-cielo)",
    href: "/galeria",
  },
];

/** Pasteles que se turnan en las etiquetas de «Explora y juega». */
export const PASTEL_TAGS = [
  "var(--color-durazno)",
  "var(--color-cielo)",
  "var(--color-amarillo)",
  "var(--color-lavanda)",
];

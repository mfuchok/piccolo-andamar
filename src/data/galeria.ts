/**
 * Galería. Fotografías públicas de Piccolo Ludo Andamar (Instagram y Google
 * Maps) y de Piccolo Ludo (sitio corporativo). Ver documentacion/fuentes.md.
 *
 * Pendiente: pedir a la clienta su banco de fotos en alta resolución.
 */

export type Foto = {
  src: string;
  alt: string;
  /** Proporción para el mosaico. */
  ratio: "alto" | "ancho" | "cuadro";
};

export const galeria: Foto[] = [
  { src: "/piccolo/galeria/g01.jpg", alt: "Mamá y su hija frente al pastel de cumpleaños en Piccolo", ratio: "alto" },
  { src: "/piccolo/galeria/g12.jpg", alt: "Niño jugando en la estación de bomberos de Piccolo", ratio: "ancho" },
  { src: "/piccolo/galeria/g03.jpg", alt: "Montaje de fiesta en tonos rosa con mesa servida", ratio: "alto" },
  { src: "/piccolo/galeria/g04.jpg", alt: "Niña disfrutando una paleta en la cafetería de Piccolo", ratio: "cuadro" },
  { src: "/piccolo/galeria/g02.jpg", alt: "Backdrop temático con el nombre del festejado", ratio: "alto" },
  { src: "/piccolo/galeria/g13.jpg", alt: "Niños escalando el muro junto a la alberca de pelotas", ratio: "ancho" },
  { src: "/piccolo/galeria/g07.jpg", alt: "Montaje de fiesta con arcoíris y número del festejado", ratio: "alto" },
  { src: "/piccolo/galeria/g09.jpg", alt: "Sándwich de la cafetería de Piccolo", ratio: "cuadro" },
  { src: "/piccolo/galeria/g05.jpg", alt: "Familia posando frente al montaje temático de la fiesta", ratio: "alto" },
  { src: "/piccolo/galeria/g11.jpg", alt: "Letrero luminoso del Salón Ludo de Piccolo Andamar", ratio: "alto" },
  { src: "/piccolo/galeria/g08.jpg", alt: "Festejadas frente al backdrop de su fiesta", ratio: "alto" },
  { src: "/piccolo/galeria/g10.jpg", alt: "Café y concha servidos en la cafetería de Piccolo", ratio: "cuadro" },
  { src: "/piccolo/galeria/g06.jpg", alt: "Montaje de fiesta temática con decoración vaquera", ratio: "alto" },
  { src: "/piccolo/galeria/g14.jpg", alt: "Niño jugando en el supermercado de juguete de Piccolo", ratio: "alto" },
];

/**
 * Áreas del parque. Los nombres provienen de la señalización visible en
 * fotografías públicas de la sucursal (REAL); las descripciones son
 * editoriales y deben revisarse con la clienta.
 */

export type Experiencia = {
  id: string;
  nombre: string;
  descripcion: string;
  /**
   * FUENTE OFICIAL de las fotografías del área.
   *
   * Vacía dibuja el marcador pastel; con una ruta la tarjeta muestra esa foto.
   * Con dos o más queda sitio para encadenarlas más adelante. Ejemplo:
   *   imagenes: ["/piccolo/experiencias/lugar/salon.jpg"],
   */
  imagenes: string[];
  /** Texto alternativo de la fotografía, cuando la haya. */
  alt: string;
  /** Pastel de marca del marcador mientras no hay fotografía. */
  acento: "durazno" | "menta" | "cielo" | "lavanda";
  /**
   * ANTIGUA. La fotografía que usaba el diseño anterior. No la consume ningún
   * componente: se conserva como referencia para recuperar la ruta cuando se
   * elija qué foto va en `imagenes`.
   */
  imagen: string;
};

export const experiencias: Experiencia[] = [
  {
    id: "salon-ludo",
    nombre: "Salón Ludo",
    descripcion:
      "El salón privado donde ocurren las fiestas. Se monta a la temática de cada festejado y da directo a las áreas de juego.",
    imagenes: [],
    alt: "Letrero luminoso del Salón Ludo",
    acento: "lavanda",
    imagen: "/piccolo/experiencias/lugar/salon.jpg",
  },
  {
    id: "ciudad-piccolo",
    nombre: "Ciudad Piccolo",
    descripcion:
      "Supermercado, hospital, estación de bomberos y teatro a escala de niño. Aquí es donde juegan a ser grandes.",
    imagenes: [],
    alt: "Ciudad de juego a escala infantil con tiendas y casitas",
    acento: "cielo",
    imagen: "/piccolo/experiencias/lugar/ciudad.jpg",
  },
  {
    id: "zona-altura",
    nombre: "Zona de altura",
    descripcion:
      "Muro de escalada, estructuras de juego y alberca de pelotas, con acolchado y supervisión en todo momento.",
    imagenes: [],
    alt: "Niños escalando el muro junto a la alberca de pelotas",
    acento: "menta",
    imagen: "/piccolo/experiencias/lugar/escalada.jpg",
  },
  {
    id: "cafeteria",
    nombre: "Cafetería",
    descripcion:
      "Waffles, crepas, café y barra de snacks, con vista a las áreas de juego para que los papás no pierdan de vista a nadie.",
    imagenes: [],
    alt: "Cafetería de Piccolo con mesas en tonos pastel",
    acento: "durazno",
    imagen: "/piccolo/experiencias/cafeteria/cafeteria.jpg",
  },
  {
    id: "supermercado",
    nombre: "Supermercado",
    descripcion:
      "Carritos, caja registradora y anaqueles llenos. El área favorita de los más chicos del grupo.",
    imagenes: [],
    alt: "Niño empujando un carrito en el supermercado de juguete",
    acento: "menta",
    imagen: "/piccolo/experiencias/lugar/mercado.jpg",
  },
  {
    id: "zona-bebes",
    nombre: "Zona de bebés",
    descripcion:
      "Un espacio blando y separado para los de 6 meses a 2 años, con juguetes a su medida.",
    imagenes: [],
    alt: "Zona blanda de juego para bebés",
    acento: "cielo",
    imagen: "/piccolo/experiencias/lugar/bebes.jpg",
  },
];

export const ACENTO_EXPERIENCIA: Record<Experiencia["acento"], string> = {
  durazno: "var(--color-durazno)",
  menta: "var(--color-menta)",
  cielo: "var(--color-cielo)",
  lavanda: "var(--color-lavanda)",
};

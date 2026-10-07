/**
 * Testimonios.
 *
 * ⚠️ CONTENIDO TEMPORAL — TODOS son de ejemplo (`DEMO = true`).
 *
 * Ni los nombres, ni los textos, ni las celebraciones corresponden a clientes
 * reales: se escribieron para poder diseñar la página. No son reseñas
 * verificadas y no deben publicarse como tales.
 *
 * ANTES DE PRODUCCIÓN hay que sustituirlos por testimonios reales recogidos
 * con permiso de las familias, y borrar el aviso del pie de la página
 * (`src/app/testimonios/page.tsx`) junto con esta bandera.
 */

export const DEMO = true;

export type Testimonio = {
  id: string;
  /** Nombre abreviado, como se publican las reseñas. */
  nombre: string;
  /** Iniciales para el marcador de avatar mientras no hay fotografía. */
  iniciales: string;
  texto: string;
  /** Tipo de celebración o visita, al pie de la tarjeta. */
  celebracion: string;
  /** Pastel de marca del avatar. */
  acento: "durazno" | "menta" | "cielo" | "lavanda" | "rosa" | "amarillo";
  /** Da a la tarjeta un lavado pastel muy tenue; solo para romper la monotonía. */
  tinte?: boolean;
  /**
   * Fotografía del avatar. Con ruta, sustituye a las iniciales. Ejemplo:
   *   foto: "/piccolo/testimonios/mariana.jpg",
   */
  foto: string | null;
};

export const testimonios: Testimonio[] = [
  {
    id: "mariana-r",
    nombre: "Mariana R.",
    iniciales: "MR",
    texto:
      "Todo estuvo muy bien organizado. Los niños no pararon de jugar y nosotros pudimos disfrutar la fiesta sin estar pendientes de todo.",
    celebracion: "Fiesta Aventura",
    acento: "durazno",
    tinte: true,
    foto: null,
  },
  {
    id: "andrea-c",
    nombre: "Andrea C.",
    iniciales: "AC",
    texto:
      "El salón ya estaba montado cuando llegamos. No tuvimos que cargar con nada.",
    celebracion: "Fiesta Premium",
    acento: "menta",
    foto: null,
  },
  {
    id: "fernanda-g",
    nombre: "Fernanda G.",
    iniciales: "FG",
    texto:
      "Las chicas que acompañaron a los niños fueron muy atentas. Mi hija de tres años se sintió cómoda desde el primer momento y eso para mí valió toda la fiesta.",
    celebracion: "Fiesta Piccolo",
    acento: "cielo",
    foto: null,
  },
  {
    id: "laura-p",
    nombre: "Laura P.",
    iniciales: "LP",
    texto:
      "El área de juegos le encantó a mi hijo. Casi no quería salir ni para el pastel.",
    celebracion: "Fiesta Aventura",
    acento: "lavanda",
    foto: null,
  },
  {
    id: "carlos-m",
    nombre: "Carlos M.",
    iniciales: "CM",
    texto:
      "Buena relación entre lo que pagas y lo que incluye. Nos ahorramos la decoración, la comida y la animación.",
    celebracion: "Fiesta Aventura",
    acento: "amarillo",
    tinte: true,
    foto: null,
  },
  {
    id: "sofia-v",
    nombre: "Sofía V.",
    iniciales: "SV",
    texto:
      "Pudimos sentarnos a platicar con un café mientras veíamos a los niños jugar.",
    celebracion: "Visita de fin de semana",
    acento: "rosa",
    foto: null,
  },
  {
    id: "daniela-a",
    nombre: "Daniela A.",
    iniciales: "DA",
    texto:
      "Las instalaciones estaban limpias y cuidadas. Eso pesa mucho cuando llevas a los niños a un lugar cerrado.",
    celebracion: "Fiesta Premium",
    acento: "menta",
    foto: null,
  },
  {
    id: "regina-t",
    nombre: "Regina T.",
    iniciales: "RT",
    texto:
      "Pedí un cambio de fecha con poco tiempo y me lo resolvieron sin problema.",
    celebracion: "Fiesta Piccolo",
    acento: "durazno",
    foto: null,
  },
  {
    id: "alejandra-s",
    nombre: "Alejandra S.",
    iniciales: "AS",
    texto:
      "La decoración quedó como la habíamos hablado: sencilla, bonita y acorde al tema que eligió mi hija. Se nota que escuchan lo que les pides.",
    celebracion: "Fiesta Premium",
    acento: "cielo",
    tinte: true,
    foto: null,
  },
  {
    id: "paola-h",
    nombre: "Paola H.",
    iniciales: "PH",
    texto:
      "La zona de bebés nos dio tranquilidad. Mi hijo menor pudo jugar aparte de los niños más grandes.",
    celebracion: "Visita entre semana",
    acento: "lavanda",
    foto: null,
  },
];

export const PASTEL_TESTIMONIO: Record<Testimonio["acento"], string> = {
  durazno: "var(--color-durazno)",
  menta: "var(--color-menta)",
  cielo: "var(--color-cielo)",
  lavanda: "var(--color-lavanda)",
  rosa: "var(--color-rosa)",
  amarillo: "var(--color-amarillo)",
};

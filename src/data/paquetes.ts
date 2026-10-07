/**
 * Paquetes de fiesta.
 *
 * MODELO DE PRECIO — REAL. El volante del paquete de temporada publicado por
 * Piccolo Ludo Andamar en Instagram confirma la estructura comercial:
 * precio por niño (incluye 1 adulto), mínimo de niños, evento privado de 4 h,
 * anticipo del 50 % y $350 por persona extra.
 *
 * TARIFAS — el precio de $750 por niño es REAL (paquete de temporada).
 * Las tarifas de "Piccolo" y "Premium", los mínimos y las inclusiones
 * marcadas con `demo: true` son datos de ejemplo.
 */

export type Inclusion = { texto: string; demo?: boolean };

export type Paquete = {
  slug: string;
  nombre: string;
  tagline: string;
  descripcion: string;
  /** Precio por niño en MXN. Incluye 1 adulto acompañante. */
  precioPorNino: number;
  precioEsReal?: boolean;
  minNinos: number;
  maxNinos: number;
  horas: number;
  dias: string;
  /** Días en que se puede celebrar este paquete. 0 = domingo … 6 = sábado. */
  diasSemana: number[];
  edades: string;
  privado: boolean;
  /** Pastel de marca que acompaña al paquete en tarjetas y detalle. */
  acento: "durazno" | "lavanda" | "menta";
  /**
   * ANTIGUAS. Solo las usa `/paquetes/[slug]`: la composición fotográfica de
   * su cabecera, las miniaturas de «Otros paquetes» y la imagen de Open Graph.
   * No las uses en tarjetas, resúmenes ni en el configurador: ahí manda
   * `imagenes`.
   */
  imagen: string;
  imagenHero: string;
  /**
   * FUENTE OFICIAL de las fotografías del paquete.
   *
   * Vacía dibuja el marcador pastel (o, en los resúmenes pequeños, ninguna
   * imagen); una ruta la deja fija; dos o más hacen crossfade cada 2 s. Al
   * rellenarla se actualizan solas las tarjetas de `/paquetes`, las del inicio
   * y la miniatura del configurador. Ejemplo:
   *   imagenes: ["/piccolo/paquetes/aventura-1.jpg", "/piccolo/paquetes/aventura-2.jpg"],
   */
  imagenes: string[];
  incluye: Inclusion[];
  /** Ids de `extras` sugeridos para este paquete. */
  extrasSugeridos: string[];
};

export const paquetes: Paquete[] = [
  {
    slug: "piccolo",
    nombre: "Piccolo",
    tagline: "Una celebración perfecta para grupos pequeños.",
    descripcion:
      "El formato más íntimo: el grupo tiene las áreas de juego para sí mismo, con mesa decorada, alimentos y una animadora que acompaña a los niños de principio a fin.",
    precioPorNino: 590,
    minNinos: 15,
    maxNinos: 20,
    horas: 3,
    dias: "Lunes a jueves",
    diasSemana: [1, 2, 3, 4],
    edades: "De 1 a 10 años",
    privado: false,
    acento: "durazno",
    imagen: "/piccolo/paquetes/piccolo.jpg",
    imagenes: [],
    imagenHero: "/piccolo/paquetes/piccolo-hero.jpg",
    incluye: [
      { texto: "Acceso a todas las áreas de juego" },
      { texto: "Mesa decorada para el festejado", demo: true },
      { texto: "Piccolo box para cada niño (alimentos a elegir)" },
      { texto: "Dos bebidas a elegir, ilimitadas" },
      { texto: "Palomitas y agua purificada ilimitadas" },
      { texto: "Café americano ilimitado para los adultos" },
      { texto: "Una animadora durante todo el evento", demo: true },
      { texto: "Calcetines antiderrapantes para cada niño", demo: true },
    ],
    extrasSugeridos: ["decoracion", "pinata", "ceramica"],
  },
  {
    slug: "aventura",
    nombre: "Aventura",
    tagline: "Más tiempo, más juego y más momentos especiales.",
    descripcion:
      "Nuestro paquete más solicitado. Evento privado de cuatro horas con decoración temática, piñata, comida para niños y adultos, y dos animadoras con premios y pinta caritas.",
    precioPorNino: 750,
    precioEsReal: true,
    minNinos: 30,
    maxNinos: 40,
    horas: 4,
    dias: "Lunes a domingo",
    diasSemana: [0, 1, 2, 3, 4, 5, 6],
    edades: "De 3 a 10 años",
    privado: true,
    acento: "menta",
    imagen: "/piccolo/paquetes/aventura.jpg",
    imagenes: [],
    imagenHero: "/piccolo/paquetes/aventura-hero.jpg",
    incluye: [
      { texto: "Evento privado: el espacio es solo para tu grupo" },
      { texto: "Acceso a todas las áreas de juego" },
      { texto: "Decoración temática a elegir" },
      { texto: "Piñata temática con dulces" },
      { texto: "Piccolo box para cada niño (alimentos a elegir)" },
      { texto: "Tacos o bocadillos para los adultos" },
      { texto: "Dos bebidas a elegir, ilimitadas" },
      { texto: "Mix de verduras de bienvenida" },
      { texto: "Palomitas, café americano y agua purificada ilimitados" },
      { texto: "Dos animadoras con premios y pinta caritas" },
    ],
    extrasSugeridos: ["decoracion", "mesa-dulces", "hora-extra", "ceramica"],
  },
  {
    slug: "premium",
    nombre: "Premium",
    tagline: "Una experiencia completa, con los detalles que hacen la diferencia.",
    descripcion:
      "Para celebraciones grandes. Incluye todo lo del paquete Aventura más el salón privado montado a tu tema, mesa de dulces, show y coordinación del evento de principio a fin.",
    precioPorNino: 890,
    minNinos: 40,
    maxNinos: 60,
    horas: 5,
    dias: "Viernes a domingo",
    diasSemana: [0, 5, 6],
    edades: "De 3 a 10 años",
    privado: true,
    acento: "lavanda",
    imagen: "/piccolo/paquetes/premium.jpg",
    imagenes: [],
    imagenHero: "/piccolo/paquetes/premium-hero.jpg",
    incluye: [
      { texto: "Todo lo incluido en el paquete Aventura" },
      { texto: "Salón privado montado a tu temática", demo: true },
      { texto: "Mesa de dulces temática", demo: true },
      { texto: "Show o personaje durante el evento", demo: true },
      { texto: "Coordinadora asignada a tu fiesta", demo: true },
      { texto: "Menú ampliado para adultos", demo: true },
      { texto: "Sesión de fotos del montaje", demo: true },
      { texto: "Una hora extra de salón sin costo", demo: true },
    ],
    extrasSugeridos: ["show", "mesa-dulces", "hora-extra", "pinata"],
  },
];

export const getPaquete = (slug: string) => paquetes.find((p) => p.slug === slug);

/** Precio mínimo del paquete: tarifa por niño × mínimo de niños. */
export const desde = (p: Paquete) => p.precioPorNino * p.minNinos;

/**
 * Portada del paquete para miniaturas: la primera de `imagenes`, o `null`
 * mientras no haya ninguna. Quien la consuma debe saber dibujarse sin imagen.
 */
export const portada = (p: Paquete): string | null => p.imagenes[0] ?? null;

export const ACENTO: Record<Paquete["acento"], string> = {
  durazno: "var(--color-durazno)",
  lavanda: "var(--color-lavanda)",
  menta: "var(--color-menta)",
};

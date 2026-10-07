/**
 * Extras de la fiesta.
 *
 * DEMO salvo donde se indica. "Cerámica para pintar" y "Calcetines" usan el
 * precio REAL del póster de acceso de la sucursal.
 */

export type Extra = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  /** "fijo" = se cobra una vez · "porNino" = se multiplica por el número de niños */
  tipo: "fijo" | "porNino";
  precioEsReal?: boolean;
};

export const extras: Extra[] = [
  {
    id: "decoracion",
    nombre: "Decoración temática especial",
    descripcion: "Backdrop, globos y mesa principal montados a tu temática.",
    precio: 2500,
    tipo: "fijo",
  },
  {
    id: "pinata",
    nombre: "Piñata personalizada",
    descripcion: "Piñata del personaje que elija el festejado, con dulces.",
    precio: 850,
    tipo: "fijo",
  },
  {
    id: "mesa-dulces",
    nombre: "Mesa de dulces",
    descripcion: "Montaje de postres y dulces en los colores de tu tema.",
    precio: 2900,
    tipo: "fijo",
  },
  {
    id: "hora-extra",
    nombre: "Hora extra de evento",
    descripcion: "Una hora adicional de salón y áreas de juego.",
    precio: 2000,
    tipo: "fijo",
  },
  {
    id: "show",
    nombre: "Show o personaje",
    descripcion: "Visita de un personaje o show de 45 minutos.",
    precio: 2800,
    tipo: "fijo",
  },
  {
    id: "adultos",
    nombre: "Menú ampliado para adultos",
    descripcion: "Bocadillos y bebidas adicionales para los acompañantes.",
    precio: 2400,
    tipo: "fijo",
  },
  {
    id: "ceramica",
    nombre: "Cerámica para pintar",
    descripcion: "Pieza de cerámica para que cada niño pinte y se lleve.",
    precio: 70,
    tipo: "porNino",
    precioEsReal: true,
  },
];

export const getExtra = (id: string) => extras.find((e) => e.id === id);

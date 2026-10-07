/**
 * Preguntas frecuentes.
 * `demo: true` → la respuesta es un ejemplo y debe confirmarse con la clienta.
 *
 * Los datos de las respuestas (edades, mínimos, anticipo, cargos, política de
 * alimentos) son los mismos que publica el resto del sitio; si cambian ahí,
 * cambian aquí.
 */

export type Pregunta = {
  /** Identificador estable: `temasFaq` agrupa por aquí, no por el texto. */
  id: string;
  pregunta: string;
  respuesta: string;
  demo?: boolean;
  /** Se muestran también en la página de detalle de paquete. */
  enPaquete?: boolean;
};

export const faq: Pregunta[] = [
  {
    id: "edades",
    pregunta: "¿A partir de qué edad pueden asistir?",
    respuesta:
      "De 6 meses a 10 años. Los más pequeños tienen su propia zona de bebés, separada de las áreas de juego grandes.",
    enPaquete: true,
  },
  {
    id: "cuantos-ninos",
    pregunta: "¿Cuántos niños incluye cada paquete?",
    respuesta:
      "Cada paquete tiene un mínimo y un máximo de niños. El precio es por niño e incluye un adulto acompañante; cada persona adicional son $350.",
    enPaquete: true,
  },
  {
    id: "permanecer",
    pregunta: "¿Debo permanecer durante la fiesta?",
    respuesta:
      "Sí. Cada niño entra con un adulto responsable, que puede quedarse en la cafetería con vista a las áreas de juego. Nuestro equipo acompaña a los niños, pero no sustituye tu supervisión.",
    demo: true,
    enPaquete: true,
  },
  {
    id: "decoracion",
    pregunta: "¿Puedo llevar mi propia decoración?",
    respuesta:
      "Sí. Te damos acceso antes del evento para montarla, y si lo prefieres, nos encargamos nosotros como extra.",
    demo: true,
  },
  {
    id: "alimentos-externos",
    pregunta: "¿Puedo llevar pastel, comida o bebidas?",
    respuesta:
      "El pastel es bienvenido. Fuera de eso no se permite introducir alimentos ni bebidas ajenos a Piccolo: la comida de la fiesta sale de nuestra cocina y va incluida en el paquete.",
  },
  {
    id: "cambio-fecha",
    pregunta: "¿Qué pasa si necesito cambiar la fecha?",
    respuesta:
      "Puedes reprogramar sin costo avisando con 15 días o más de anticipación, sujeto a disponibilidad. Dentro de los 15 días previos, el anticipo se conserva como crédito.",
    demo: true,
  },
  {
    id: "alimentos-adultos",
    pregunta: "¿Cuentan con alimentos para adultos?",
    respuesta:
      "Sí. Los paquetes incluyen bocadillos y café americano ilimitado, y puedes ampliar el menú como extra. La cafetería sigue abierta durante el evento.",
    enPaquete: true,
  },
  {
    id: "apartar",
    pregunta: "¿Cómo aparto mi fecha?",
    respuesta:
      "Eliges paquete, fecha y horario, y la fecha queda bloqueada con el 50% del total como anticipo. El resto se liquida el día del evento.",
    enPaquete: true,
  },
  {
    id: "calcetines",
    pregunta: "¿Necesito calcetines?",
    respuesta:
      "Sí: antiderrapantes y obligatorios para niños y adultos dentro de las áreas de juego. Si olvidas los tuyos, los tenemos en recepción en $50.",
  },
  {
    id: "estacionamiento",
    pregunta: "¿Hay estacionamiento?",
    respuesta:
      "Sí, el del centro comercial. Piccolo está dentro de Plaza Andamar, en el nivel N2.",
    demo: true,
  },
];

export const faqPaquete = faq.filter((f) => f.enPaquete);

const porId = (id: string) => {
  const p = faq.find((f) => f.id === id);
  if (!p) throw new Error(`Pregunta desconocida en temasFaq: ${id}`);
  return p;
};

export type TemaFaq = {
  id: string;
  eyebrow: string;
  titulo: string;
  /** Pastel de marca de la tarjeta; el tono real se mezcla con blanco. */
  acento: "cielo" | "durazno" | "lavanda";
  preguntas: Pregunta[];
};

/**
 * Los tres bloques de la página de preguntas. El orden de cada grupo es el de
 * esta lista, no el del array de arriba: así se puede reordenar la página sin
 * mover las preguntas que el inicio y el detalle de paquete recortan por índice.
 */
export const temasFaq: TemaFaq[] = [
  {
    id: "basico",
    eyebrow: "Antes de venir",
    titulo: "Lo básico.",
    acento: "cielo",
    preguntas: ["edades", "permanecer", "calcetines", "estacionamiento"].map(porId),
  },
  {
    id: "fiesta",
    eyebrow: "Tu fiesta",
    titulo: "El gran día.",
    acento: "durazno",
    preguntas: ["cuantos-ninos", "decoracion", "alimentos-externos", "alimentos-adultos"].map(
      porId,
    ),
  },
  {
    id: "reservacion",
    eyebrow: "Reservaciones",
    titulo: "Fechas y cambios.",
    acento: "lavanda",
    preguntas: ["apartar", "cambio-fecha"].map(porId),
  },
];

/**
 * Ilustración de la tarjeta de preguntas frecuentes.
 *
 * Será un personaje infantil en 3D del universo de Piccolo interactuando con
 * un signo de interrogación grande. Mientras `src` sea `null`, la tarjeta
 * dibuja un fondo pastel; al poner la ruta, la imagen pasa a ocupar toda la
 * tarjeta y el degradado de legibilidad ya está puesto.
 *
 *   export const ilustracionFaq = {
 *     src: "/piccolo/faq/personaje-pregunta.png",
 *     alt: "Personaje de Piccolo con un signo de interrogación",
 *   };
 */
export const ilustracionFaq: { src: string | null; alt: string } = {
  src: null,
  alt: "Personaje de Piccolo con un signo de interrogación",
};

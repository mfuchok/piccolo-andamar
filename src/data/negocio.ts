/**
 * Información del negocio.
 *
 * `fuente: "real"`  → verificado en una fuente pública (ver documentacion/fuentes.md)
 * `fuente: "demo"`  → dato de ejemplo para el prototipo, debe reemplazarse
 */

export const negocio = {
  /** REAL — Google Maps (ficha "Piccolo Ludo Andamar") */
  nombre: "Piccolo",
  nombreCompleto: "Piccolo Ludo Andamar",
  /** REAL — bio de Instagram @piccolo.andamar */
  descriptorCorto: "Playdates · Cafetería · Fiestas",

  /** REAL — Google Maps + andamar.com.mx */
  direccion: {
    linea1: "Plaza Andamar, nivel N2",
    linea2: "Blvd. Adolfo Ruiz Cortines 4300, Zona Hotelera",
    linea3: "Mocambo, 94298 Boca del Río, Veracruz",
    corta: "Plaza Andamar · Boca del Río, Veracruz",
    /** Para la tarjeta de ubicación: dos líneas, sin competir con el nombre. */
    resumen: "Plaza Andamar · Nivel N2",
    ciudad: "Boca del Río, Veracruz",
    completa:
      "Blvd. Adolfo Ruiz Cortines 4300, Zona Hotelera Mocambo, 94298 Boca del Río, Veracruz",
    mapsUrl: "https://maps.app.goo.gl/L2XhKksVjXhNtGoaA",
    lat: 19.1393149,
    lng: -96.1030758,
  },

  /** REAL — póster de acceso en fachada + ficha de Andamar */
  horarios: [
    { dias: "Lunes a viernes", corto: "Lun — Vie", horario: "12:00 — 21:00" },
    { dias: "Sábados y domingos", corto: "Sáb — Dom", horario: "11:00 — 21:00" },
  ],

  /** REAL — Instagram, Google Maps y volante de paquete */
  contacto: {
    telefono: "229 208 5583",
    telefonoE164: "+522292085583",
    whatsapp: "522292085583",
    instagram: "piccolo.andamar",
    instagramUrl: "https://www.instagram.com/piccolo.andamar/",
    /** El nombre aparece en el volante oficial; la URL exacta está pendiente de confirmar. */
    facebook: "Piccolo Ludo Andamar",
    facebookUrl: null as string | null,
  },

  /** REAL — bio de Instagram */
  edades: {
    texto: "De 6 meses a 10 años",
    minMeses: 6,
    maxAnios: 10,
  },

  /** REAL — Google Maps (octubre 2026) */
  resenas: { calificacion: 4.2, total: 38 },

  /** REAL — póster "Precios de acceso" en la fachada */
  acceso: [
    { nombre: "Piccolo Pass", detalle: "3 a 10 años · incluye 1 adulto", precio: 280 },
    { nombre: "Baby Pass", detalle: "6 meses a 2 años · incluye 1 adulto", precio: 220 },
    { nombre: "Adulto extra", detalle: "Acceso a instalaciones y cafetería", precio: 90 },
  ],
  accesoAdicionales: [
    { nombre: "Calcetines antiderrapantes", detalle: "Uso obligatorio, niños y adultos", precio: 50 },
    { nombre: "Cerámica para pintar", detalle: "Actividad opcional", precio: 70 },
  ],

  /** REAL — póster de acceso */
  politicaAlimentos: "No se permite introducir alimentos ni bebidas ajenos a Piccolo.",

  /** REAL — volante del paquete de temporada publicado en Instagram */
  anticipoPorcentaje: 50,
  cargoPersonaExtra: 350,
} as const;

export const prototipo = {
  /** Se muestra en el pie y en el resumen de reservación. */
  aviso:
    "Prototipo de demostración. Disponibilidad, precios y reservaciones son simulados y no constituyen una cotización.",
} as const;

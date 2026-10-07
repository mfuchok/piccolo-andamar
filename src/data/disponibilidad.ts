/**
 * DISPONIBILIDAD — 100 % SIMULADA.
 *
 * No hay backend ni agenda real. El calendario de octubre y noviembre de 2026
 * se genera de forma determinista a partir de la fecha, con algunos días
 * fijados a mano para la demostración.
 *
 * Para conectarlo de verdad basta sustituir `getDia()` por una llamada a la
 * agenda real: la firma y los estados no necesitan cambiar.
 */

export type EstadoDia = "disponible" | "pocos" | "lleno" | "cerrado";

export type Horario = {
  /** "11:00" en formato 24 h */
  hora: string;
  etiqueta: string;
  disponible: boolean;
};

export type Dia = {
  /** ISO corto, "2026-10-17" */
  fecha: string;
  estado: EstadoDia;
  horarios: Horario[];
};

export const MESES_DEMO = [
  { anio: 2026, mes: 9 }, // octubre (0-indexed)
  { anio: 2026, mes: 10 }, // noviembre
];

const SLOTS = [
  { hora: "11:00", etiqueta: "11:00 AM" },
  { hora: "13:00", etiqueta: "1:00 PM" },
  { hora: "15:00", etiqueta: "3:00 PM" },
  { hora: "17:00", etiqueta: "5:00 PM" },
];

/** Días fijados a mano para que la demostración sea predecible. */
const FIJOS: Record<string, { estado: EstadoDia; ocupados?: string[] }> = {
  "2026-10-17": { estado: "disponible" },
  "2026-10-18": { estado: "disponible", ocupados: ["11:00"] },
  "2026-10-24": { estado: "pocos", ocupados: ["11:00", "13:00", "17:00"] },
  "2026-10-25": { estado: "lleno" },
  "2026-10-31": { estado: "lleno" },
  "2026-11-01": { estado: "pocos", ocupados: ["13:00", "15:00"] },
  "2026-11-14": { estado: "disponible" },
  "2026-11-21": { estado: "pocos", ocupados: ["11:00", "15:00", "17:00"] },
  "2026-11-22": { estado: "lleno" },
};

export const aISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;

const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
};

export function getDia(fecha: string): Dia {
  const [y, m, d] = fecha.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const diaSemana = date.getDay(); // 0 domingo … 6 sábado
  const esFinde = diaSemana === 0 || diaSemana === 6;

  const fijo = FIJOS[fecha];
  const h = hash(fecha);

  let estado: EstadoDia;
  if (fijo) {
    estado = fijo.estado;
  } else {
    // Los fines de semana se llenan más; entre semana casi siempre hay lugar.
    const r = h % 100;
    if (esFinde) estado = r < 34 ? "lleno" : r < 68 ? "pocos" : "disponible";
    else estado = r < 8 ? "lleno" : r < 26 ? "pocos" : "disponible";
  }

  const ocupados = new Set(fijo?.ocupados ?? []);
  const horarios: Horario[] = SLOTS.map((s, i) => {
    // Entre semana el local abre a las 12:00, así que no hay evento de 11:00.
    const abre = esFinde || s.hora !== "11:00";
    let disponible = abre && estado !== "lleno" && estado !== "cerrado";
    if (disponible && !fijo && estado === "pocos") {
      disponible = (h >> (i * 3)) % 3 !== 0;
    }
    if (ocupados.has(s.hora)) disponible = false;
    return { ...s, disponible };
  });

  // Coherencia: si no quedó ningún horario, el día está lleno.
  const libres = horarios.filter((x) => x.disponible).length;
  if (libres === 0) estado = "lleno";
  else if (libres === 1 && estado === "disponible") estado = "pocos";

  return { fecha, estado, horarios };
}

export const ETIQUETA_ESTADO: Record<EstadoDia, string> = {
  disponible: "Disponible",
  pocos: "Poca disponibilidad",
  lleno: "No disponible",
  cerrado: "Cerrado",
};

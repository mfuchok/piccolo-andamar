/**
 * Configuración de cobro del anticipo.
 *
 * ⚠️⚠️  LA CUENTA DE ABAJO NO ES REAL  ⚠️⚠️
 *
 * `banco`, `beneficiario` y `clabe` son MARCADORES para poder diseñar y probar
 * la pantalla de transferencia. No pertenecen a ninguna cuenta: nadie puede
 * recibir ni enviar dinero con ellos.
 *
 * ANTES DE PRODUCCIÓN:
 *   1. Sustituir los tres valores por los datos bancarios reales de Piccolo.
 *   2. Poner `COBRO_ES_DEMO` en `false`; con eso desaparece el distintivo
 *      «Datos demo» de la interfaz.
 *
 * Todo lo que no es bancario (teléfono, nombre, dirección) se lee de
 * `negocio.ts`: aquí no se duplica ningún dato que ya exista.
 */

import { negocio } from "./negocio";

/** Mientras sea `true`, la interfaz avisa de que la cuenta es de ejemplo. */
export const COBRO_ES_DEMO = true;

export const cobro = {
  /* ---- Datos bancarios: REEMPLAZAR ---- */
  banco: "BANCO DEMO",
  beneficiario: "PICCOLO ANDAMAR — DEMO",
  /** 18 dígitos sin separadores; la interfaz los agrupa al mostrarlos. */
  clabe: "000000000000000000",

  /* ---- Derivado de `negocio`, no se edita aquí ---- */
  whatsapp: negocio.contacto.whatsapp,
  nombreComercial: negocio.nombreCompleto,
  lugarDePago: {
    nombre: negocio.nombreCompleto,
    linea1: negocio.direccion.resumen,
    linea2: negocio.direccion.ciudad,
  },

  /** Prefijo del folio del pase de pago. */
  prefijoFolio: "PIC",
} as const;

/** "000000000000000000" → "000 000 000 000 000 000" */
export const clabeLegible = (clabe: string) =>
  clabe.replace(/\D/g, "").replace(/(.{3})(?=.)/g, "$1 ");

/**
 * Folio del pase — SIMULADO.
 *
 * Se calcula en el navegador a partir de la propia cotización, así que la misma
 * reservación devuelve siempre el mismo folio. No lo emite ningún servidor y no
 * reserva nada: es solo una referencia para que el equipo localice el pase.
 */
export function folioDemo(semilla: string) {
  let h = 2166136261;
  for (let i = 0; i < semilla.length; i++) {
    h ^= semilla.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const base = (h >>> 0).toString(36).toUpperCase();
  return `${cobro.prefijoFolio}-${base.padStart(6, "0").slice(-6)}`;
}

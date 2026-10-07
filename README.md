# Piccolo Andamar — prototipo de sitio

Prototipo frontend navegable para **Piccolo Ludo Andamar** (Plaza Andamar, Boca del Río,
Veracruz). Sirve para enseñarle la propuesta a la clienta, validar diseño y flujo comercial, y
entregarle a un desarrollador backend una referencia exacta de cómo debería funcionar el producto
final.

**No es el sitio de producción.** No hay backend, base de datos, autenticación, CMS ni pagos.
Disponibilidad, reservaciones y pagos están **simulados en el navegador**.

## Cómo correrlo

```bash
npm install
npm run dev
```

→ http://localhost:3020

Otros comandos: `npm run build` (compilación de producción), `npm start` (servir lo compilado).

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · sin dependencias de UI.
Tipografías: Fraunces (titulares) e Inter (interfaz), vía `next/font`.

## Estructura

```
src/
  app/                      rutas
    page.tsx                inicio
    paquetes/               lista + /[slug] detalle
    experiencias/           áreas del parque
    galeria/   faq/   ubicacion/
    disponibilidad/         calendario simulado (pasos 2 y 3)
    reservar/extras|datos|resumen   (pasos 4, 5 y 6)
  components/               Navbar, Hero, PaqueteCard, CalendarioDisponibilidad, …
  data/                     TODO el contenido editable vive aquí
  lib/
    reserva.tsx             estado del flujo + cálculo de totales
    formato.ts              moneda y fechas en es-MX
public/piccolo/             fotografías organizadas por sección
documentacion/              fuentes, qué falta conectar, qué pedirle a la clienta
```

## Dónde se edita el contenido

Todo el contenido está centralizado en `src/data/`. Cada archivo marca con comentarios qué dato
es **REAL** (verificado en una fuente pública) y cuál es **DEMO** (ejemplo reemplazable).

| Archivo | Qué contiene |
|---|---|
| `negocio.ts` | dirección, horarios, teléfono, redes, precios de acceso, políticas |
| `paquetes.ts` | los tres paquetes, precio por niño, mínimos, inclusiones. `imagenes: []` alimenta la galería automática de las tarjetas del inicio: con dos o más rutas hace crossfade cada 2 s; vacía, dibuja el marcador de posición |
| `extras.ts` | extras y su precio (fijo o por niño) |
| `disponibilidad.ts` | calendario simulado de octubre y noviembre de 2026 |
| `faq.ts` | preguntas frecuentes |
| `galeriaEventos.ts` | fotografías del carrusel de eventos del inicio; vacío dibuja marcadores de posición |
| `conocenos.ts` | las tres categorías de la sección «Conoce Piccolo» (eventos, áreas de juego, cafetería) |
| `galeria.ts` · `experiencias.ts` · `proceso.ts` | fotografías, áreas y pasos |

Ver [`documentacion/fuentes.md`](documentacion/fuentes.md) para el detalle de real vs. demo,
y [`documentacion/sistema-visual.md`](documentacion/sistema-visual.md) para la paleta, las
escalas tipográficas, el ritmo vertical y las reglas de las formas orgánicas y la fotografía.

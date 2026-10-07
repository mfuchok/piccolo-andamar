# Sistema visual

Dirección: **premium kids + playful minimalism**. Base cálida y neutra (≈80 %) con los pasteles
de Piccolo usados como acento (≈20 %): nunca una sección entera de color, sino detalles, formas,
estados e iconografía.

---

## 1. Color

Todo vive en `@theme` dentro de `src/app/globals.css`.

### Base
| Token | Hex | Uso |
|---|---|---|
| `crema` | `#fdfaf6` | fondo general |
| `marfil` | `#f8f2ea` | tarjetas y paneles |
| `arena` | `#f0e7da` | placeholder de fotografías |
| `borde` / `borde-suave` | `#ead9c6` / `#f2e7d9` | separadores |

### Tinta
`tinta #2e2521` · `tinta-media #6b5f56` · `tinta-suave #9b8c7e`. Nunca negro puro.

### Acento Piccolo
`naranja #d2783c` (botones, eyebrows, checks) · `naranja-oscuro #b4612c` (hover) ·
`naranja-claro #fbeee0` (fondos activos). Es una versión cálida y menos estridente del naranja
del logotipo real (`#f07800`), que resultaba demasiado saturado en superficies grandes.

### Pasteles de marca
`durazno #f9e3d2` · `rosa #f8dfdc` · `amarillo #faebcb` · `lavanda #ebe4f2` · `cielo #dfeaf4` ·
`verde #e4efdb` · `menta #dcece5`.

Dónde aparecen:
- formas orgánicas de fondo (`src/components/Formas.tsx`);
- círculos de los iconos en «Así de fácil»;
- píldoras de áreas en «Más que una fiesta»;
- acento por paquete (`acento` en `src/data/paquetes.ts`: durazno, menta y lavanda);
- puntos de la lista de extras en el detalle de paquete.

### Estados del calendario
`ok #7a9a4e` sobre `#e9f0dc` (disponible) · `medio #cf8c3f` sobre `#fbecd9` (poca) ·
`no #c4756c` sobre `#f8e6e3` (no disponible). Cada día es un círculo relleno, no un punto.

---

## 2. Tipografía

- **Instrument Serif** — solo el titular del hero (`.titular-hero`). Serif editorial de trazo
  fino: aporta el aire premium sin el peso de Fraunces.
- **Fraunces** — titulares de sección.
- **Jost** — navegación y el botón «Consulta tu fecha» (`.enlace-nav`). Geométrica, ligera y
  discretamente editorial.
- **Inter** — texto e interfaz.
- `.titular-hero` — hero: `clamp(2.7rem, 1.5rem + 3.6vw, 4.5rem)`, interlineado 0.98.
- `.titular` — títulos de sección: `clamp(1.7rem, 1.3rem + 1.5vw, 2.5rem)`. No compiten con el hero.
- `.titular-sm` — nombres de tarjeta.
- `.eyebrow` (naranja) para etiquetas de sección; `.eyebrow-neutro` para micro-etiquetas dentro
  de paneles y formularios.

---

## 3. Ritmo y forma

- `.seccion` = `clamp(60px, 6.4vw, 104px)` de separación entre secciones; `.seccion-corta` para
  bloques encadenados. Es la pieza que evita los huecos muertos: todo el espaciado vertical de
  las páginas pasa por estas dos clases.
- Contenedor de 1240 px con 20/36/48 px de aire lateral.
- Radios: fotografías 12–18 px, tarjetas 16 px, botones y píldoras completamente redondeados.
- `.pildora` para metadatos (capacidad, duración, días).
- `.tarjeta` para paneles (resumen, precio, formularios).

---

## 4. Formas orgánicas

`src/components/Formas.tsx` exporta `Mancha`, `Gota`, `Arco`, `Confetis` y `Medio`. Reglas:

- siempre detrás del contenido (`.forma` lleva `z-index: -1`; la sección padre necesita `isolate`);
- tamaños de 110–420 px, nunca más;
- **no se animan** y no responden al scroll;
- como máximo dos por sección;
- en móvil la mayoría se oculta (`hidden lg:block`) para no robar espacio.

---

## 5. Fotografía: qué foto va en qué lugar

| Función | Qué debe mostrar | Dónde está |
|---|---|---|
| Hero | emoción, una fiesta real | `home/hero.jpg` (fotografía de la clienta: niña entre globos pastel) |
| Paquetes | decoración y montaje | `paquetes/piccolo|aventura|premium.jpg` |
| Video | la fiesta en movimiento | `home/video-poster.jpg` (arco de globos, niños y personaje) |
| Galería | momentos | `galeria/*` |
| Experiencias | los espacios | `experiencias/*` |
| Ubicación | la fachada | `ubicacion/fachada.jpg` |

La fotografía del local vacío ya no se usa en el hero; vive en Ubicación, que es donde cumple
su función.

---

## 6. CTAs

El hero es la única pantalla con dos: «Ver paquetes» (naranja, lleva a `/paquetes`) y
«Conócenos» (contorno, hace scroll suave a `#conocenos`). En el resto, uno principal por pantalla. El resto son enlaces con flecha o tarjetas clicables completas.
`Consulta tu fecha` vive en el encabezado como pastilla con contorno, nunca como botón sólido.

---

## 7. Movimiento

Solo `.aparece` (fade + 12 px al entrar en pantalla), `.foto-zoom` (escala 1.04 al hover),
flechas que se desplazan 3 px, el acordeón y los estados del calendario. Todo se desactiva con
`prefers-reduced-motion`.

---

## 8. Nota técnica

`next.config.ts` sirve **solo WebP**. Codificar AVIF con sharp en desarrollo tarda decenas de
segundos por imagen y bloquea el optimizador, lo que dejaba fotografías sin cargar.

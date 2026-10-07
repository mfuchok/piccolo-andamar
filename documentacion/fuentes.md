# Fuentes: qué es real y qué es demo

Investigación hecha el 7 de octubre de 2026 sobre fuentes públicas.

---

## 1. Fuentes consultadas

| Fuente | URL | Qué aportó |
|---|---|---|
| Google Maps — ficha "Piccolo Ludo Andamar" | https://maps.app.goo.gl/L2XhKksVjXhNtGoaA | nombre oficial, dirección, categoría, teléfono, calificación, 18 fotos del local |
| Instagram @piccolo.andamar | https://www.instagram.com/piccolo.andamar/ | bio (servicios, edades, horario), volante del paquete de temporada con precios reales, fotos de montajes de fiesta |
| Ficha de la tienda en el centro comercial | https://andamar.com.mx/brand/piccolo/ | nivel del local (N2), horarios, descripción, teléfono |
| Sitio corporativo Piccolo Group | https://piccolomondo.com.mx/piccololudo/ | logotipo original, fotografías de las áreas de juego de la marca |
| Reseñas de Google (respuestas del propietario) | ficha de Google Maps | precio de acceso para adulto acompañante |

---

## 2. Datos REALES usados en el prototipo

### Identidad y contacto
- Nombre oficial: **Piccolo Ludo Andamar** (Google Maps). En Instagram se presenta como
  "Piccolo Ludo Veracruz". La marca comercial es **PICCOLO**.
- Dirección: Plaza Andamar, **nivel N2**, Blvd. Adolfo Ruiz Cortines 4300, Zona Hotelera,
  Mocambo, 94298 Boca del Río, Veracruz.
- Coordenadas: 19.1393149, −96.1030758.
- Teléfono / WhatsApp: **229 208 5583**.
- Instagram: `@piccolo.andamar`. En Facebook el negocio se llama *Piccolo Ludo Andamar*
  (así aparece en su propio volante), pero **no logramos verificar la URL de la página**, así que
  en el sitio aparece como texto sin enlace.
- Categoría en Google: "Centro de ocio infantil". Calificación **4.2** con **38 reseñas**.

### Operación
- Edades: **de 6 meses a 10 años** (bio de Instagram).
- Horarios: **lunes a viernes 12:00–21:00**, **sábados y domingos 11:00–21:00**
  (póster "Precios de acceso" fotografiado en la fachada).
  *Nota:* la ficha del centro comercial indica lunes a jueves hasta las 20:00. Hay que
  confirmar cuál es el vigente.
- Servicios: playdates, cafetería, fiestas de cumpleaños, paquetes todo incluido y renta de salón.
- Áreas identificadas por señalización en fotos: **Salón Ludo**, restaurante/cafetería, teatro,
  salón boutique, supermercado, hospital, estación de bomberos, muro de escalada, alberca de
  pelotas, zona de bebés.

### Precios de acceso (póster en fachada) — usados tal cual en `/experiencias`
| Concepto | Precio |
|---|---|
| Piccolo Pass (3 a 10 años, incluye 1 adulto) | $280 |
| Baby Pass (6 meses a 2 años, incluye 1 adulto) | $220 |
| Adulto extra | $90 |
| Calcetines antiderrapantes (uso obligatorio) | $50 |
| Cerámica para pintar | $70 |

- Política: "No se permite introducir alimentos y bebidas ajenos a Piccolo."

### Modelo comercial de las fiestas (volante publicado en Instagram)
El volante de un paquete de temporada confirma **cómo cobra Piccolo**, y ese modelo es el que
reproduce el prototipo:

- Precio **por niño**, que **incluye un adulto acompañante**.
- **Mínimo de niños** por evento (30 en ese paquete).
- Evento **privado** de **4 horas**.
- **Anticipo del 50 %** para apartar la fecha.
- **$350** por niño o adulto adicional.
- Inclusiones del estilo: decoración temática, piñata con dulces, Piccolo box de alimentos,
  bocadillos para adultos, dos bebidas ilimitadas, palomitas, café americano, agua purificada,
  dos animadoras con premios y pinta caritas.
- Precio real documentado: **$750 por niño** (es la tarifa que usa el paquete "Aventura").

---

## 3. Datos DEMO (hay que reemplazarlos)

Todos están centralizados en `src/data/` y marcados con comentarios.

| Dónde | Qué es demo |
|---|---|
| `paquetes.ts` | los nombres **Piccolo / Aventura / Premium**; las tarifas de $590 y $890 por niño; los mínimos y máximos (15–20, 30–40, 40–60); las duraciones de 3 y 5 horas; los días de la semana de cada paquete; las inclusiones marcadas con `demo: true` |
| `extras.ts` | todos los precios salvo "Cerámica para pintar" ($70, real) |
| `disponibilidad.ts` | **todo**: los días libres, los ocupados y los cuatro horarios (11:00, 1:00, 3:00 y 5:00 PM) |
| `paquetes.ts` → `diasSemana` | los días de la semana en que aplica cada paquete |
| `faq.ts` | las respuestas marcadas con `demo: true` (permanencia de los papás, decoración propia, cambios de fecha, estacionamiento) |
| `experiencias.ts` | los nombres de las áreas vienen de la señalización, pero las descripciones son redacción editorial |
| `negocio.ts` | nada: todo es real, con la salvedad del horario señalada arriba |

**El precio de "Aventura" ($750 por niño, mínimo 30) sí es real.** Los otros dos paquetes están
construidos alrededor de ese modelo para que la clienta vea la estructura funcionando, pero sus
tarifas son inventadas.

---

## 4. Fotografías

Todas las imágenes de `public/piccolo/` provienen de material **público de la propia marca**.
No se usó ninguna foto de otro negocio.

| Carpeta | Origen |
|---|---|
| `home/hero.jpg` | **fotografía entregada por la clienta** para el hero (niña entre globos pastel) |
| `ubicacion/`, `experiencias/salon|escalada|mercado|cafeteria.jpg`, `paquetes/*-hero.jpg`, varias de `galeria/` | fotos de la ficha de Google Maps de **Piccolo Ludo Andamar** |
| `paquetes/piccolo|aventura|premium.jpg` y la mayoría de `galeria/` | publicaciones de **Instagram @piccolo.andamar** (montajes de fiesta reales de esta sucursal) |
| `home/experiencia.jpg`, `home/video-poster.jpg`, `experiencias/ciudad.jpg`, `experiencias/bebes.jpg` | sitio corporativo **piccolomondo.com.mx** (áreas de juego y fiestas de Piccolo Ludo; son de la marca, pero **no necesariamente de la sucursal Andamar**) |
| `logo/logo.png` · `logo/logo-original.png` | **logotipo oficial de Piccolo Andamar**, entregado por la clienta. `logo-original.png` es el archivo tal cual lo recibimos; `logo.png` es el mismo con el fondo blanco convertido a transparente y el aire sobrante recortado, que es el que usa el encabezado. Los colores no se tocaron |

Tratamiento: recorte, ligera corrección cálida y compresión. Nada se alteró de forma que cambie
lo que muestran.

El hero usa la fotografía que entregó la clienta (`home/hero.jpg`, 1672 × 941 px). El resto de
las fotografías siguen siendo material público reencuadrado.

**Pendientes importantes**
- Las fotos de Instagram vienen a 640 px de ancho (es el máximo que entrega la web pública). Sirven
  para mosaicos y tarjetas, pero no para un hero a pantalla completa.
- Varias muestran rostros de niños. Son material que el propio negocio publicó, pero antes de
  salir a producción hay que confirmar con la clienta que existen las autorizaciones de imagen.
- El logotipo oficial ya está en el proyecto, pero llegó como PNG a 2231 × 705 px. Para
  impresión o pantallas muy grandes conviene pedir el **vectorial** (.ai, .eps o .svg).
- El favicon sigue siendo un marcador provisional: hace falta una versión cuadrada del logotipo.

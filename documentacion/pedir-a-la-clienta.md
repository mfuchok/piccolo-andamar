# Qué necesitamos pedirle a la clienta

Ordenado por impacto en el resultado final.

---

## 1. Fotografía y video — lo más urgente

El sitio es muy visual y hoy se sostiene con fotos tomadas de Google Maps e Instagram, que llegan
a 640–1600 px. Funcionan para el prototipo, pero el hero y las páginas de paquete piden material
propio.

- [ ] **Banco de fotos en alta resolución** (mínimo 2000 px de ancho) de: fachada, cafetería, salón
      de fiestas montado, ciudad de juego, muro de escalada, supermercado, zona de bebés.
- [ ] **Fotos horizontales de fiestas reales**: llegada de los niños, animadoras, piñata, momento
      del pastel, mesa montada. Horizontales, porque las de Instagram son verticales.
- [ ] **Una foto protagonista para el hero**: un niño o una mamá con su hijo, con espacio vacío a
      un costado para poner el titular.
- [ ] **Video de 30 a 60 segundos**, horizontal, de una fiesta completa. O los clips sueltos para
      que nosotros editemos.
- [ ] **Tres fotografías para la sección «Conoce Piccolo»**: una de un evento montado (vertical,
      es la protagonista), una de las áreas de juego y una de la cafetería. Mientras tanto esas
      tarjetas muestran marcadores de posición; solo hay que rellenar `imagen` en
      `src/data/conocenos.ts`.
- [ ] **Ilustración para la tarjeta de preguntas frecuentes**: un personaje infantil en 3D del
      universo de Piccolo (el tigre de la marca encaja) interactuando con un signo de
      interrogación grande. Nada de icono genérico ni ilustración de stock. Se conecta
      rellenando `ilustracionFaq.src` en `src/data/faq.ts`.
- [ ] **Autorización de uso de imagen** de los niños que aparecen. Varias de las fotos actuales
      muestran rostros; antes de publicar hay que confirmar que hay permiso.

## 2. Logotipo e identidad

- [ ] Archivos del logotipo en **vectorial** (.ai, .eps o .svg), en versión a color y en una sola tinta.
- [ ] Definir si el sitio conserva el logotipo actual (colorido, tipo rompecabezas) o adopta la
      versión editorial que propone el prototipo.
- [ ] Códigos de color oficiales de la marca, si existen.
- [ ] El personaje (el tigre) en alta resolución, si se quiere usar.

## 3. Información comercial

- [ ] **Los paquetes reales**: nombre, precio por niño, mínimo y máximo de niños, duración, días en
      que aplica, y la lista exacta de lo que incluye cada uno.
- [ ] **Extras reales** con su precio: decoración, piñata, mesa de dulces, hora extra, show,
      menú para adultos.
- [ ] **Política de anticipo**: ¿siempre 50 %? ¿Es reembolsable?
- [ ] **Política de cambio de fecha y cancelación**, con los plazos.
- [ ] **Cargo por persona extra**: el volante dice $350. ¿Sigue vigente? ¿Aplica igual a niño y adulto?
- [ ] ¿Se puede llevar pastel propio? ¿Y decoración propia?
- [ ] ¿Cuántos eventos pueden ocurrir al mismo tiempo?
- [ ] Temáticas disponibles para la decoración incluida.

## 4. Operación y agenda

- [ ] **Horarios en que se pueden hacer fiestas** (no los de apertura: los de evento).
- [ ] Tiempo de montaje y limpieza que hay que dejar entre un evento y otro.
- [ ] **Horario vigente del local**: el póster de la fachada dice lunes a viernes 12:00–21:00 y
      fines de semana 11:00–21:00; la ficha del centro comercial dice lunes a jueves hasta las 20:00.
- [ ] Días cerrados, temporada alta, fechas bloqueadas.

## 5. Preguntas frecuentes

Confirmar las respuestas marcadas como demo en `src/data/faq.ts`:

- [ ] ¿Los papás deben quedarse durante toda la fiesta?
- [ ] ¿Se puede llevar decoración propia? ¿Con cuánto tiempo de acceso previo?
- [ ] ¿Qué pasa si hay que cambiar la fecha?
- [ ] ¿Hay estacionamiento sin costo o validación de Plaza Andamar?
- [ ] ¿Qué incluye exactamente el "Piccolo box"?
- [ ] ¿Hay opciones para alergias o restricciones alimentarias?

## 6. Textos y datos legales

- [ ] Cómo quiere que la marca se dirija a la clienta: ¿de tú o de usted? El prototipo usa tú.
- [ ] Un párrafo con la historia del lugar, si quiere que aparezca.
- [ ] Aviso de privacidad (obligatorio en cuanto el formulario empiece a recibir datos reales).
- [ ] Razón social y datos de facturación, si se van a cobrar anticipos en línea.
- [ ] **URL de la página de Facebook.** El volante oficial menciona "Piccolo Ludo Andamar" en Facebook, pero no logramos ubicar la página; hoy aparece como texto sin enlace.
- [ ] Confirmar que el **229 208 5583** es el WhatsApp al que deben llegar las solicitudes, o dar
      el número correcto.

## 7. Dominio y publicación

- [ ] ¿Ya tiene dominio? ¿Quiere uno propio (p. ej. piccoloandamar.mx) o colgar de otro?
- [ ] Accesos a Google Business para actualizar la ficha con el sitio una vez publicado.

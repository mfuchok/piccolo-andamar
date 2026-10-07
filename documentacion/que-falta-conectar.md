# Qué está simulado y qué haría falta para que sea real

Guía para quien tome este prototipo y construya el producto final.

---

## 1. Lo que hoy está simulado

| Pieza | Cómo funciona ahora | Archivo |
|---|---|---|
| **Disponibilidad** | `getDia(fecha)` genera el estado de cada día de forma determinista a partir de un hash de la fecha, más una lista de días fijados a mano. No consulta nada | `src/data/disponibilidad.ts` |
| **Horarios** | Cuatro bloques fijos (11:00, 1:00, 3:00 y 5:00 PM). Entre semana el de 11:00 se desactiva porque el local abre a las 12:00 | mismo archivo |
| **Días por paquete** | Cada paquete declara en qué días de la semana se puede celebrar (`diasSemana`); el calendario desactiva los demás y, si se cambia de paquete, limpia una fecha que ya no aplique | `src/data/paquetes.ts` |
| **Estado de la reservación** | Contexto de React + `sessionStorage`. Se pierde al cerrar la pestaña | `src/lib/reserva.tsx` |
| **Cálculo del total** | `calcularDesglose()`; todo ocurre en el navegador | mismo archivo |
| **Formulario de datos** | Validación en cliente. **No se envía a ningún lado** | `src/app/reservar/datos/Datos.tsx` |
| **"Reservar con $X"** | Abre un modal que explica que es una demostración. No cobra nada | `src/app/reservar/resumen/Resumen.tsx` |
| **"Continuar por WhatsApp"** | Arma el texto del mensaje y ofrece copiarlo o abrir `wa.me` con el número público. No envía nada solo | mismo archivo |
| **Video** | Fotografía con botón de play; el modal explica que ahí iría el video | `src/components/SeccionVideo.tsx` |

---

## 2. Lo que habría que construir

### a) Agenda y disponibilidad
Sustituir `getDia()` por una consulta al backend. **La firma puede quedarse igual**, así el
calendario no cambia:

```ts
type Dia = {
  fecha: string;                 // "2026-10-17"
  estado: "disponible" | "pocos" | "lleno" | "cerrado";
  horarios: { hora: string; etiqueta: string; disponible: boolean }[];
};
```

Lo que el backend necesita resolver:
- cuántos eventos simultáneos admite el local (¿un salón o varios?);
- cuánto tiempo de montaje y limpieza hay que bloquear entre eventos;
- qué paquetes aplican a qué días (hoy "Piccolo" es lunes a jueves y "Premium" viernes a domingo);
- días cerrados, feriados y temporadas especiales;
- bloqueos manuales que la clienta pueda hacer desde un panel.

### b) Reservaciones
- Guardar paquete, fecha, horario, extras, datos del cliente y total.
- Bloquear el horario en cuanto se confirma el anticipo, con expiración si no se paga.
- Notificar a Piccolo (correo o WhatsApp) y al cliente.
- Permitir reprogramar y cancelar según la política.

### c) Pagos
Hoy no hay ninguno. Para cobrar el anticipo del 50 % haría falta una pasarela (Stripe o Mercado
Pago), webhooks que confirmen el cobro y la liga entre el pago y la reservación. El botón
`Reservar con $X` es el punto exacto donde entraría.

### d) Panel para la clienta
- Bloquear y liberar fechas.
- Editar precios, mínimos e inclusiones de los paquetes, y los extras.
- Ver y gestionar las solicitudes que llegan.
- Subir fotos a la galería.

Mientras no exista el panel, todo eso se edita en `src/data/` y se vuelve a publicar.

### e) Contenido
Los archivos de `src/data/` están pensados para migrar a un CMS o a una base de datos sin tocar
los componentes: cada uno exporta tipos explícitos y los componentes consumen solo esos tipos.

---

## 3. Decisiones de producto que vale la pena revisar con la clienta

1. **Precio por niño vs. precio cerrado.** El prototipo cobra por niño con un mínimo, igual que el
   volante real de Piccolo. Es más honesto, pero un "desde $22,500" asusta más que un
   "desde $12,900". Conviene decidir qué número quiere ver la mamá primero.
2. **Qué tanto precio mostrar.** Hoy se muestra todo. Otra opción es mostrar solo el precio por
   niño y dejar el total para el final del flujo.
3. **Mínimo de niños.** Cuando la mamá pide menos del mínimo, el prototipo le cobra el mínimo y se
   lo explica. Hay que confirmar que esa es la política.
4. **Mensaje de WhatsApp.** Es el corazón del objetivo comercial: convierte "hola, informes" en una
   solicitud completa. Vale la pena afinar el texto con la clienta.
5. **Pagar en línea.** Si se va a cobrar el anticipo por el sitio, hay que definir qué pasa cuando
   alguien paga y luego cancela.

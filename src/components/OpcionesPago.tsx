"use client";

import { useState } from "react";
import PaseDePago from "./PaseDePago";
import { Banco, Flecha, FlechaIzq, Ticket, Whatsapp } from "./Iconos";
import { COBRO_ES_DEMO, clabeLegible, cobro } from "@/data/pagos";
import { mxn } from "@/lib/formato";

/** Todo lo que las pantallas de pago necesitan saber de la cotización. */
export type DatosPago = {
  nombreCliente: string;
  paquete: string;
  fechaLarga: string;
  hora: string;
  total: number;
  anticipo: number;
  folio: string;
};

type Vista = "metodos" | "transferencia" | "pase";

const PASTEL = {
  cielo: "color-mix(in srgb, var(--color-cielo) 28%, white)",
  durazno: "color-mix(in srgb, var(--color-durazno) 28%, white)",
  menta: "color-mix(in srgb, var(--color-menta) 28%, white)",
};

/** Primer nombre, para que los mensajes no suenen a formulario. */
const primerNombre = (nombre: string) => nombre.trim().split(/\s+/)[0] || "";

const enlaceWhats = (texto: string) =>
  `https://wa.me/${cobro.whatsapp}?text=${encodeURIComponent(texto)}`;

/** Distintivo mientras la cuenta de `pagos.ts` siga siendo la de ejemplo. */
function EtiquetaDemo() {
  if (!COBRO_ES_DEMO) return null;
  return (
    <span className="rounded-full bg-amarillo px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-tinta-media">
      Datos demo
    </span>
  );
}

/** Estado de la reservación. Nunca dice «confirmada»: nadie ha validado el pago. */
function Estado({ texto }: { texto: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-marfil px-3 py-1.5 text-[12px] text-tinta-media">
      <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-medio" />
      {texto}
    </span>
  );
}

export default function OpcionesPago({ datos }: { datos: DatosPago }) {
  const [vista, setVista] = useState<Vista>("metodos");
  const [copiado, setCopiado] = useState<"si" | "no" | null>(null);
  const nombre = primerNombre(datos.nombreCliente);

  const msgComprobante =
    `Hola${nombre ? `, soy ${nombre}` : ""}. Realicé la transferencia del anticipo de ` +
    `${mxn(datos.anticipo)} para mi fiesta ${datos.paquete} del ${datos.fechaLarga} a las ` +
    `${datos.hora}. Te envío mi comprobante para confirmar la reservación.`;

  const msgDuda =
    `Hola${nombre ? `, soy ${nombre}` : ""}. Estoy cotizando una fiesta ${datos.paquete} para el ` +
    `${datos.fechaLarga} a las ${datos.hora}. Mi estimado es de ${mxn(datos.total)} y el anticipo ` +
    `sería de ${mxn(datos.anticipo)}. Tengo una duda antes de reservar.`;

  const msgPase =
    `Hola${nombre ? `, soy ${nombre}` : ""}. Generé mi pase de pago ${datos.folio} para la fiesta ` +
    `${datos.paquete} del ${datos.fechaLarga} a las ${datos.hora}. Pasaré a Piccolo a pagar el ` +
    `anticipo de ${mxn(datos.anticipo)} en efectivo.`;

  /**
   * Copia la CLABE. La API moderna necesita permiso y hay navegadores y vistas
   * embebidas que lo niegan, así que cae en la selección de toda la vida.
   */
  const copiarClabe = async () => {
    const porApi = async () => {
      if (!navigator.clipboard) return false;
      try {
        await navigator.clipboard.writeText(cobro.clabe);
        return true;
      } catch {
        return false;
      }
    };

    const porSeleccion = () => {
      try {
        const campo = document.createElement("textarea");
        campo.value = cobro.clabe;
        campo.setAttribute("readonly", "");
        campo.style.position = "fixed";
        campo.style.opacity = "0";
        document.body.appendChild(campo);
        campo.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(campo);
        return ok;
      } catch {
        return false;
      }
    };

    const ok = (await porApi()) || porSeleccion();
    setCopiado(ok ? "si" : "no");
    window.setTimeout(() => setCopiado(null), 2600);
  };

  const volver = (
    <button
      type="button"
      onClick={() => setVista("metodos")}
      className="enlace-flecha sin-imprimir mt-8"
    >
      <FlechaIzq /> Volver a métodos de pago
    </button>
  );

  /* ---------------------------- Transferencia ---------------------------- */
  if (vista === "transferencia") {
    return (
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow-neutro">Transferencia</p>
            <h3 className="titular-sm mt-2.5">Paga tu anticipo por transferencia</h3>
          </div>
          <Estado texto="Pendiente de confirmación" />
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          <div
            className="rounded-[20px] border border-borde-suave p-6"
            style={{ background: PASTEL.cielo }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-tinta-media">
              Anticipo a pagar
            </p>
            <p className="numeros-tabulares mt-2 font-serif text-[38px] leading-none tracking-[-0.025em]">
              {mxn(datos.anticipo)}
            </p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-tinta-media">
              Es el {Math.round((datos.anticipo / datos.total) * 100)}% de tu estimado de{" "}
              {mxn(datos.total)}. El resto se liquida el día del evento.
            </p>
          </div>

          <div className="rounded-[20px] border border-borde-suave bg-white p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-tinta-media">
                Cuenta
              </p>
              <EtiquetaDemo />
            </div>

            <dl className="mt-4 space-y-3.5">
              <div>
                <dt className="text-[12.5px] text-tinta-suave">Banco</dt>
                <dd className="text-[15px] text-tinta">{cobro.banco}</dd>
              </div>
              <div>
                <dt className="text-[12.5px] text-tinta-suave">Beneficiario</dt>
                <dd className="text-[15px] text-tinta">{cobro.beneficiario}</dd>
              </div>
              <div>
                <dt className="text-[12.5px] text-tinta-suave">CLABE</dt>
                {/* `break-all` evita que 18 dígitos desborden en pantallas estrechas. */}
                <dd className="numeros-tabulares break-all text-[15px] tracking-[0.04em] text-tinta">
                  {clabeLegible(cobro.clabe)}
                </dd>
              </div>
            </dl>

            <button type="button" onClick={copiarClabe} className="boton-linea mt-5 justify-center">
              {copiado === "si" ? "CLABE copiada" : "Copiar CLABE"}
            </button>
            {copiado === "no" && (
              <p role="status" className="mt-2 text-[12.5px] leading-relaxed text-tinta-media">
                Tu navegador no permitió copiar. Selecciona la CLABE de arriba y cópiala a mano.
              </p>
            )}
          </div>
        </div>

        <p className="mt-7 text-[14.5px] leading-relaxed text-tinta-media">
          Una vez realizada la transferencia, envíanos tu comprobante por WhatsApp para confirmar tu
          fecha.
        </p>

        <a
          href={enlaceWhats(msgComprobante)}
          target="_blank"
          rel="noopener noreferrer"
          className="boton mt-5"
        >
          <Whatsapp /> Enviar comprobante por WhatsApp
        </a>
        <p className="mt-3 text-[12.5px] leading-relaxed text-tinta-suave">
          WhatsApp se abre con el mensaje escrito; el comprobante lo adjuntas tú desde la
          conversación.
        </p>

        {volver}
      </div>
    );
  }

  /* ------------------------------- Pase --------------------------------- */
  if (vista === "pase") {
    return (
      <div>
        <div className="sin-imprimir flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow-neutro">Pago en Piccolo</p>
            <h3 className="titular-sm mt-2.5">Tu pase de pago</h3>
          </div>
          <Estado texto="Pendiente de pago" />
        </div>

        <div className="mt-7">
          <PaseDePago datos={datos} />
        </div>

        <div className="sin-imprimir mx-auto mt-6 flex w-full max-w-[420px] flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.print()}
            className="boton flex-1 justify-center"
          >
            Descargar pase
          </button>
          <a
            href={enlaceWhats(msgPase)}
            target="_blank"
            rel="noopener noreferrer"
            className="boton-linea flex-1 justify-center"
          >
            <Whatsapp /> Enviar por WhatsApp
          </a>
        </div>
        <p className="sin-imprimir mx-auto mt-3 max-w-[420px] text-[12.5px] leading-relaxed text-tinta-suave">
          «Descargar pase» abre el diálogo de impresión: desde ahí puedes guardarlo como PDF.
        </p>

        {volver}
      </div>
    );
  }

  /* ------------------------------ Métodos -------------------------------- */
  const tarjeta = "flex h-full flex-col rounded-[20px] border border-borde-suave p-6";

  return (
    <div>
      <h3 className="titular-sm">¿Cómo quieres apartar tu fecha?</h3>
      <p className="mt-2.5 text-[15px] leading-relaxed text-tinta-media">
        Elige cómo prefieres realizar tu anticipo.
      </p>

      <div className="mt-7 grid items-start gap-5 md:grid-cols-3">
        {/* --- Transferencia --- */}
        <div className={tarjeta} style={{ background: PASTEL.cielo }}>
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-tinta-media"
          >
            <Banco />
          </span>
          <p className="eyebrow-neutro mt-5">Transferencia</p>
          <h4 className="mt-2 font-serif text-[19px] leading-tight tracking-[-0.02em]">
            Paga tu anticipo por transferencia
          </h4>
          <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-tinta-media">
            Te damos los datos de la cuenta y nos mandas tu comprobante.
          </p>
          <button
            type="button"
            onClick={() => setVista("transferencia")}
            className="enlace-flecha mt-5 self-start"
          >
            Ver datos bancarios <Flecha />
          </button>
        </div>

        {/* --- Efectivo --- */}
        <div className={tarjeta} style={{ background: PASTEL.durazno }}>
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-tinta-media"
          >
            <Ticket />
          </span>
          <p className="eyebrow-neutro mt-5">Pago en Piccolo</p>
          <h4 className="mt-2 font-serif text-[19px] leading-tight tracking-[-0.02em]">
            Aparta pagando directamente en Piccolo
          </h4>
          <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-tinta-media">
            Genera tu pase de pago y preséntalo en Piccolo Andamar para realizar el anticipo en
            efectivo.
          </p>
          <button
            type="button"
            onClick={() => setVista("pase")}
            className="enlace-flecha mt-5 self-start"
          >
            Generar pase de pago <Flecha />
          </button>
        </div>

        {/* --- WhatsApp --- */}
        <div className={tarjeta} style={{ background: PASTEL.menta }}>
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-tinta-media"
          >
            <Whatsapp />
          </span>
          <p className="eyebrow-neutro mt-5">¿Tienes alguna duda?</p>
          <h4 className="mt-2 font-serif text-[19px] leading-tight tracking-[-0.02em]">
            Habla con nosotros antes de reservar
          </h4>
          <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-tinta-media">
            Si quieres confirmar algún detalle antes de pagar, escríbenos y continuamos contigo por
            WhatsApp.
          </p>
          <a
            href={enlaceWhats(msgDuda)}
            target="_blank"
            rel="noopener noreferrer"
            className="enlace-flecha mt-5 self-start"
          >
            Continuar por WhatsApp <Flecha />
          </a>
        </div>
      </div>
    </div>
  );
}

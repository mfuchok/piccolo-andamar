import { cobro } from "@/data/pagos";
import { negocio } from "@/data/negocio";
import { mxn } from "@/lib/formato";
import type { DatosPago } from "./OpcionesPago";

/**
 * Pase de pago — SIMULADO.
 *
 * Imita el comprobante que emitiría el sistema real, pero no reserva nada ni
 * existe en ningún servidor: todo sale de la cotización que el navegador tiene
 * en memoria. Por eso el estado es «pendiente de pago» y nunca «confirmada».
 *
 * `pase-imprimible` es la clase que usan las reglas `@media print` para dejar
 * esto solo en el papel.
 */
export default function PaseDePago({ datos }: { datos: DatosPago }) {
  const fila = (etiqueta: string, valor: string) => (
    <div key={etiqueta} className="flex flex-wrap justify-between gap-x-6 gap-y-0.5 py-3">
      <dt className="text-[12.5px] uppercase tracking-[0.08em] text-tinta-suave">{etiqueta}</dt>
      <dd className="text-right text-[14.5px] text-tinta">{valor}</dd>
    </div>
  );

  return (
    <div className="pase-imprimible mx-auto w-full max-w-[420px] rounded-[20px] border border-borde bg-white p-6 sm:p-7">
      <div className="text-center">
        <p className="font-serif text-[20px] leading-none tracking-[-0.02em]">Piccolo</p>
        <p className="mt-1 text-[10.5px] uppercase tracking-[0.22em] text-tinta-suave">Andamar</p>
      </div>

      <div className="mt-6 rounded-[12px] bg-marfil py-3 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-tinta-media">
          Pase de pago
        </p>
      </div>

      <dl className="mt-5 divide-y divide-borde-suave border-y border-borde-suave">
        {fila("Folio", datos.folio)}
        {fila("Cliente", datos.nombreCliente)}
        {fila("Paquete", datos.paquete)}
        {fila("Fecha del evento", datos.fechaLarga)}
        {fila("Horario", datos.hora)}
        {fila("Total estimado", mxn(datos.total))}
      </dl>

      <div className="mt-5 rounded-[14px] bg-durazno px-5 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-tinta-media">
          Anticipo a pagar
        </p>
        <p className="numeros-tabulares mt-1.5 font-serif text-[30px] leading-none tracking-[-0.025em] text-tinta">
          {mxn(datos.anticipo)}
        </p>
      </div>

      <dl className="mt-5 divide-y divide-borde-suave border-y border-borde-suave">
        {fila("Forma de pago", "Efectivo en Piccolo")}
      </dl>

      <div className="mt-5">
        <p className="text-[12.5px] uppercase tracking-[0.08em] text-tinta-suave">Lugar de pago</p>
        <address className="mt-1.5 text-[14px] not-italic leading-relaxed text-tinta">
          {cobro.lugarDePago.nombre}
          <br />
          {cobro.lugarDePago.linea1}
          <br />
          {cobro.lugarDePago.linea2}
        </address>
        <p className="mt-2 text-[13px] text-tinta-media">
          {negocio.horarios.map((h) => `${h.corto} ${h.horario}`).join(" · ")}
        </p>
      </div>

      <p className="mt-6 border-t border-borde-suave pt-5 text-[12.5px] leading-relaxed text-tinta-media">
        Presenta este pase al realizar tu pago.
      </p>
      <p className="mt-2 text-[12px] leading-relaxed text-tinta-suave">
        Este pase no confirma la reservación. La fecha queda apartada una vez recibido y registrado
        el anticipo.
      </p>
    </div>
  );
}

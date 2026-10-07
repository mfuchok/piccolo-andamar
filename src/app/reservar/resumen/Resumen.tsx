"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import Encabezado from "@/components/Encabezado";
import PasosReserva from "@/components/PasosReserva";
import GuardiaReserva from "@/components/GuardiaReserva";
import OpcionesPago, { type DatosPago } from "@/components/OpcionesPago";
import { Calendario, Flecha, FlechaIzq, Ninos, Palomita, Reloj } from "@/components/Iconos";
import { getPaquete } from "@/data/paquetes";
import { getDia } from "@/data/disponibilidad";
import { negocio, prototipo } from "@/data/negocio";
import { folioDemo } from "@/data/pagos";
import { fechaLarga, mxn } from "@/lib/formato";
import { calcularDesglose, useReserva } from "@/lib/reserva";
import { getExtra } from "@/data/extras";

export default function Resumen() {
  const { reserva, reiniciar } = useReserva();
  const [apartando, setApartando] = useState(false);
  const pago = useRef<HTMLDivElement>(null);

  const paquete = reserva.paquete ? getPaquete(reserva.paquete) : null;
  const desglose = calcularDesglose(reserva, negocio.anticipoPorcentaje);
  const horario =
    reserva.fecha && reserva.horario
      ? getDia(reserva.fecha).horarios.find((h) => h.hora === reserva.horario)
      : null;

  const extrasElegidos = reserva.extras.map(getExtra).filter((e) => e != null);

  const abrirPago = () => {
    setApartando(true);
    // Tras pintar la sección, llevamos la vista hasta ella.
    window.requestAnimationFrame(() =>
      pago.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  const datosPago: DatosPago | null =
    paquete && desglose && reserva.fecha && horario
      ? {
          nombreCliente: reserva.datos.nombre,
          paquete: paquete.nombre,
          fechaLarga: fechaLarga(reserva.fecha),
          hora: horario.etiqueta,
          total: desglose.total,
          anticipo: desglose.anticipo,
          folio: folioDemo(
            `${reserva.paquete}|${reserva.fecha}|${reserva.horario}|${reserva.datos.nombre}|${desglose.total}`,
          ),
        }
      : null;

  return (
    <GuardiaReserva requiere={["paquete", "fecha", "horario", "datos"]}>
      <div className="sin-imprimir">
        <Encabezado
          eyebrow="Paso 6 de 6"
          titulo="Tu fiesta, en resumen."
          migas={[
            { href: "/", texto: "Inicio" },
            { href: "/disponibilidad", texto: "Consulta tu fecha" },
            { href: "/reservar/resumen", texto: "Resumen" },
          ]}
        />

        <div className="contenedor mt-10 border-y border-borde py-4">
          <PasosReserva actual={6} />
        </div>
      </div>

      {paquete && desglose && (
        <div className="contenedor mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Detalle */}
          <div className="sin-imprimir lg:col-span-7">
            <h2 className="font-serif text-[30px] tracking-[-0.02em]">Paquete {paquete.nombre}</h2>

            {/* Lo esencial de la reservación, de un vistazo. */}
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icono: <Calendario />, t: "Fecha", v: fechaLarga(reserva.fecha!) },
                { icono: <Reloj />, t: "Horario", v: horario?.etiqueta ?? "" },
                { icono: <Reloj />, t: "Duración", v: `${paquete.horas} horas` },
                {
                  icono: <Ninos />,
                  t: "Niños",
                  v: `${desglose.ninosCobrados}${desglose.bajoMinimo ? " (mínimo)" : ""}`,
                },
              ].map((f) => (
                <div key={f.t} className="rounded-[14px] border border-borde-suave bg-marfil p-4">
                  <span aria-hidden="true" className="text-tinta-suave">
                    {f.icono}
                  </span>
                  <p className="mt-2 text-[11.5px] uppercase tracking-[0.1em] text-tinta-suave">
                    {f.t}
                  </p>
                  <p className="mt-1 text-[14px] leading-snug text-tinta">{f.v}</p>
                </div>
              ))}
            </div>

            <h3 className="eyebrow mt-10">Tus datos</h3>
            <dl className="mt-5 divide-y divide-borde-suave border-y border-borde text-[15px]">
              {[
                { t: "A nombre de", v: reserva.datos.nombre },
                { t: "Contacto", v: `${reserva.datos.telefono} · ${reserva.datos.email}` },
                ...(reserva.datos.edadFestejado
                  ? [{ t: "Edad del festejado", v: `${reserva.datos.edadFestejado} años` }]
                  : []),
              ].map((f) => (
                <div key={f.t} className="flex flex-wrap justify-between gap-x-6 gap-y-1 py-4">
                  <dt className="text-tinta-media">{f.t}</dt>
                  <dd className="break-words text-right">{f.v}</dd>
                </div>
              ))}
            </dl>

            {extrasElegidos.length > 0 && (
              <>
                <h3 className="eyebrow mt-10">Extras elegidos</h3>
                <ul className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                  {extrasElegidos.map((e) => (
                    <li key={e.id} className="flex gap-3 text-[14.5px] leading-snug">
                      <Palomita className="mt-[3px] shrink-0 text-naranja" />
                      <span>{e.nombre}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h3 className="eyebrow mt-10">Lo que incluye</h3>
            <ul className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {paquete.incluye.map((i) => (
                <li key={i.texto} className="flex gap-3 text-[14.5px] leading-snug">
                  <Palomita className="mt-[3px] shrink-0 text-naranja" />
                  <span>{i.texto}</span>
                </li>
              ))}
            </ul>

            {reserva.datos.comentarios.trim() && (
              <>
                <h3 className="eyebrow mt-10">Tus comentarios</h3>
                <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-tinta-media">
                  {reserva.datos.comentarios}
                </p>
              </>
            )}

            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Link href="/reservar/datos" className="enlace-flecha">
                <FlechaIzq /> Corregir mis datos
              </Link>
              <Link href="/reservar/extras" className="enlace-flecha">
                <FlechaIzq /> Cambiar extras
              </Link>
            </div>
          </div>

          {/* Totales */}
          <aside className="sin-imprimir lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-[14px] border border-borde bg-marfil p-7 sm:p-8">
                <p className="eyebrow-neutro">Estimado</p>

                <dl className="mt-6 space-y-3 text-[14.5px]">
                  {desglose.renglones.map((r) => (
                    <div key={r.concepto} className="flex items-baseline justify-between gap-4">
                      <dt className="text-tinta-media">
                        {r.concepto}
                        {r.detalle && (
                          <span className="block text-[12px] text-tinta-suave">{r.detalle}</span>
                        )}
                      </dt>
                      <dd className="numeros-tabulares shrink-0">{mxn(r.importe)}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-borde pt-6">
                  <p className="text-[15px]">Total</p>
                  <p className="numeros-tabulares font-serif text-[32px] tracking-[-0.025em]">
                    {mxn(desglose.total)}
                  </p>
                </div>

                <p className="mt-2 text-right text-[12.5px] text-tinta-suave">
                  Anticipo del {negocio.anticipoPorcentaje}%: {mxn(desglose.anticipo)}
                </p>

                <button type="button" onClick={abrirPago} className="boton mt-7 w-full justify-center">
                  Apartar con {mxn(desglose.anticipo)} <Flecha />
                </button>

                <p className="mt-5 text-[12px] leading-relaxed text-tinta-suave">
                  {prototipo.aviso}
                </p>
              </div>

              <button
                type="button"
                onClick={reiniciar}
                className="mt-6 text-[13px] text-tinta-suave underline underline-offset-4 transition-colors duration-200 hover:text-tinta"
              >
                Empezar una cotización nueva
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ---- Cómo apartar ---- */}
      {apartando && datosPago && (
        <section
          ref={pago}
          className="contenedor mt-14 scroll-mt-24 border-t border-borde pt-12 sm:mt-16"
        >
          <OpcionesPago datos={datosPago} />
        </section>
      )}
    </GuardiaReserva>
  );
}

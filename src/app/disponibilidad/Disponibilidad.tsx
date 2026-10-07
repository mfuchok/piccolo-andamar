"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Encabezado from "@/components/Encabezado";
import CalendarioDisponibilidad from "@/components/CalendarioDisponibilidad";
import SelectorPaquete from "@/components/SelectorPaquete";
import PasosReserva from "@/components/PasosReserva";
import { Flecha } from "@/components/Iconos";
import { getDia } from "@/data/disponibilidad";
import { getPaquete } from "@/data/paquetes";
import { fechaLarga, fechaMedia } from "@/lib/formato";
import { useReserva } from "@/lib/reserva";

export default function Disponibilidad() {
  const router = useRouter();
  const { reserva, listo, setFecha, setHorario } = useReserva();

  const paquete = reserva.paquete ? getPaquete(reserva.paquete) : null;
  const dia = reserva.fecha ? getDia(reserva.fecha) : null;
  const puedeSeguir = Boolean(reserva.paquete && reserva.fecha && reserva.horario);

  // Si se cambia de paquete y la fecha elegida ya no aplica, se limpia.
  useEffect(() => {
    if (!paquete || !reserva.fecha) return;
    const [y, m, d] = reserva.fecha.split("-").map(Number);
    if (!paquete.diasSemana.includes(new Date(y, m - 1, d).getDay())) setFecha(null);
  }, [paquete, reserva.fecha, setFecha]);

  return (
    <>
      <Encabezado
        eyebrow="Disponibilidad"
        titulo="Consulta tu fecha."
        texto="Elige el día que te interesa y revisa los horarios libres. Esto no aparta nada todavía: es para que sepas si tu fecha existe antes de escribirnos."
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/paquetes", texto: "Paquetes" },
          { href: "/disponibilidad", texto: "Consulta tu fecha" },
        ]}
      />

      <div className="contenedor mt-10 border-y border-borde py-4">
        <PasosReserva actual={reserva.fecha ? 3 : 2} />
      </div>

      <div className="contenedor mt-12 sm:mt-14">
        <SelectorPaquete />

        {paquete && paquete.diasSemana.length < 7 && (
          <p className="mt-4 text-[13.5px] text-tinta-media">
            El paquete {paquete.nombre} se celebra de{" "}
            <span className="lowercase">{paquete.dias.replace(/^./, (c) => c.toLowerCase())}</span>;
            los demás días aparecen desactivados en el calendario.
          </p>
        )}

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <CalendarioDisponibilidad
              seleccionada={reserva.fecha}
              diasSemana={paquete?.diasSemana}
              alSeleccionar={(f) => setFecha(f === reserva.fecha ? null : f)}
            />
          </div>

          <div className="lg:col-span-5">
            {!listo ? null : !dia ? (
              <div className="rounded-[14px] border border-dashed border-borde bg-marfil/50 px-7 py-10 text-center">
                <p className="font-serif text-[21px] tracking-[-0.02em] text-tinta-media">
                  Elige un día en el calendario
                </p>
                <p className="mx-auto mt-3 max-w-[32ch] text-[14px] leading-relaxed text-tinta-suave">
                  Te mostramos los horarios libres de ese día y un estimado de tu fiesta.
                </p>
              </div>
            ) : (
              <div className="rounded-[14px] border border-borde bg-marfil p-7 sm:p-8">
                <p className="eyebrow-neutro">Día elegido</p>
                <h2 className="mt-4 font-serif text-[26px] leading-tight tracking-[-0.02em]">
                  {fechaMedia(reserva.fecha!)}
                </h2>
                <p className="mt-1 text-[13.5px] text-tinta-suave">{fechaLarga(reserva.fecha!)}</p>

                <fieldset className="mt-8">
                  <legend className="eyebrow-neutro">Horarios disponibles</legend>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {dia.horarios.map((h) => {
                      const activo = reserva.horario === h.hora;
                      return (
                        <label
                          key={h.hora}
                          className={`relative rounded-[14px] border px-4 py-3 text-center text-[14.5px] transition-colors duration-200 ${
                            !h.disponible
                              ? "cursor-not-allowed border-borde-suave text-tinta-suave/45 line-through"
                              : activo
                                ? "cursor-pointer border-tinta bg-tinta text-crema"
                                : "cursor-pointer border-borde bg-crema hover:border-tinta-suave"
                          }`}
                        >
                          <input
                            type="radio"
                            name="horario"
                            value={h.hora}
                            disabled={!h.disponible}
                            checked={activo}
                            onChange={() => setHorario(h.hora)}
                            className="sr-only"
                          />
                          <span className="numeros-tabulares">{h.etiqueta}</span>
                        </label>
                      );
                    })}
                  </div>
                  {dia.horarios.every((h) => !h.disponible) && (
                    <p className="mt-4 text-[13.5px] text-tinta-media">
                      Este día ya no tiene horarios libres. Prueba con otro.
                    </p>
                  )}
                </fieldset>

                {paquete && (
                  <dl className="mt-8 space-y-2.5 border-t border-borde pt-6 text-[14px]">
                    <div className="flex justify-between gap-4">
                      <dt className="text-tinta-media">Paquete</dt>
                      <dd>{paquete.nombre}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-tinta-media">Duración</dt>
                      <dd>{paquete.horas} horas</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-tinta-media">Capacidad</dt>
                      <dd>Hasta {paquete.maxNinos} niños</dd>
                    </div>
                  </dl>
                )}

                <button
                  type="button"
                  disabled={!puedeSeguir}
                  onClick={() => router.push("/reservar/extras")}
                  className="boton mt-8 w-full justify-center"
                >
                  Personaliza tu fiesta <Flecha />
                </button>

                {!reserva.paquete && (
                  <p className="mt-4 text-center text-[13px] text-tinta-suave">
                    Elige primero un paquete arriba.
                  </p>
                )}
                {reserva.paquete && !reserva.horario && (
                  <p className="mt-4 text-center text-[13px] text-tinta-suave">
                    Elige un horario para continuar.
                  </p>
                )}
              </div>
            )}

            <p className="mt-6 text-[12.5px] leading-relaxed text-tinta-suave">
              Disponibilidad simulada para la demostración. En la versión final se conecta con la
              agenda real de Piccolo.{" "}
              <Link href="/faq" className="underline underline-offset-2 hover:text-tinta">
                Dudas frecuentes
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

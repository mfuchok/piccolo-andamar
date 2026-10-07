"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Encabezado from "@/components/Encabezado";
import PasosReserva from "@/components/PasosReserva";
import ResumenLateral from "@/components/ResumenLateral";
import GuardiaReserva from "@/components/GuardiaReserva";
import { Flecha, FlechaIzq } from "@/components/Iconos";
import { getPaquete } from "@/data/paquetes";
import { useReserva, type DatosCliente } from "@/lib/reserva";

type Errores = Partial<Record<keyof DatosCliente, string>>;

function validar(d: DatosCliente, minNinos: number, maxNinos: number): Errores {
  const e: Errores = {};
  if (d.nombre.trim().length < 3) e.nombre = "Escribe tu nombre completo.";

  const tel = d.telefono.replace(/\D/g, "");
  if (tel.length < 10) e.telefono = "Escribe un teléfono a 10 dígitos.";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim()))
    e.email = "Revisa tu correo electrónico.";

  const ninos = parseInt(d.ninos, 10);
  if (!Number.isFinite(ninos) || ninos < 1) e.ninos = "Dinos cuántos niños esperas.";
  else if (ninos > maxNinos)
    e.ninos = `Este paquete llega hasta ${maxNinos} niños. Escríbenos para grupos más grandes.`;

  return e;
}

const campoBase =
  "w-full rounded-[14px] border bg-crema px-4 py-3 text-[15px] text-tinta transition-colors duration-200 placeholder:text-tinta-suave/70";

export default function Datos() {
  const router = useRouter();
  const { reserva, setDatos } = useReserva();
  const [errores, setErrores] = useState<Errores>({});
  const [intentado, setIntentado] = useState(false);

  const paquete = reserva.paquete ? getPaquete(reserva.paquete) : null;
  const minNinos = paquete?.minNinos ?? 1;
  const maxNinos = paquete?.maxNinos ?? 999;

  const alEnviar = (ev: FormEvent) => {
    ev.preventDefault();
    setIntentado(true);
    const e = validar(reserva.datos, minNinos, maxNinos);
    setErrores(e);
    if (Object.keys(e).length === 0) {
      router.push("/reservar/resumen");
      return;
    }
    const primero = Object.keys(e)[0];
    document.getElementById(primero)?.focus();
  };

  const alCambiar = (campo: keyof DatosCliente, valor: string) => {
    setDatos({ [campo]: valor } as Partial<DatosCliente>);
    if (intentado) {
      setErrores(validar({ ...reserva.datos, [campo]: valor }, minNinos, maxNinos));
    }
  };

  const clase = (campo: keyof DatosCliente) =>
    `${campoBase} ${errores[campo] ? "border-no" : "border-borde focus:border-tinta-suave"}`;

  const ninosNum = parseInt(reserva.datos.ninos, 10);
  const avisoMinimo =
    Number.isFinite(ninosNum) && ninosNum > 0 && ninosNum < minNinos
      ? `El paquete ${paquete?.nombre} tiene un mínimo de ${minNinos} niños: el estimado se calcula sobre ese mínimo.`
      : null;

  return (
    <GuardiaReserva requiere={["paquete", "fecha", "horario"]}>
      <Encabezado
        eyebrow="Paso 5 de 6"
        titulo="Tus datos."
        texto="Cuéntanos un poco sobre la celebración para poder asesorarte mejor."
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/disponibilidad", texto: "Consulta tu fecha" },
          { href: "/reservar/datos", texto: "Tus datos" },
        ]}
      />

      <div className="contenedor mt-10 border-y border-borde py-4">
        <PasosReserva actual={5} />
      </div>

      <div className="contenedor mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <form noValidate onSubmit={alEnviar} className="space-y-6">
            <div>
              <label htmlFor="nombre" className="mb-2 block text-[13.5px] text-tinta-media">
                Nombre completo
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                autoComplete="name"
                placeholder="Tu nombre"
                value={reserva.datos.nombre}
                onChange={(e) => alCambiar("nombre", e.target.value)}
                aria-invalid={Boolean(errores.nombre)}
                aria-describedby={errores.nombre ? "err-nombre" : undefined}
                className={clase("nombre")}
              />
              {errores.nombre && (
                <p id="err-nombre" className="mt-2 text-[13px] text-no">
                  {errores.nombre}
                </p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="telefono" className="mb-2 block text-[13.5px] text-tinta-media">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="229 000 0000"
                  value={reserva.datos.telefono}
                  onChange={(e) => alCambiar("telefono", e.target.value)}
                  aria-invalid={Boolean(errores.telefono)}
                  aria-describedby={errores.telefono ? "err-telefono" : undefined}
                  className={clase("telefono")}
                />
                {errores.telefono && (
                  <p id="err-telefono" className="mt-2 text-[13px] text-no">
                    {errores.telefono}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-[13.5px] text-tinta-media">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@email.com"
                  value={reserva.datos.email}
                  onChange={(e) => alCambiar("email", e.target.value)}
                  aria-invalid={Boolean(errores.email)}
                  aria-describedby={errores.email ? "err-email" : undefined}
                  className={clase("email")}
                />
                {errores.email && (
                  <p id="err-email" className="mt-2 text-[13px] text-no">
                    {errores.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="edadFestejado"
                  className="mb-2 block text-[13.5px] text-tinta-media"
                >
                  Edad que cumple <span className="text-tinta-suave">(opcional)</span>
                </label>
                <select
                  id="edadFestejado"
                  name="edadFestejado"
                  value={reserva.datos.edadFestejado}
                  onChange={(e) => alCambiar("edadFestejado", e.target.value)}
                  className={`${campoBase} border-borde focus:border-tinta-suave`}
                >
                  <option value="">Selecciona</option>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={String(n)}>
                      {n} {n === 1 ? "año" : "años"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="ninos" className="mb-2 block text-[13.5px] text-tinta-media">
                  Número aproximado de niños
                </label>
                <input
                  id="ninos"
                  name="ninos"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={maxNinos}
                  placeholder={String(minNinos)}
                  value={reserva.datos.ninos}
                  onChange={(e) => alCambiar("ninos", e.target.value)}
                  aria-invalid={Boolean(errores.ninos)}
                  aria-describedby={errores.ninos ? "err-ninos" : "ayuda-ninos"}
                  className={clase("ninos")}
                />
                {errores.ninos ? (
                  <p id="err-ninos" className="mt-2 text-[13px] text-no">
                    {errores.ninos}
                  </p>
                ) : (
                  <p id="ayuda-ninos" className="mt-2 text-[13px] text-tinta-suave">
                    Mínimo {minNinos} · máximo {maxNinos}
                  </p>
                )}
              </div>
            </div>

            {avisoMinimo && (
              <p className="rounded-[14px] bg-medio-fondo px-4 py-3 text-[13.5px] leading-relaxed text-tinta-media">
                {avisoMinimo}
              </p>
            )}

            <div>
              <label htmlFor="comentarios" className="mb-2 block text-[13.5px] text-tinta-media">
                Comentarios <span className="text-tinta-suave">(opcional)</span>
              </label>
              <textarea
                id="comentarios"
                name="comentarios"
                rows={4}
                placeholder="Cuéntanos más sobre tu fiesta: temática, alergias, horarios…"
                value={reserva.datos.comentarios}
                onChange={(e) => alCambiar("comentarios", e.target.value)}
                className={`${campoBase} resize-y border-borde focus:border-tinta-suave`}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-5 pt-2">
              <Link href="/reservar/extras" className="enlace-flecha">
                <FlechaIzq /> Volver a extras
              </Link>
              <button type="submit" className="boton">
                Ver mi resumen <Flecha />
              </button>
            </div>

            <p className="text-[12.5px] leading-relaxed text-tinta-suave">
              Prototipo: los datos no se envían a ningún servidor; se guardan solo en tu navegador
              para armar el resumen.
            </p>
          </form>
        </div>

        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <ResumenLateral compacto />
          </div>
        </aside>
      </div>
    </GuardiaReserva>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Encabezado from "@/components/Encabezado";
import Acordeon from "@/components/Acordeon";
import Aparece from "@/components/Aparece";
import BotonConsultar from "@/components/BotonConsultar";
import { Confetis, Mancha } from "@/components/Formas";
import { Calendario, Flecha, Ninos, Palomita, Reloj, Whatsapp } from "@/components/Iconos";
import { ACENTO, desde, getPaquete, paquetes } from "@/data/paquetes";
import { extras, getExtra } from "@/data/extras";
import { faqPaquete } from "@/data/faq";
import { negocio } from "@/data/negocio";
import { galeria } from "@/data/galeria";
import { mxn } from "@/lib/formato";

type Props = { params: Promise<{ slug: string }> };

/** Pasteles que se van turnando en los puntos de la lista de extras. */
const PUNTOS = [
  "var(--color-durazno)",
  "var(--color-cielo)",
  "var(--color-verde)",
  "var(--color-lavanda)",
  "var(--color-rosa)",
  "var(--color-amarillo)",
  "var(--color-menta)",
];

export function generateStaticParams() {
  return paquetes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const paquete = getPaquete(slug);
  if (!paquete) return {};
  return {
    title: `Paquete ${paquete.nombre}`,
    description: `${paquete.tagline} ${paquete.minNinos} a ${paquete.maxNinos} niños, ${paquete.horas} horas. Desde ${mxn(desde(paquete))} en Piccolo Andamar.`,
    openGraph: { images: [{ url: paquete.imagen }] },
  };
}

export default async function DetallePaquete({ params }: Props) {
  const { slug } = await params;
  const paquete = getPaquete(slug);
  if (!paquete) notFound();

  const sugeridos = paquete.extrasSugeridos
    .map(getExtra)
    .filter((e): e is NonNullable<typeof e> => Boolean(e));
  const otros = extras.filter((e) => !paquete.extrasSugeridos.includes(e.id));
  const listaExtras = [...sugeridos, ...otros];
  const otrosPaquetes = paquetes.filter((p) => p.slug !== paquete.slug);
  const apoyo = [paquete.imagenHero, ...galeria.slice(0, 3).map((g) => g.src)];

  return (
    <>
      <Encabezado
        eyebrow={paquete.privado ? "Evento privado" : "Paquete"}
        titulo={<>Paquete {paquete.nombre}</>}
        texto={paquete.descripcion}
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/paquetes", texto: "Paquetes" },
          { href: `/paquetes/${paquete.slug}`, texto: paquete.nombre },
        ]}
      >
        <ul className="mt-7 flex flex-wrap gap-2">
          <li className="pildora">
            <Ninos className="h-[15px] w-[15px]" /> {paquete.minNinos} a {paquete.maxNinos} niños
          </li>
          <li className="pildora">
            <Reloj className="h-[15px] w-[15px]" /> {paquete.horas} horas
          </li>
          <li className="pildora">
            <Calendario className="h-[15px] w-[15px]" /> {paquete.dias}
          </li>
          <li className="pildora">Edades {paquete.edades.replace("De ", "")}</li>
        </ul>
      </Encabezado>

      {/* Composición fotográfica: la decoración del paquete y el espacio */}
      <div className="contenedor seccion-corta">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
          <div className="relative col-span-2 row-span-2 aspect-square overflow-hidden rounded-[18px] bg-arena">
            <Image
              src={paquete.imagen}
              alt={`Montaje de una fiesta del paquete ${paquete.nombre}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {apoyo.map((src, i) => (
            <div
              key={src + i}
              className="relative aspect-square overflow-hidden rounded-[14px] bg-arena"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="contenedor seccion">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ---- Columna principal ---- */}
          <div className="lg:col-span-7">
            <Aparece className="relative isolate">
              <Mancha
                className="-left-14 -top-8 hidden w-[140px] lg:block"
                color={ACENTO[paquete.acento]}
              />
              <h2 className="titular">¿Qué incluye?</h2>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {paquete.incluye.map((item) => (
                  <li key={item.texto} className="flex gap-3 text-[15px] leading-snug">
                    <Palomita className="mt-[3px] shrink-0 text-naranja" />
                    <span>{item.texto}</span>
                  </li>
                ))}
              </ul>
            </Aparece>

            <Aparece className="seccion-corta">
              <div className="flex items-end justify-between gap-6 border-b border-borde pb-3">
                <h2 className="titular">Extras disponibles</h2>
                <p className="text-[11px] uppercase tracking-[0.14em] text-tinta-suave">Desde</p>
              </div>
              <ul>
                {listaExtras.map((e, i) => (
                  <li
                    key={e.id}
                    className="flex items-center gap-3 border-b border-borde-suave py-3.5"
                  >
                    <span
                      aria-hidden="true"
                      className="h-[9px] w-[9px] shrink-0 rounded-full"
                      style={{ background: PUNTOS[i % PUNTOS.length] }}
                    />
                    <span className="shrink-0 text-[15px]">{e.nombre}</span>
                    <span
                      aria-hidden="true"
                      className="mb-1 h-px min-w-5 flex-1 border-b border-dotted border-borde"
                    />
                    <span className="numeros-tabulares shrink-0 text-[15px]">
                      +{mxn(e.precio)}
                      {e.tipo === "porNino" && (
                        <span className="text-[12px] text-tinta-suave"> / niño</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </Aparece>

            <Aparece className="mt-7">
              <div
                className="flex flex-wrap items-center justify-between gap-5 rounded-[16px] px-6 py-5"
                style={{ background: ACENTO[paquete.acento] }}
              >
                <div>
                  <h3 className="font-serif text-[19px] tracking-[-0.02em]">
                    ¿Tienes una idea especial?
                  </h3>
                  <p className="mt-1 max-w-[46ch] text-[14px] leading-relaxed text-tinta-media">
                    Nos encantaría ayudarte a personalizar tu fiesta. Cuéntanos la temática y la
                    montamos contigo.
                  </p>
                </div>
                <a
                  href={`https://wa.me/${negocio.contacto.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-crema px-5 py-2.5 text-[14px] text-tinta transition-colors duration-200 hover:bg-white"
                >
                  <Whatsapp className="h-[16px] w-[16px]" /> Escríbenos
                </a>
              </div>
            </Aparece>
          </div>

          {/* ---- Panel de precio ---- */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="tarjeta relative isolate overflow-hidden p-7">
                <span
                  aria-hidden="true"
                  className="absolute -right-8 -top-8 h-28 w-28 rounded-full"
                  style={{ background: ACENTO[paquete.acento], zIndex: -1 }}
                />
                <p className="eyebrow-neutro">Precio</p>
                <p className="numeros-tabulares mt-4 font-serif text-[38px] leading-none tracking-[-0.025em]">
                  {mxn(paquete.precioPorNino)}
                </p>
                <p className="mt-1.5 text-[13.5px] text-tinta-media">
                  por niño, incluye un adulto acompañante
                </p>

                <dl className="mt-6 space-y-2.5 border-t border-borde pt-5 text-[14px]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-tinta-media">Mínimo de niños</dt>
                    <dd className="numeros-tabulares">{paquete.minNinos}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-tinta-media">Total desde</dt>
                    <dd className="numeros-tabulares">{mxn(desde(paquete))}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-tinta-media">Persona adicional</dt>
                    <dd className="numeros-tabulares">{mxn(negocio.cargoPersonaExtra)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-tinta-media">Anticipo</dt>
                    <dd className="numeros-tabulares">{negocio.anticipoPorcentaje}% del total</dd>
                  </div>
                </dl>

                <BotonConsultar slug={paquete.slug} className="mt-7 w-full justify-center" />

                <p className="mt-4 text-[12.5px] leading-relaxed text-tinta-suave">
                  Elegir fecha no compromete nada. Verás disponibilidad real y un estimado antes de
                  escribirnos.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* FAQ */}
      <section className="contenedor seccion relative isolate">
        <Confetis className="-right-4 -top-6 hidden w-[110px] lg:block" />
        <div className="grid gap-7 md:grid-cols-12 md:gap-12">
          <Aparece className="md:col-span-4">
            <p className="eyebrow">Dudas</p>
            <h2 className="titular mt-3">Antes de apartar.</h2>
            <Link href="/faq" className="enlace-flecha mt-6">
              Ver todas las preguntas <Flecha />
            </Link>
          </Aparece>
          <Aparece className="md:col-span-8" delay={70}>
            <Acordeon preguntas={faqPaquete} />
          </Aparece>
        </div>
      </section>

      {/* Otros paquetes */}
      <section className="contenedor seccion">
        <h2 className="eyebrow-neutro">Otros paquetes</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-8">
          {otrosPaquetes.map((p) => (
            <Link key={p.slug} href={`/paquetes/${p.slug}`} className="foto-zoom group block">
              <div className="relative aspect-3/2 overflow-hidden rounded-[16px] bg-arena">
                <Image
                  src={p.imagen}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-5">
                <h3 className="titular-sm">{p.nombre}</h3>
                <p className="numeros-tabulares text-[13.5px] text-tinta-media">
                  desde {mxn(desde(p))}
                </p>
              </div>
              <p className="mt-1.5 max-w-[42ch] text-[14px] leading-relaxed text-tinta-media">
                {p.tagline}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

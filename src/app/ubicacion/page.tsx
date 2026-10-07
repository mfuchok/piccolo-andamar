import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Encabezado from "@/components/Encabezado";
import Aparece from "@/components/Aparece";
import TiraFotos, { type FotoTira } from "@/components/TiraFotos";
import { Flecha, Pin, Whatsapp } from "@/components/Iconos";
import { negocio } from "@/data/negocio";

export const metadata: Metadata = {
  title: "Ubicación y horarios",
  description:
    "Piccolo está en Plaza Andamar, nivel N2, Boca del Río, Veracruz. Horarios, teléfono y cómo llegar.",
};

/**
 * Fotografías del establecimiento. Todas existen ya en el proyecto; la fachada
 * no entra aquí porque es la imagen de la tarjeta principal.
 */
const EL_ESPACIO: FotoTira[] = [
  {
    src: "/piccolo/ubicacion/plaza.jpg",
    alt: "Pasillo de Plaza Andamar, centro comercial donde está Piccolo",
  },
  {
    src: "/piccolo/experiencias/lugar/salon.jpg",
    alt: "Letrero luminoso del Salón Ludo dentro de Piccolo",
  },
  {
    src: "/piccolo/experiencias/lugar/ciudad.jpg",
    alt: "Ciudad de juego a escala infantil con tiendas y casitas",
  },
  {
    src: "/piccolo/experiencias/cafeteria/cafeteria.jpg",
    alt: "Cafetería de Piccolo con mesas en tonos pastel",
  },
  {
    src: "/piccolo/experiencias/lugar/escalada.jpg",
    alt: "Niños escalando el muro junto a la alberca de pelotas",
  },
  {
    src: "/piccolo/experiencias/lugar/mercado.jpg",
    alt: "Niño empujando un carrito en el supermercado de juguete",
  },
  {
    src: "/piccolo/experiencias/lugar/bebes.jpg",
    alt: "Zona blanda de juego para bebés",
  },
];

export default function Ubicacion() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    name: negocio.nombreCompleto,
    telephone: negocio.contacto.telefonoE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: negocio.direccion.linea2,
      addressLocality: "Boca del Río",
      addressRegion: "Veracruz",
      postalCode: "94298",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: negocio.direccion.lat,
      longitude: negocio.direccion.lng,
    },
    sameAs: [negocio.contacto.instagramUrl],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Encabezado
        eyebrow="Visítanos"
        titulo={
          <>
            Nos vemos
            <br className="hidden sm:block" /> en Andamar.
          </>
        }
        anchoTexto="max-w-[70ch] lg:max-w-[760px]"
        texto="Estamos en Plaza Andamar, nivel N2, en Boca del Río."
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/ubicacion", texto: "Ubicación" },
        ]}
      />

      {/* ---------------- Pieza principal ---------------- */}
      <div className="contenedor mt-10 sm:mt-14">
        <Aparece className="overflow-hidden rounded-[30px] border border-borde-suave bg-white">
          <div className="grid lg:grid-cols-5">
            {/* La foto no fija su alto: lo toma de la fila, que marca el panel. */}
            <div className="relative aspect-4/3 bg-arena lg:col-span-3 lg:aspect-auto">
              <Image
                src="/piccolo/ubicacion/fachada.jpg"
                alt="Fachada de Piccolo en Plaza Andamar con el letrero de bienvenida"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>

            <div
              className="relative isolate p-6 sm:p-8 lg:col-span-2"
              style={{ background: "color-mix(in srgb, var(--color-menta) 30%, white)" }}
            >
              {/* Tres círculos que asoman por la esquina; el recorte de la
                  tarjeta se encarga de que solo se vea una parte. */}
              <span
                aria-hidden="true"
                className="absolute -right-7 -top-9 -z-10 h-24 w-24 rounded-full bg-cielo/70"
              />
              <span
                aria-hidden="true"
                className="absolute right-12 top-12 -z-10 h-7 w-7 rounded-full bg-durazno/80"
              />
              <span
                aria-hidden="true"
                className="absolute -right-2 top-24 -z-10 h-4 w-4 rounded-full bg-lavanda"
              />

              <h2 className="eyebrow-neutro">Piccolo Andamar</h2>
              <address className="mt-3 text-[16.5px] not-italic leading-relaxed">
                <span className="block">{negocio.direccion.resumen}</span>
                <span className="block text-tinta-media">{negocio.direccion.ciudad}</span>
              </address>

              <a
                href={negocio.direccion.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="enlace-flecha mt-5"
              >
                <Pin className="h-4 w-4" /> Ver en Google Maps <Flecha />
              </a>

              <div className="mt-7 grid gap-3 border-t border-borde-suave pt-7 sm:grid-cols-2">
                <div className="rounded-[14px] bg-white/70 p-4">
                  <h3 className="eyebrow-neutro">Horario</h3>
                  <dl className="mt-3 space-y-2.5 text-[14px]">
                    {negocio.horarios.map((h) => (
                      <div key={h.dias}>
                        <dt className="text-tinta-media">{h.corto}</dt>
                        <dd className="numeros-tabulares text-tinta">{h.horario}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="rounded-[14px] bg-white/70 p-4">
                  <h3 className="eyebrow-neutro">Contacto</h3>
                  <dl className="mt-3 space-y-2.5 text-[14px]">
                    <div>
                      <dt className="text-tinta-media">WhatsApp</dt>
                      <dd>
                        <a
                          href={`https://wa.me/${negocio.contacto.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="numeros-tabulares text-tinta transition-colors duration-200 hover:text-naranja"
                        >
                          {negocio.contacto.telefono}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-tinta-media">Instagram</dt>
                      <dd>
                        <a
                          href={negocio.contacto.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-tinta transition-colors duration-200 hover:text-naranja"
                        >
                          @{negocio.contacto.instagram}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/disponibilidad" className="boton justify-center">
                  Consulta tu fecha <Flecha />
                </Link>
                <a
                  href={`https://wa.me/${negocio.contacto.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="boton-linea justify-center"
                >
                  <Whatsapp /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Aparece>
      </div>

      {/* ---------------- El espacio ---------------- */}
      <section className="contenedor mt-14 sm:mt-20">
        <Aparece className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <p className="eyebrow">El espacio</p>
            <h2 className="titular mt-3">Un vistazo antes de llegar.</h2>
          </div>
        </Aparece>

        <Aparece className="mt-7" delay={60}>
          <TiraFotos fotos={EL_ESPACIO} etiqueta="Fotografías del espacio" />
        </Aparece>
      </section>
    </>
  );
}

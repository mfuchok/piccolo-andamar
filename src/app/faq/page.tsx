import type { Metadata } from "next";
import Link from "next/link";
import Encabezado from "@/components/Encabezado";
import Aparece from "@/components/Aparece";
import TarjetaTemaFaq from "@/components/TarjetaTemaFaq";
import { Arco, Confetis, Mancha } from "@/components/Formas";
import { Flecha, Whatsapp } from "@/components/Iconos";
import { faq, temasFaq } from "@/data/faq";
import { negocio } from "@/data/negocio";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Edades, capacidad, decoración propia, cambios de fecha, alimentos y cómo apartar: todo lo que una mamá pregunta antes de contratar una fiesta en Piccolo.",
};

/**
 * Una forma por tema, asomando por la esquina superior de su tarjeta.
 * Van en el mismo orden que `temasFaq`.
 *
 * El desplazamiento nunca supera el padding del contenedor (20px hasta `md`,
 * 36px a partir de ahí): si lo supera, la forma crea scroll horizontal.
 */
const DECORACIONES = [
  <Arco
    key="basico"
    className="-right-4 -top-5 w-[64px] md:-right-5 md:-top-6 md:w-[76px]"
    color="var(--color-menta)"
  />,
  <Confetis key="fiesta" className="-right-4 -top-5 w-[74px] md:-right-6 md:-top-7 md:w-[88px]" />,
  <Mancha
    key="reservacion"
    className="-right-4 -top-5 w-[56px] md:-right-5 md:-top-6 md:w-[66px]"
    color="var(--color-amarillo)"
  />,
];

export default function PaginaFaq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.pregunta,
      acceptedAnswer: { "@type": "Answer", text: f.respuesta },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Encabezado
        eyebrow="Dudas"
        titulo={
          <>
            Todo claro
            <br className="hidden sm:block" /> antes de celebrar.
          </>
        }
        anchoTexto="max-w-[72ch] lg:max-w-[820px]"
        texto="Resolvemos lo más importante para que solo tengas que elegir tu fecha."
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/faq", texto: "FAQ" },
        ]}
      />

      {/* `items-start`: cada tema crece lo que pidan sus preguntas. */}
      <div className="contenedor mt-10 grid items-start gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {temasFaq.map((tema, i) => (
          <Aparece key={tema.id} delay={i * 70}>
            <TarjetaTemaFaq tema={tema} decoracion={DECORACIONES[i]} />
          </Aparece>
        ))}
      </div>

      {/* Cierre */}
      <section className="contenedor mt-12 sm:mt-16">
        <Aparece className="flex flex-col gap-7 rounded-[22px] bg-menta px-6 py-7 sm:px-9 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div>
            <p className="eyebrow-neutro">¿Algo más?</p>
            <h2 className="font-serif text-[23px] leading-tight tracking-[-0.02em] mt-2.5 sm:text-[27px]">
              ¿Te quedó otra duda?
            </h2>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-tinta-media">
              Escríbenos y te ayudamos a resolverla.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4 lg:shrink-0">
            <a
              href={`https://wa.me/${negocio.contacto.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="boton"
            >
              <Whatsapp /> Hablar por WhatsApp
            </a>
            <Link href="/disponibilidad" className="boton-linea">
              Consulta tu fecha <Flecha />
            </Link>
          </div>
        </Aparece>
      </section>
    </>
  );
}

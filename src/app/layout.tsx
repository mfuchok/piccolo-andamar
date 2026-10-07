import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Serif, Inter, Jost } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProveedorReserva } from "@/lib/reserva";
import "./globals.css";

const serif = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--fuente-serif",
  axes: ["SOFT", "WONK", "opsz"],
});

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--fuente-sans",
});

/** Serif editorial, solo para el titular del hero. */
const display = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--fuente-display",
  weight: "400",
});

/** Sans geométrica y ligera, solo para la navegación. */
const nav = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--fuente-nav",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3020"),
  title: {
    default: "Piccolo Andamar | Fiestas infantiles en Boca del Río",
    template: "%s | Piccolo Andamar",
  },
  description:
    "Fiestas infantiles en Plaza Andamar, Boca del Río. Paquetes todo incluido, áreas de juego y cafetería para niños de 6 meses a 10 años. Consulta disponibilidad y aparta tu fecha.",
  keywords: [
    "fiestas infantiles Boca del Río",
    "salón de fiestas Veracruz",
    "Piccolo Andamar",
    "Plaza Andamar",
    "paquetes de cumpleaños",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Piccolo Andamar",
    title: "Piccolo Andamar | Fiestas infantiles en Boca del Río",
    description:
      "Paquetes todo incluido, áreas de juego y cafetería en Plaza Andamar. Consulta disponibilidad y aparta tu fecha.",
    images: [{ url: "/piccolo/home/hero.jpg", width: 1672, height: 941, alt: "Piccolo Andamar" }],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#fcf9f4",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" data-scroll-behavior="smooth" className={`${serif.variable} ${sans.variable} ${display.variable} ${nav.variable}`}>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-tinta focus:px-5 focus:py-3 focus:text-[14px] focus:text-crema"
        >
          Saltar al contenido
        </a>
        <ProveedorReserva>
          <Navbar />
          <main id="contenido">{children}</main>
          <Footer />
        </ProveedorReserva>
      </body>
    </html>
  );
}

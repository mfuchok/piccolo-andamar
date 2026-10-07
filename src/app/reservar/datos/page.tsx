import type { Metadata } from "next";
import Datos from "./Datos";

export const metadata: Metadata = {
  title: "Tus datos",
  description: "Déjanos tus datos para preparar el resumen de tu fiesta en Piccolo Andamar.",
};

export default function Pagina() {
  return <Datos />;
}

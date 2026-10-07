import type { Metadata } from "next";
import Disponibilidad from "./Disponibilidad";

export const metadata: Metadata = {
  title: "Consulta tu fecha",
  description:
    "Revisa la disponibilidad de fechas y horarios para tu fiesta en Piccolo Andamar y elige el día que te acomoda.",
};

export default function Pagina() {
  return <Disponibilidad />;
}

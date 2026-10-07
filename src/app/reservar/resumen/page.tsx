import type { Metadata } from "next";
import Resumen from "./Resumen";

export const metadata: Metadata = {
  title: "Resumen de tu fiesta",
  description: "Revisa el resumen estimado de tu fiesta en Piccolo Andamar antes de apartar la fecha.",
};

export default function Pagina() {
  return <Resumen />;
}

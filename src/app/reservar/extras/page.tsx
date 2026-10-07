import type { Metadata } from "next";
import Extras from "./Extras";

export const metadata: Metadata = {
  title: "Personaliza tu fiesta",
  description: "Añade decoración, mesa de dulces, show u horas extra a tu paquete de fiesta.",
};

export default function Pagina() {
  return <Extras />;
}

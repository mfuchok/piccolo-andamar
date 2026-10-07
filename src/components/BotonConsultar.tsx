"use client";

import { useRouter } from "next/navigation";
import { useReserva } from "@/lib/reserva";
import { Flecha } from "./Iconos";

/** Fija el paquete en la reservación simulada y lleva al calendario. */
export default function BotonConsultar({
  slug,
  texto = "Consultar disponibilidad",
  variante = "boton",
  className = "",
}: {
  slug: string;
  texto?: string;
  variante?: "boton" | "enlace";
  className?: string;
}) {
  const router = useRouter();
  const { setPaquete } = useReserva();

  return (
    <button
      type="button"
      onClick={() => {
        setPaquete(slug);
        router.push("/disponibilidad");
      }}
      className={`${variante === "boton" ? "boton" : "enlace-flecha"} ${className}`}
    >
      {texto} <Flecha />
    </button>
  );
}

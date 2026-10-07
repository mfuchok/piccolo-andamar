import Aparece from "./Aparece";
import TarjetaCategoria from "./TarjetaCategoria";
import { Confetis, Mancha } from "./Formas";
import { conocenos } from "@/data/conocenos";

/**
 * «Conoce Piccolo»: qué hay en el lugar, en tres categorías.
 * Destino del CTA «Conócenos» del hero.
 *
 * En escritorio la composición es asimétrica: Eventos ocupa una tarjeta
 * vertical a la izquierda y las otras dos se apilan a su derecha, repartiendo
 * exactamente la misma altura.
 */
export default function SeccionConocenos() {
  const [eventos, areas, cafeteria] = conocenos;

  return (
    <section id="conocenos" className="contenedor seccion relative isolate scroll-mt-24">
      <Mancha
        className="-left-20 top-6 hidden w-[200px] opacity-70 lg:block"
        color="var(--color-lavanda)"
      />
      <Confetis className="-right-2 top-10 hidden w-[110px] lg:block" />

      {/* `ch` se resolvía contra la fuente del contenedor (sans 16 px) y dejaba
          el bloque en ~368 px, partiendo el título en varias líneas. */}
      <Aparece className="max-w-[900px]">
        <p className="eyebrow">Conoce Piccolo</p>
        <h2 className="titular mt-3 lg:whitespace-nowrap">Mucho más que una fiesta.</h2>
        <p className="mt-4 max-w-[700px] text-[16.5px] leading-relaxed text-tinta-media lg:text-[17px]">
          Un espacio donde los niños juegan, exploran y celebran, mientras los grandes disfrutan
          cada momento.
        </p>
      </Aparece>

      <Aparece className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-7" delay={60}>
        <TarjetaCategoria categoria={eventos} destacada />

        {/* En tablet las dos pequeñas van una al lado de la otra; en escritorio
            se apilan y reparten la altura de la tarjeta grande. */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 lg:gap-7">
          <TarjetaCategoria categoria={areas} />
          <TarjetaCategoria categoria={cafeteria} />
        </div>
      </Aparece>
    </section>
  );
}

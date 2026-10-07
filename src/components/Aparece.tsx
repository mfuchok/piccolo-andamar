"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/** Aparición muy discreta al entrar en pantalla. */
export default function Aparece({
  children,
  className = "",
  delay = 0,
  as: Etiqueta = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    obs.observe(nodo);
    return () => obs.disconnect();
  }, []);

  return (
    <Etiqueta
      ref={ref}
      className={`aparece ${className}`}
      data-visible={visible || undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Etiqueta>
  );
}

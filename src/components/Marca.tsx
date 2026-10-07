import Image from "next/image";
import Link from "next/link";

/** Logotipo oficial de Piccolo Andamar. */
export default function Marca({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex shrink-0 items-center ${className}`}>
      <Image
        src="/piccolo/logo/logo.png"
        alt="Piccolo Andamar"
        width={839}
        height={220}
        priority
        className="block h-[26px] w-auto sm:h-[30px]"
      />
      <span className="sr-only">Piccolo Andamar — inicio</span>
    </Link>
  );
}

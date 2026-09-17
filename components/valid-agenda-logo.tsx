import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export function ValidAgendaLogo({ className = "" }: { className?: string }) {
  return (
    <a
      className={`valid-agenda-logo ${className}`}
      href={siteConfig.validAgendaUrl}
      aria-label="Valid Agenda — fractional technology and AI advice"
    >
      <Image
        src="/images/valid-agenda-white.svg"
        alt="Valid Agenda"
        width={140}
        height={50}
      />
    </a>
  );
}

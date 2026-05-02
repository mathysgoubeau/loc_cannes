import Link from "next/link";
import { Brand } from "./Brand";
import { CTAButton } from "./CTAButton";
import { whatsappUrl } from "@/lib/whatsapp";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/90 px-5 py-4 backdrop-blur md:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
        <Brand />
        <nav className="hidden items-center gap-8 text-[0.68rem] uppercase tracking-[0.24em] text-white/[0.55] md:flex">
          <Link href="/packs" className="luxury-focus transition duration-500 hover:text-gold">
            Packs
          </Link>
          <Link href="/vehicules" className="luxury-focus transition duration-500 hover:text-gold">
            Véhicules
          </Link>
          <Link href="/checkout" className="luxury-focus transition duration-500 hover:text-gold">
            Checkout
          </Link>
        </nav>
        <CTAButton
          href={whatsappUrl()}
          variant="ghostLight"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-h-10 px-4 text-[0.62rem] md:inline-flex"
        >
          WhatsApp
        </CTAButton>
      </div>
    </header>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { CTAButton } from "@/components/CTAButton";
import { Footer } from "@/components/Footer";
import { PackCard } from "@/components/PackCard";
import { SiteHeader } from "@/components/SiteHeader";
import { clientJourney, packs, trustItems } from "@/lib/data";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Packs Séjours",
  description:
    "Packs premium clé en main sur la Côte d'Azur. Logement haut standing, véhicule luxe, activité privée et finalisation sécurisée."
};

export default function PacksPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader />

      <section className="relative min-h-[68svh] overflow-hidden bg-black px-5 py-16 text-white md:px-10 md:py-24">
        <Image
          src="/images/cannes/cannes-04.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.46] saturate-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/[0.62] to-black/20" />
        <div className="relative z-10 mx-auto flex min-h-[52svh] max-w-7xl items-end">
          <div className="max-w-4xl animate-reveal">
            <p className="text-[0.66rem] uppercase tracking-[0.34em] text-gold">Offre principale</p>
            <h1 className="mt-6 text-5xl font-extralight uppercase tracking-[0.12em] text-white md:text-7xl">
              Packs séjours.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-light uppercase tracking-[0.18em] text-white/[0.72]">
              Logement. Véhicule. Activité signature.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="#packs">Voir les packs</CTAButton>
              <CTAButton href={whatsappUrl()} target="_blank" rel="noopener noreferrer" variant="ghostLight">
                Catalogue PDF
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <section id="packs" className="relative z-10 -mt-12 px-5 pb-16 md:-mt-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-7xl space-y-6">
          {packs.map((pack, index) => (
            <div key={pack.id} className="animate-reveal" style={{ animationDelay: `${index * 110}ms` }}>
              <PackCard pack={pack} />
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-[0.66rem] uppercase tracking-[0.28em] text-gold">Parcours client</p>
              <h2 className="mt-5 text-3xl font-light uppercase tracking-[0.1em] md:text-5xl">Simple. Filtré. Sécurisé.</h2>
            </div>
            <p className="max-w-sm text-sm uppercase tracking-[0.16em] text-black/50">
              Aucun catalogue de logements seuls.
            </p>
          </div>

          <div className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-7">
            {clientJourney.map((step, index) => (
              <div key={step} className="min-h-32 bg-white p-5">
                <p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-5 text-sm uppercase tracking-[0.12em] text-black/[0.72]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-5 py-16 text-white md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-[0.66rem] uppercase tracking-[0.28em] text-gold">Trust</p>
            <h2 className="mt-5 text-3xl font-light uppercase tracking-[0.1em] md:text-5xl">Preuves visibles.</h2>
            <p className="mt-5 max-w-xl text-sm uppercase tracking-[0.16em] text-white/[0.52]">
              Paiement sécurisé. Partenaires privés. Vlogs clients.
            </p>
          </div>

          <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
            {trustItems.map((item) => (
              <div key={item} className="bg-black p-6 text-[0.68rem] uppercase tracking-[0.22em] text-white/[0.68]">
                {item}
              </div>
            ))}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-focus bg-black p-6 text-[0.68rem] uppercase tracking-[0.22em] text-white/[0.68] transition duration-500 hover:text-gold"
            >
              Feed Instagram
            </a>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-focus bg-black p-6 text-[0.68rem] uppercase tracking-[0.22em] text-white/[0.68] transition duration-500 hover:text-gold"
            >
              Vlogs TikTok
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

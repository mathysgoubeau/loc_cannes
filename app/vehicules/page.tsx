import type { Metadata } from "next";
import Image from "next/image";
import { CTAButton } from "@/components/CTAButton";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { premiumVehicles } from "@/lib/data";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Location Véhicules",
  description: "Location de véhicules premium sur la Côte d'Azur avec livraison privée et validation sécurisée."
};

export default function VehiclesPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader />

      <section className="relative min-h-[68svh] overflow-hidden bg-black px-5 py-16 text-white md:px-10 md:py-24">
        <Image
          src="/images/vehicles/vehicle-04.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.56] saturate-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/[0.58] to-black/10" />
        <div className="relative z-10 mx-auto flex min-h-[52svh] max-w-7xl items-end">
          <div className="max-w-3xl animate-reveal">
            <p className="text-[0.66rem] uppercase tracking-[0.34em] text-gold">Location simple</p>
            <h1 className="mt-6 text-5xl font-extralight uppercase tracking-[0.12em] text-white md:text-7xl">
              Véhicules premium.
            </h1>
            <p className="mt-6 max-w-xl text-base font-light uppercase tracking-[0.18em] text-white/[0.72]">
              Livraison. Reprise. Discrétion.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <CTAButton
                href={whatsappUrl("Bonjour, je souhaite louer un véhicule premium. Pouvez-vous m’envoyer les disponibilités ?")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Vérifier un véhicule
              </CTAButton>
              <CTAButton href="/packs" variant="ghostLight">
                Voir les packs
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-[0.66rem] uppercase tracking-[0.28em] text-gold">Garage privé</p>
              <h2 className="mt-5 text-3xl font-light uppercase tracking-[0.1em] md:text-5xl">Sélection validée.</h2>
            </div>
            <p className="max-w-sm text-sm uppercase tracking-[0.16em] text-black/50">
              Conditions envoyées par WhatsApp.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-4">
            {premiumVehicles.map((vehicle) => (
              <article key={vehicle.id} className="group border border-black/10 bg-white transition duration-700 hover:border-gold">
                <div className="relative min-h-72 overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-[1400ms] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/[0.54] via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-4 border border-white/25 bg-black/[0.55] px-3 py-2 text-[0.58rem] uppercase tracking-[0.2em] text-white backdrop-blur">
                    {vehicle.category}
                  </p>
                </div>
                <div className="p-5">
                  <h3 className="text-2xl font-light uppercase tracking-[0.1em]">{vehicle.name}</h3>
                  <div className="mt-5 grid grid-cols-2 gap-px border border-black/10 bg-black/10 text-sm">
                    <div className="bg-white p-4">
                      <p className="text-[0.58rem] uppercase tracking-[0.2em] text-black/40">Prix</p>
                      <p className="mt-2">{vehicle.price}</p>
                    </div>
                    <div className="bg-white p-4">
                      <p className="text-[0.58rem] uppercase tracking-[0.2em] text-black/40">Caution</p>
                      <p className="mt-2">{vehicle.caution}</p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-3 text-sm text-black/[0.62]">
                    {vehicle.specs.map((spec) => (
                      <li key={spec}>
                        <span className="mr-3 text-gold">✓</span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <CTAButton
                    href={whatsappUrl(vehicle.ctaMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="dark"
                    className="mt-6 w-full"
                  >
                    Disponibilité
                  </CTAButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-5 py-14 text-white md:px-10">
        <div className="mx-auto grid max-w-7xl gap-px border border-white/10 bg-white/10 md:grid-cols-3">
          {["Contrat digital", "Paiement sécurisé", "Logements via packs uniquement"].map((item) => (
            <div key={item} className="bg-black p-6 text-center text-[0.68rem] uppercase tracking-[0.22em] text-white/[0.68]">
              {item}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

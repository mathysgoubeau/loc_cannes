import Image from "next/image";
import { Brand } from "@/components/Brand";
import { CTAButton } from "@/components/CTAButton";

export default function HomePage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-black text-white">
      <div className="absolute left-5 top-5 z-30 md:left-10 md:top-8">
        <Brand />
      </div>

      <section className="absolute inset-0 grid md:grid-cols-2" aria-label="Choisir une expérience">
        <HeroPanel
          image="/images/cannes/cannes-05.jpg"
          eyebrow="Séjours privés"
          title="Packs clé en main"
          align="left"
        />
        <HeroPanel
          image="/images/vehicles/vehicle-04.jpeg"
          eyebrow="Location simple"
          title="Véhicules premium"
          align="right"
        />
      </section>

      <div className="absolute inset-0 z-10 bg-black/[0.34]" />
      <section className="relative z-20 flex min-h-[100svh] items-center justify-center px-5 py-24 text-center">
        <div className="w-full max-w-4xl animate-reveal">
          <p className="text-[0.66rem] uppercase tracking-[0.34em] text-gold">Conciergerie premium</p>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extralight uppercase tracking-[0.14em] text-white md:text-7xl">
            Expérience luxe.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm font-light uppercase tracking-[0.22em] text-white/[0.72]">
            Côte d’Azur. Véhicule. Logement. Activités.
          </p>

          <div className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
            <CTAButton href="/packs" className="w-full">
              Nos packs séjours
            </CTAButton>
            <CTAButton href="/vehicules" variant="ghostLight" className="w-full">
              Location véhicules
            </CTAButton>
          </div>
        </div>
      </section>

      <div className="absolute inset-x-5 bottom-6 z-20 mx-auto flex max-w-7xl flex-col gap-3 text-center text-[0.62rem] uppercase tracking-[0.22em] text-white/[0.52] md:flex-row md:items-center md:justify-between md:text-left">
        <span>Catalogue PDF par WhatsApp</span>
        <span>Logements disponibles uniquement dans les packs</span>
      </div>
    </main>
  );
}

function HeroPanel({
  image,
  eyebrow,
  title,
  align
}: {
  image: string;
  eyebrow: string;
  title: string;
  align: "left" | "right";
}) {
  return (
    <div className="group relative min-h-[50svh] overflow-hidden border-white/10 md:min-h-[100svh] md:border-r">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover opacity-[0.54] saturate-0 transition duration-[1800ms] ease-out group-hover:scale-[1.035] group-hover:opacity-[0.72] group-hover:saturate-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/[0.42] to-black/20" />
      <div
        className={`absolute bottom-24 hidden max-w-xs md:block ${
          align === "left" ? "left-10 text-left" : "right-10 text-right"
        }`}
      >
        <p className="text-[0.62rem] uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
        <p className="mt-4 text-2xl font-extralight uppercase tracking-[0.14em] text-white/80">{title}</p>
      </div>
    </div>
  );
}

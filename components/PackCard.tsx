import Image from "next/image";
import { formatEuro, type Pack } from "@/lib/data";
import { whatsappUrl } from "@/lib/whatsapp";
import { CTAButton } from "./CTAButton";

type PackCardProps = {
  pack: Pack;
};

export function PackCard({ pack }: PackCardProps) {
  return (
    <article
      className={`group relative grid overflow-hidden border transition duration-[900ms] ease-out lg:grid-cols-[0.9fr_1.25fr] ${
        pack.featured
          ? "border-gold bg-black text-white shadow-[0_28px_80px_rgba(0,0,0,0.22)] lg:scale-[1.025]"
          : "border-black/10 bg-white text-black hover:border-gold"
      }`}
    >
      <div className="relative min-h-[280px] overflow-hidden lg:min-h-[440px]">
        <Image
          src={pack.image}
          alt={pack.name}
          fill
          sizes="(min-width: 1024px) 38vw, 100vw"
          className={`object-cover transition duration-[1600ms] ease-out group-hover:scale-[1.04] ${
            pack.featured ? "opacity-[0.68]" : "opacity-[0.9]"
          }`}
        />
        <div
          className={`absolute inset-0 ${
            pack.featured
              ? "bg-gradient-to-t from-black via-black/[0.46] to-black/10"
              : "bg-gradient-to-t from-black/[0.28] via-transparent to-transparent"
          }`}
        />
        {pack.badge ? (
          <div className="absolute left-5 top-5 border border-gold bg-black/80 px-3 py-2 text-[0.58rem] font-medium uppercase tracking-[0.24em] text-gold backdrop-blur">
            {pack.badge}
          </div>
        ) : null}
        <div className="absolute bottom-5 left-5 border border-white/25 bg-black/60 px-3 py-2 text-[0.58rem] uppercase tracking-[0.2em] text-white backdrop-blur">
          {pack.capacity}
        </div>
      </div>

      <div className="flex flex-col justify-between p-5 md:p-8 lg:p-10">
        <div>
          <div
            className={`flex flex-col gap-5 border-b pb-6 md:flex-row md:items-start md:justify-between ${
              pack.featured ? "border-white/10" : "border-black/10"
            }`}
          >
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-gold">Expérience</p>
              <h2 className="mt-4 text-3xl font-extralight uppercase tracking-[0.12em] md:text-5xl">
                {pack.shortName}
              </h2>
            </div>
            <div className={`grid min-w-52 grid-cols-2 border text-right md:text-left ${pack.featured ? "border-white/10" : "border-black/10"}`}>
              <Metric featured={pack.featured} label="Prix" value={formatEuro(pack.price)} />
              <Metric featured={pack.featured} label="Caution" value={formatEuro(pack.caution)} />
            </div>
          </div>

          <p
            className={`mt-6 max-w-2xl text-sm leading-6 ${
              pack.featured ? "text-white/[0.68]" : "text-black/60"
            }`}
          >
            {pack.description}
          </p>

          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {pack.includes.map((item) => (
              <div
                key={item}
                className={`border px-4 py-4 text-sm ${
                  pack.featured ? "border-white/10 bg-white/[0.03] text-white/75" : "border-black/10 bg-black/[0.02] text-black/70"
                }`}
              >
                <span className="mb-3 block h-px w-7 bg-gold" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-7">
            <p
              className={`text-[0.62rem] uppercase tracking-[0.22em] ${
                pack.featured ? "text-white/[0.42]" : "text-black/[0.45]"
              }`}
            >
              Options additionnelles
            </p>
            <ul className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              {pack.options.map((option) => (
                <li key={option} className={pack.featured ? "text-white/75" : "text-black/[0.65]"}>
                  <span className="mr-3 text-gold">✓</span>
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
          <CTAButton
            href={whatsappUrl(pack.ctaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
            variant={pack.featured ? "gold" : "dark"}
          >
            Vérifier la disponibilité
          </CTAButton>
          <CTAButton
            href={`/checkout?pack=${pack.id}`}
            variant={pack.featured ? "ghostLight" : "ghost"}
            className="w-full sm:w-auto"
          >
            Finaliser
          </CTAButton>
        </div>
      </div>
    </article>
  );
}

function Metric({ label, value, featured }: { label: string; value: string; featured?: boolean }) {
  return (
    <div className={`p-4 ${featured ? "bg-white/[0.03]" : "bg-black/[0.02]"}`}>
      <p className={`text-[0.58rem] uppercase tracking-[0.22em] ${featured ? "text-white/40" : "text-black/[0.45]"}`}>
        {label}
      </p>
      <p className="mt-2 text-sm font-light uppercase tracking-[0.08em]">{value}</p>
    </div>
  );
}

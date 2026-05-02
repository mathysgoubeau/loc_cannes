export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-12 text-white md:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center border border-gold text-[0.78rem] font-medium uppercase tracking-[0.22em] text-gold">
            SAS
            <br />
            CTD
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-white">Conciergerie Premium</p>
            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/[0.45]">Côte d’Azur</p>
          </div>
        </div>

        <div className="grid gap-4 text-[0.68rem] uppercase tracking-[0.2em] text-white/[0.58] sm:grid-cols-2 lg:grid-cols-4 md:text-right">
          <span>Partenaires véhicules</span>
          <span>Partenaires immobiliers</span>
          <span>Stripe / Revolut</span>
          <span>Instagram / TikTok</span>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

type BrandProps = {
  compact?: boolean;
};

export function Brand({ compact = false }: BrandProps) {
  return (
    <Link href="/" className="luxury-focus inline-flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center border border-gold text-[0.72rem] font-medium uppercase tracking-[0.22em] text-gold">
        CTD
      </span>
      {!compact ? (
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-white/80">
          Conciergerie Premium
        </span>
      ) : null}
    </Link>
  );
}

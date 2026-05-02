import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type CTAButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "gold" | "dark" | "ghost" | "ghostLight";
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const variants = {
  gold: "border-gold bg-gold text-black hover:bg-transparent hover:text-gold",
  dark: "border-white/20 bg-black text-white hover:border-gold hover:text-gold",
  ghost: "border-black/20 bg-transparent text-black hover:border-gold hover:text-gold",
  ghostLight: "border-white/20 bg-transparent text-white hover:border-gold hover:text-gold"
};

export function CTAButton({ children, href, variant = "gold", className = "", ...props }: CTAButtonProps) {
  const classes = `luxury-focus inline-flex min-h-12 items-center justify-center border px-6 text-center text-[0.72rem] font-medium uppercase leading-5 tracking-[0.2em] transition duration-700 ease-out ${variants[variant]} ${className}`;

  if (href.startsWith("http")) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

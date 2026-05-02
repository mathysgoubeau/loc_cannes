import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutForm } from "@/components/CheckoutForm";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Finalisation Sécurisée",
  description: "Finalisation CTD avec upload documents, clause 72h, choix caution et acompte 3D Secure."
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <SiteHeader />
      <Suspense
        fallback={
          <section className="px-5 py-16 md:px-10">
            <div className="mx-auto max-w-7xl border border-white/10 p-6 text-sm text-white/[0.55]">Chargement.</div>
          </section>
        }
      >
        <CheckoutForm />
      </Suspense>
      <Footer />
    </main>
  );
}

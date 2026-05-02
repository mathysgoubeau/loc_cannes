"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { CautionTimeline } from "./CautionTimeline";
import { CTAButton } from "./CTAButton";
import { DocumentUpload } from "./DocumentUpload";
import { formatEuro, getPack, packs, type PackId } from "@/lib/data";

type DocumentKey = "identity" | "licenseFront" | "licenseBack" | "proofAddress";
type GuaranteeMethod = "bank" | "cash";
type PaymentState = "idle" | "processing" | "secure" | "confirmed" | "error";

const requiredDocuments: Array<{ id: DocumentKey; label: string }> = [
  { id: "identity", label: "Pièce d’identité" },
  { id: "licenseFront", label: "Permis recto" },
  { id: "licenseBack", label: "Permis verso" },
  { id: "proofAddress", label: "Justificatif de domicile" }
];

const steps = ["Informations", "Documents", "Caution", "Acompte"];

const guaranteeLabels: Record<GuaranteeMethod, string> = {
  bank: "Empreinte bancaire",
  cash: "Espèces"
};

export function CheckoutForm() {
  const searchParams = useSearchParams();
  const initialPack = getPack(searchParams.get("pack"));
  const [packId, setPackId] = useState<PackId>(initialPack.id);
  const [paymentState, setPaymentState] = useState<PaymentState>("idle");
  const [error, setError] = useState("");
  const [files, setFiles] = useState<Record<DocumentKey, File | null>>({
    identity: null,
    licenseFront: null,
    licenseBack: null,
    proofAddress: null
  });
  const [acceptedDocuments, setAcceptedDocuments] = useState(false);
  const [acceptedClause, setAcceptedClause] = useState(false);
  const [acceptedCashClause, setAcceptedCashClause] = useState(false);
  const [guaranteeMethod, setGuaranteeMethod] = useState<GuaranteeMethod>("bank");
  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    arrivalDate: ""
  });

  const selectedPack = useMemo(() => getPack(packId), [packId]);
  const deposit = Math.round(selectedPack.price * selectedPack.depositRate);
  const allDocsReady = requiredDocuments.every((document) => files[document.id]);
  const infoReady = Object.values(customer).every((value) => value.trim().length > 2);
  const cautionReady = guaranteeMethod === "bank" || acceptedCashClause;
  const canPay =
    allDocsReady &&
    infoReady &&
    acceptedDocuments &&
    acceptedClause &&
    cautionReady &&
    paymentState !== "processing";

  useEffect(() => {
    if (searchParams.get("status") === "success") {
      setPaymentState("confirmed");
    }
  }, [searchParams]);

  function updateFile(key: DocumentKey, file: File | null) {
    setFiles((current) => ({ ...current, [key]: file }));
  }

  async function submitPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canPay) return;

    setError("");
    setPaymentState("processing");

    const formData = new FormData();
    formData.append("packId", selectedPack.id);
    formData.append("fullName", customer.fullName);
    formData.append("email", customer.email);
    formData.append("phone", customer.phone);
    formData.append("arrivalDate", customer.arrivalDate);
    formData.append("acceptedDocuments", String(acceptedDocuments));
    formData.append("acceptedClause", String(acceptedClause));
    formData.append("acceptedCashClause", String(acceptedCashClause));
    formData.append("guaranteeMethod", guaranteeMethod);

    requiredDocuments.forEach((document) => {
      const file = files[document.id];
      if (file) formData.append(document.id, file);
    });

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        body: formData
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        mode?: "mock" | "stripe";
        url?: string;
        message?: string;
      };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message ?? "Paiement refusé.");
      }

      if (payload.mode === "stripe" && payload.url) {
        window.location.href = payload.url;
        return;
      }

      setPaymentState("secure");
      window.setTimeout(() => setPaymentState("confirmed"), 1600);
    } catch (checkoutError) {
      setPaymentState("error");
      setError(checkoutError instanceof Error ? checkoutError.message : "Paiement indisponible.");
    }
  }

  if (paymentState === "confirmed") {
    return (
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl border border-gold p-7 text-center md:p-12">
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-gold">Confirmation</p>
          <h1 className="mt-5 text-4xl font-light uppercase tracking-[0.1em] text-white">Dossier ouvert.</h1>
          <div className="mt-8 grid gap-px border border-white/10 bg-white/10 text-sm text-white/[0.65] sm:grid-cols-3">
            {["Acompte validé", "Email envoyé", "Équipe notifiée"].map((item) => (
              <div key={item} className="bg-black p-4">
                {item}
              </div>
            ))}
          </div>
          <CTAButton href="/packs" variant="ghostLight" className="mt-8">
            Retour aux packs
          </CTAButton>
        </div>
      </section>
    );
  }

  return (
    <section className="px-5 py-12 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-gold">Checkout sécurisé</p>
          <h1 className="mt-5 text-4xl font-light uppercase tracking-[0.1em] text-white md:text-6xl">
            Finalisation.
          </h1>
          <p className="mt-5 text-base text-white/[0.55]">Documents. Clause. Acompte 3D Secure.</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step} className="relative pb-4">
              <div className="mb-4 h-px bg-white/[0.12]">
                <div className="h-px w-10 bg-gold" />
              </div>
              <div className="text-[0.68rem] uppercase tracking-[0.22em] text-white/60">
                <span className="mr-3 text-gold">{index + 1}.</span>
                {step}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.72fr]">
          <form onSubmit={submitPayment} className="space-y-8">
            <section className="border border-white/10 bg-white/[0.02] p-5 md:p-7">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-gold">Pack</p>
                  <p className="mt-3 text-2xl font-light uppercase tracking-[0.1em] text-white">{selectedPack.name}</p>
                </div>
                <select
                  value={packId}
                  onChange={(event) => setPackId(event.target.value as PackId)}
                  className="luxury-focus h-12 border border-white/[0.15] bg-black px-4 text-sm text-white"
                >
                  {packs.map((pack) => (
                    <option key={pack.id} value={pack.id}>
                      {pack.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                <Input
                  label="Nom complet"
                  value={customer.fullName}
                  onChange={(value) => setCustomer((current) => ({ ...current, fullName: value }))}
                />
                <Input
                  label="Email"
                  type="email"
                  value={customer.email}
                  onChange={(value) => setCustomer((current) => ({ ...current, email: value }))}
                />
                <Input
                  label="Téléphone"
                  type="tel"
                  value={customer.phone}
                  onChange={(value) => setCustomer((current) => ({ ...current, phone: value }))}
                />
                <Input
                  label="Arrivée"
                  type="date"
                  value={customer.arrivalDate}
                  onChange={(value) => setCustomer((current) => ({ ...current, arrivalDate: value }))}
                />
              </div>
            </section>

            <section className="border border-white/10 bg-white/[0.02] p-5 md:p-7">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-gold">Documents obligatoires</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {requiredDocuments.map((document) => (
                  <DocumentUpload
                    key={document.id}
                    id={document.id}
                    label={document.label}
                    file={files[document.id]}
                    onChange={(file) => updateFile(document.id, file)}
                  />
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <Checkbox
                  checked={acceptedDocuments}
                  onChange={setAcceptedDocuments}
                  label="Je certifie que ces documents sont valides et m’appartiennent"
                />
                <Checkbox
                  checked={acceptedClause}
                  onChange={setAcceptedClause}
                  label="Je reconnais que la caution doit être validée 72h avant l’arrivée. En cas d’échec, le séjour est annulé et l’acompte non remboursé."
                />
              </div>
            </section>

            <section className="border border-white/10 bg-white/[0.02] p-5 md:p-7">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-gold">Caution</p>
                  <p className="mt-3 text-sm text-white/[0.55]">{formatEuro(selectedPack.caution)} à valider.</p>
                </div>
                <p className="text-left text-[0.62rem] uppercase tracking-[0.2em] text-white/40 md:text-right">
                  J-3 deadline
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <GuaranteeButton
                  active={guaranteeMethod === "bank"}
                  title="Empreinte bancaire"
                  detail="Relance J-4. Deadline J-3."
                  onClick={() => setGuaranteeMethod("bank")}
                />
                <GuaranteeButton
                  active={guaranteeMethod === "cash"}
                  title="Espèces"
                  detail="Contrôle le jour J."
                  onClick={() => setGuaranteeMethod("cash")}
                />
              </div>

              {guaranteeMethod === "cash" ? (
                <div className="mt-6 border border-gold/60 p-4">
                  <Checkbox
                    checked={acceptedCashClause}
                    onChange={setAcceptedCashClause}
                    label="Je choisis la caution en espèces et j’accepte qu’en cas d’absence, montant incomplet ou faux billets le jour J, le séjour soit annulé et l’acompte perdu."
                  />
                </div>
              ) : (
                <div className="mt-6 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
                  {["J-4 relance", "J-3 deadline", "6h régularisation", "Annulation auto"].map((item) => (
                    <div key={item} className="bg-black p-4 text-[0.62rem] uppercase tracking-[0.18em] text-white/[0.6]">
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="border border-white/10 bg-white/[0.02] p-5 md:p-7">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-gold">Paiement acompte</p>
                  <p className="mt-3 text-sm text-white/[0.55]">Stripe / Revolut Business. 3D Secure obligatoire.</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-[0.62rem] uppercase tracking-[0.22em] text-white/40">À payer</p>
                  <p className="mt-2 text-3xl font-light text-white">{formatEuro(deposit)}</p>
                </div>
              </div>

              {paymentState === "secure" ? (
                <div className="mt-6 border border-gold p-4 text-sm text-gold">3D Secure en cours.</div>
              ) : null}

              {error ? <div className="mt-6 border border-gold p-4 text-sm text-gold">{error}</div> : null}

              <button
                type="submit"
                disabled={!canPay}
                className="luxury-focus mt-7 flex min-h-14 w-full items-center justify-center border border-gold bg-gold px-6 text-center text-[0.72rem] font-medium uppercase leading-5 tracking-[0.2em] text-black transition duration-700 hover:bg-transparent hover:text-gold disabled:border-white/10 disabled:bg-transparent disabled:text-white/25"
              >
                {paymentState === "processing" ? "Validation" : "Payer l’acompte"}
              </button>
            </section>
          </form>

          <aside className="space-y-5">
            <div className="relative min-h-[340px] overflow-hidden border border-white/10">
              <Image
                src={selectedPack.image}
                alt={selectedPack.name}
                fill
                sizes="(min-width: 1024px) 32vw, 100vw"
                className="object-cover opacity-[0.62]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/[0.72] to-black/10" />
              <div className="relative z-10 flex min-h-[340px] flex-col justify-end p-5">
                <p className="text-[0.62rem] uppercase tracking-[0.28em] text-gold">Dossier privé</p>
                <h2 className="mt-4 text-3xl font-extralight uppercase tracking-[0.12em] text-white">
                  {selectedPack.name}
                </h2>
                <p className="mt-3 text-sm text-white/60">Documents. Caution. Acompte.</p>
              </div>
            </div>

            <div className="border border-white/10 bg-white/[0.02] p-5">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/40">Résumé</p>
              <div className="mt-5 space-y-4 text-sm">
                <Line label="Pack" value={selectedPack.name} />
                <Line label="Séjour" value={formatEuro(selectedPack.price)} />
                <Line label="Acompte" value={formatEuro(deposit)} />
                <Line label="Caution" value={formatEuro(selectedPack.caution)} />
                <Line label="Mode caution" value={guaranteeLabels[guaranteeMethod]} />
              </div>
            </div>
            <CautionTimeline packId={selectedPack.id} />
          </aside>
        </div>
      </div>
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[0.68rem] uppercase tracking-[0.2em] text-white/[0.55]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="luxury-focus mt-3 h-12 w-full border border-white/[0.15] bg-black px-4 text-sm text-white transition duration-500 focus:border-gold"
        required
      />
    </label>
  );
}

function Checkbox({
  checked,
  onChange,
  label
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-start gap-3 text-sm leading-6 text-white/70">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1.5 h-4 w-4 accent-[#C5A059]"
        required
      />
      <span>{label}</span>
    </label>
  );
}

function GuaranteeButton({
  active,
  title,
  detail,
  onClick
}: {
  active: boolean;
  title: string;
  detail: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`luxury-focus min-h-28 border p-5 text-left transition duration-700 ${
        active ? "border-gold bg-gold text-black" : "border-white/10 bg-black text-white hover:border-gold"
      }`}
    >
      <span className="block text-sm uppercase tracking-[0.14em]">{title}</span>
      <span className={`mt-3 block text-xs uppercase tracking-[0.16em] ${active ? "text-black/60" : "text-white/[0.45]"}`}>
        {detail}
      </span>
    </button>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
      <span className="text-white/[0.45]">{label}</span>
      <span className="text-right text-white">{value}</span>
    </div>
  );
}

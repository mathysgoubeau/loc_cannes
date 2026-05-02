import { getPack } from "./data";

export type CautionEvent = {
  id: "reminder" | "deadline" | "grace" | "cancelled";
  label: string;
  detail: string;
  delayMs: number;
};

export function createCautionSimulation(packId: string) {
  const pack = getPack(packId);

  return {
    packId: pack.id,
    amount: pack.caution,
    policy: {
      reminder: "J-4",
      deadline: "J-3",
      graceDelay: "6h",
      failedOutcome: "Annulation automatique. Acompte conservé."
    },
    events: [
      {
        id: "reminder",
        label: "Relance J-4",
        detail: "WhatsApp et SMS envoyés.",
        delayMs: 900
      },
      {
        id: "deadline",
        label: "Deadline J-3",
        detail: "Empreinte bancaire requise.",
        delayMs: 2100
      },
      {
        id: "grace",
        label: "Échec. Délai 6h.",
        detail: "Régularisation ouverte.",
        delayMs: 3300
      },
      {
        id: "cancelled",
        label: "Annulation auto",
        detail: "Acompte conservé.",
        delayMs: 4700
      }
    ] satisfies CautionEvent[]
  };
}

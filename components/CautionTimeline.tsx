"use client";

import { useEffect, useState } from "react";
import { formatEuro } from "@/lib/data";
import type { createCautionSimulation } from "@/lib/caution";

type CautionSimulation = ReturnType<typeof createCautionSimulation>;

type CautionTimelineProps = {
  packId: string;
};

export function CautionTimeline({ packId }: CautionTimelineProps) {
  const [simulation, setSimulation] = useState<CautionSimulation | null>(null);
  const [activeEvents, setActiveEvents] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    setSimulation(null);
    setActiveEvents([]);

    fetch(`/api/caution-simulation?packId=${packId}`)
      .then((response) => response.json() as Promise<CautionSimulation>)
      .then((data) => {
        if (cancelled) return;
        setSimulation(data);

        data.events.forEach((event) => {
          const timer = setTimeout(() => {
            setActiveEvents((current) => (current.includes(event.id) ? current : [...current, event.id]));
          }, event.delayMs);
          timers.push(timer);
        });
      });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [packId]);

  if (!simulation) {
    return (
      <div className="border border-white/10 p-5">
        <p className="text-[0.68rem] uppercase tracking-[0.22em] text-white/40">Timeline caution</p>
        <p className="mt-3 text-sm text-white/[0.65]">Synchronisation.</p>
      </div>
    );
  }

  return (
    <div className="border border-white/10 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-white/40">Timeline caution</p>
          <p className="mt-3 text-2xl font-light text-white">{formatEuro(simulation.amount)}</p>
        </div>
        <span className="border border-gold px-3 py-2 text-[0.58rem] uppercase tracking-[0.2em] text-gold">72h</span>
      </div>

      <div className="mt-6 space-y-3">
        {simulation.events.map((event) => {
          const active = activeEvents.includes(event.id);
          return (
            <div
              key={event.id}
              className={`flex items-center justify-between gap-4 border px-4 py-3 transition duration-700 ${
                active ? "border-gold text-white" : "border-white/10 text-white/40"
              }`}
            >
              <div>
                <p className="text-sm uppercase tracking-[0.12em]">{event.label}</p>
                <p className="mt-1 text-xs normal-case tracking-normal text-white/[0.45]">{event.detail}</p>
              </div>
              <span className={`h-2 w-2 ${active ? "bg-gold" : "bg-white/20"}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

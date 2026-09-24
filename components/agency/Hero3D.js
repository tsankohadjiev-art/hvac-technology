"use client";

import { Suspense } from "react";
import Hero3DScene from "@/components/agency/Hero3DScene";

export default function Hero3D() {
  return (
    <div className="relative aspect-square w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950/40 to-slate-950">
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center text-xs text-slate-500">
            Зареждане на 3D сцена…
          </div>
        }
      >
        <Hero3DScene />
      </Suspense>
    </div>
  );
}

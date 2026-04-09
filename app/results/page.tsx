"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ResultsContent() {
  const searchParams = useSearchParams();

  const score = searchParams.get("score");
  const risk = searchParams.get("risk");
  const recommendations = searchParams.get("recommendations");
  const products = searchParams.get("products");

  const recommendationList = recommendations ? recommendations.split("||") : [];
  const productList = products ? products.split("||") : [];

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-2xl rounded-2xl border bg-white p-8 shadow-sm">
        <p className="mb-2 text-sm uppercase tracking-wide text-slate-500">
          Your Result / Votre résultat
        </p>

        <h1 className="mb-4 text-4xl font-bold">
          Water Score / Score d’eau: {score}
        </h1>

        <p className="mb-8 text-lg">
          Risk Level / Niveau de risque: <strong>{risk}</strong>
        </p>

        <h2 className="mb-3 text-2xl font-semibold">
          Recommendations / Recommandations
        </h2>
        <ul className="mb-8 list-disc space-y-2 pl-5">
          {recommendationList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h2 className="mb-3 text-2xl font-semibold">
          Suggested Solutions / Solutions suggérées
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          {productList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading results...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
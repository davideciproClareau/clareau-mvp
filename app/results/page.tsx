"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type StoredResult = {
  total: number;
  riskLevel: string;
  recommendations: string[];
  products: string[];
};

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<StoredResult | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("clareauResult");

    if (!saved) {
      router.push("/quiz");
      return;
    }

    try {
      const parsed = JSON.parse(saved) as StoredResult;
      setResult(parsed);
    } catch {
      router.push("/quiz");
    }
  }, [router]);

  if (!result) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-2xl rounded-2xl border bg-white p-8 shadow-sm">
          <p className="text-lg">Loading results...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-2xl rounded-2xl border bg-white p-8 shadow-sm">
        <p className="mb-2 text-sm uppercase tracking-wide text-slate-500">
          Your Result / Votre résultat
        </p>

        <h1 className="mb-4 text-4xl font-bold">
          Water Score / Score d’eau: {result.total}
        </h1>

        <p className="mb-8 text-lg">
          Risk Level / Niveau de risque: <strong>{result.riskLevel}</strong>
        </p>

        <h2 className="mb-3 text-2xl font-semibold">
          Recommendations / Recommandations
        </h2>
        <ul className="mb-8 list-disc space-y-2 pl-5">
          {result.recommendations.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h2 className="mb-3 text-2xl font-semibold">
          Suggested Solutions / Solutions suggérées
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          {result.products.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
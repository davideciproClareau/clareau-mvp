import { supabase } from "../../../lib/supabase";
import { notFound } from "next/navigation";

type Submission = {
  id: number;
  full_name: string | null;
  email: string;
  postal_code: string | null;
  score_total: number | null;
  risk_level: string | null;
  recommendations: string[] | null;
  products: string[] | null;
};

export default async function ResultByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("submissions")
    .select(
      "id, full_name, email, postal_code, score_total, risk_level, recommendations, products"
    )
    .eq("id", Number(id))
    .single();

  if (error || !data) {
    notFound();
  }

  const submission = data as Submission;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-2xl rounded-2xl border bg-white p-8 shadow-sm">
        <p className="mb-2 text-sm uppercase tracking-wide text-slate-500">
          Clareau Result / Résultat Clareau
        </p>

        <h1 className="mb-4 text-4xl font-bold">
          Water Score / Score d’eau: {submission.score_total ?? "-"}
        </h1>

        <p className="mb-6 text-lg">
          Risk Level / Niveau de risque:{" "}
          <strong>{submission.risk_level ?? "-"}</strong>
        </p>

        <div className="mb-8 rounded-xl bg-slate-50 p-4">
          <p>
            <strong>Name / Nom:</strong> {submission.full_name || "-"}
          </p>
          <p>
            <strong>Email / Courriel:</strong> {submission.email}
          </p>
          <p>
            <strong>Postal Code / Code postal:</strong>{" "}
            {submission.postal_code || "-"}
          </p>
        </div>

        <h2 className="mb-3 text-2xl font-semibold">
          Recommendations / Recommandations
        </h2>
        <ul className="mb-8 list-disc space-y-2 pl-5">
          {(submission.recommendations ?? []).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h2 className="mb-3 text-2xl font-semibold">
          Suggested Solutions / Solutions suggérées
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          {(submission.products ?? []).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
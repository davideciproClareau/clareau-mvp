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

        <div className="mt-10 rounded-xl border p-6 bg-slate-50">
          <h2 className="mb-3 text-2xl font-bold">
            Unlock Full Report / Débloquer le rapport complet
          </h2>

          <p className="mb-4">
            Get your full personalized water analysis and treatment plan.
          </p>

          <a
            href="https://docs.stripe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-xl bg-black px-6 py-3 text-white"
          >
            Unlock for $19
          </a>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">
            Full Analysis / Analyse complète (Premium)
          </h2>

          <div className="space-y-4 opacity-60">
            <p>
              <strong>Water Quality Breakdown:</strong>
              <br />
              Your water profile indicates potential issues related to mineral
              content, infrastructure condition, and long-term exposure risks.
            </p>

            <p>
              <strong>Analyse de la qualité de l’eau :</strong>
              <br />
              Votre profil d’eau indique des problèmes potentiels liés à la
              composition minérale, à l’état de la plomberie et aux risques à
              long terme.
            </p>

            <p>
              <strong>Health & Lifestyle Impact:</strong>
              <br />
              Hard water and contaminants may contribute to dry skin, hair
              damage, and reduced soap efficiency.
            </p>

            <p>
              <strong>Impact sur la santé et le quotidien :</strong>
              <br />
              Une eau dure ou contaminée peut causer une sécheresse de la peau,
              des dommages aux cheveux et réduire l’efficacité des produits
              nettoyants.
            </p>

            <p>
              <strong>Appliance Risk Analysis:</strong>
              <br />
              Mineral buildup can reduce the lifespan of appliances such as
              dishwashers, water heaters, and washing machines.
            </p>

            <p>
              <strong>Analyse des appareils :</strong>
              <br />
              L’accumulation de minéraux peut réduire la durée de vie de vos
              appareils électroménagers.
            </p>

            <p>
              <strong>Recommended Treatment Plan:</strong>
              <br />
              A tailored combination of filtration and softening solutions is
              recommended to improve water quality and reduce long-term risks.
            </p>

            <p>
              <strong>Plan de traitement recommandé :</strong>
              <br />
              Une combinaison personnalisée de filtration et d’adoucissement est
              recommandée pour améliorer la qualité de l’eau.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

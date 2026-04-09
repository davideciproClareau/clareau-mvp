"use client";
import { supabase } from "../../lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { scoreSubmission } from "@/lib/scoring";

export default function QuizPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    postalCode: "",
    waterSource: "municipal",
    plumbingAge: "unknown",
    hardness: "unknown",
    tasteOdor: "none",
    staining: "none",
    skinHairIssue: "no",
    applianceConcern: "no",
  });

  function updateField(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  const result = scoreSubmission(form);

  const { error } = await supabase.from("submissions").insert([
    {
      full_name: form.fullName,
      email: form.email,
      postal_code: form.postalCode,
      water_source: form.waterSource,
      plumbing_age: form.plumbingAge,
      hardness: form.hardness,
      taste_odor: form.tasteOdor,
      staining: form.staining,
      skin_hair_issue: form.skinHairIssue,
      appliance_concern: form.applianceConcern,
      score_total: result.total,
      risk_level: result.riskLevel,
      recommendations: result.recommendations,
      products: result.products,
    },
  ]);

  if (error) {
  console.error("Supabase insert error:", error);
  alert(
    `Supabase error: ${error.message}\nCode: ${error.code ?? "none"}\nDetails: ${error.details ?? "none"}`
  );
  return;
}

  sessionStorage.setItem("clareauResult", JSON.stringify(result));
  router.push("/results");
}

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-2xl rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold">
          Get My Water Score / Obtenir mon score d’eau
        </h1>
        <p className="mb-8 text-slate-600">
          Answer a few questions about your home’s water.
          <br />
          Répondez à quelques questions sur l’eau de votre domicile.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium">
              Full Name / Nom complet
            </label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              className="w-full rounded-lg border p-3"
              placeholder="John Doe / Jean Dupont"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Email / Courriel
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full rounded-lg border p-3"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Postal Code / Code postal
            </label>
            <input
              type="text"
              value={form.postalCode}
              onChange={(e) => updateField("postalCode", e.target.value)}
              className="w-full rounded-lg border p-3"
              placeholder="H2X 1Y4"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Water Source / Source d’eau
            </label>
            <select
              value={form.waterSource}
              onChange={(e) => updateField("waterSource", e.target.value)}
              className="w-full rounded-lg border p-3"
            >
              <option value="municipal">Municipal water / Eau municipale</option>
              <option value="well">Well water / Eau de puits</option>
              <option value="unknown">I don’t know / Je ne sais pas</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Plumbing Age / Âge de la plomberie
            </label>
            <select
              value={form.plumbingAge}
              onChange={(e) => updateField("plumbingAge", e.target.value)}
              className="w-full rounded-lg border p-3"
            >
              <option value="new">0–10 years / 0 à 10 ans</option>
              <option value="10-20">10–20 years / 10 à 20 ans</option>
              <option value="20-40">20–40 years / 20 à 40 ans</option>
              <option value="40+">40+ years / 40+ ans</option>
              <option value="unknown">Unknown / Inconnu</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Water Hardness / Dureté de l’eau
            </label>
            <select
              value={form.hardness}
              onChange={(e) => updateField("hardness", e.target.value)}
              className="w-full rounded-lg border p-3"
            >
              <option value="soft">Soft / Douce</option>
              <option value="moderate">Moderate / Modérée</option>
              <option value="hard">Hard / Dure</option>
              <option value="very-hard">Very hard / Très dure</option>
              <option value="unknown">Unknown / Inconnue</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Taste or Odor Concern / Goût ou odeur
            </label>
            <select
              value={form.tasteOdor}
              onChange={(e) => updateField("tasteOdor", e.target.value)}
              className="w-full rounded-lg border p-3"
            >
              <option value="none">None / Aucun</option>
              <option value="minor">Minor / Léger</option>
              <option value="noticeable">Noticeable / Visible</option>
              <option value="strong">Strong / Important</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Staining / Taches
            </label>
            <select
              value={form.staining}
              onChange={(e) => updateField("staining", e.target.value)}
              className="w-full rounded-lg border p-3"
            >
              <option value="none">None / Aucune</option>
              <option value="some">Some / Quelques-unes</option>
              <option value="frequent">Frequent / Fréquentes</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Skin or Hair Issues / Problèmes de peau ou cheveux
            </label>
            <select
              value={form.skinHairIssue}
              onChange={(e) => updateField("skinHairIssue", e.target.value)}
              className="w-full rounded-lg border p-3"
            >
              <option value="no">No / Non</option>
              <option value="sometimes">Sometimes / Parfois</option>
              <option value="yes">Yes / Oui</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Appliance Concern / Préoccupation pour les appareils
            </label>
            <select
              value={form.applianceConcern}
              onChange={(e) => updateField("applianceConcern", e.target.value)}
              className="w-full rounded-lg border p-3"
            >
              <option value="no">No / Non</option>
              <option value="somewhat">Somewhat / Un peu</option>
              <option value="yes">Yes / Oui</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-black px-4 py-3 text-white"
          >
            See My Results / Voir mes résultats
          </button>
        </form>
      </div>
    </main>
  );
}
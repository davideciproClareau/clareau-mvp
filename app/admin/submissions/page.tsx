import { supabase } from "../../../lib/supabase";

type Submission = {
  id: number;
  created_at: string;
  full_name: string | null;
  email: string;
  postal_code: string | null;
  water_source: string | null;
  score_total: number | null;
  risk_level: string | null;
};

export default async function AdminSubmissionsPage() {
  const { data, error } = await supabase
    .from("submissions")
    .select(
      "id, created_at, full_name, email, postal_code, water_source, score_total, risk_level"
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-5xl rounded-2xl border bg-white p-8 shadow-sm">
          <h1 className="mb-4 text-3xl font-bold">Admin Submissions</h1>
          <p className="text-red-600">Error loading submissions: {error.message}</p>
        </div>
      </main>
    );
  }

  const submissions = (data ?? []) as Submission[];

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-6xl rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500">
              Clareau Admin
            </p>
            <h1 className="text-3xl font-bold">Submissions</h1>
          </div>
          <div className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-700">
            Total: {submissions.length}
          </div>
        </div>

        {submissions.length === 0 ? (
          <p className="text-slate-600">No submissions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Postal Code</th>
                  <th className="px-4 py-3 font-semibold">Water Source</th>
                  <th className="px-4 py-3 font-semibold">Score</th>
                  <th className="px-4 py-3 font-semibold">Risk</th>
                  <th className="px-4 py-3 font-semibold">View</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id} className="border-b">
                    <td className="px-4 py-3">
                      {new Date(submission.created_at).toLocaleString("en-CA")}
                    </td>
                    <td className="px-4 py-3">{submission.full_name || "-"}</td>
                    <td className="px-4 py-3">{submission.email}</td>
                    <td className="px-4 py-3">{submission.postal_code || "-"}</td>
                    <td className="px-4 py-3 capitalize">
                      {submission.water_source || "-"}
                    </td>
                    <td className="px-4 py-3">{submission.score_total ?? "-"}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
                        {submission.risk_level || "-"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`/results/${submission.id}`}
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
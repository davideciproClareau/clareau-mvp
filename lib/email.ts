import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is missing in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResultEmail(email: string, resultId: number) {
  const url =
  process.env.NODE_ENV === "development"
    ? `http://localhost:3000/results/${resultId}`
    : `https://clareau-mvp.vercel.app/results/${resultId}`;

  await resend.emails.send({
    from: "Clareau <onboarding@resend.dev>",
    to: email,
    subject: "Your Clareau Water Score / Votre score d’eau",
    html: `
      <h2>Your Water Score is Ready</h2>
      <p>Click below to view your results:</p>
      <a href="${url}">${url}</a>
      <br/><br/>
      <p>Votre score est prêt. Cliquez ci-dessous :</p>
      <a href="${url}">${url}</a>
    `,
  });
}
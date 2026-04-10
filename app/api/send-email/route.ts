import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email, resultId } = await req.json();

  const url = `https://clareau-mvp.vercel.app/results/${resultId}`;

  try {
    await resend.emails.send({
      from: "Clareau <onboarding@resend.dev>",
      to: email,
      subject: "Your Clareau Water Score",
      html: `
        <h2>Your Water Score is Ready</h2>
        <p>Click below to view your results:</p>
        <a href="${url}">${url}</a>
        <br/><br/>
        <p>Votre score est prêt. Cliquez ci-dessous :</p>
        <a href="${url}">${url}</a>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
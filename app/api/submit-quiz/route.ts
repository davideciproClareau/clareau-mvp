import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { form, result } = body;

    const { data, error } = await supabase
      .from("submissions")
      .insert([
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
      ])
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        {
          error: error.message,
          code: error.code,
          details: error.details,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ id: data.id });
  } catch (err) {
    console.error("Submit API error:", err);
    return NextResponse.json(
      { error: "Server failed to process submission" },
      { status: 500 }
    );
  }
}
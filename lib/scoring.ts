export type QuizAnswers = {
  fullName: string;
  email: string;
  postalCode: string;
  waterSource: string;
  plumbingAge: string;
  hardness: string;
  tasteOdor: string;
  staining: string;
  skinHairIssue: string;
  applianceConcern: string;
};

export type ScoreResult = {
  total: number;
  riskLevel: "Low" | "Moderate" | "High";
  recommendations: string[];
  products: string[];
};

function scoreWaterSource(value: string): number {
  switch (value) {
    case "municipal":
      return 1;
    case "well":
      return 4;
    case "unknown":
      return 3;
    default:
      return 0;
  }
}

function scorePlumbingAge(value: string): number {
  switch (value) {
    case "new":
      return 0;
    case "10-20":
      return 2;
    case "20-40":
      return 4;
    case "40+":
      return 6;
    case "unknown":
      return 3;
    default:
      return 0;
  }
}

function scoreHardness(value: string): number {
  switch (value) {
    case "soft":
      return 0;
    case "moderate":
      return 2;
    case "hard":
      return 4;
    case "very-hard":
      return 6;
    case "unknown":
      return 2;
    default:
      return 0;
  }
}

function scoreTasteOdor(value: string): number {
  switch (value) {
    case "none":
      return 0;
    case "minor":
      return 2;
    case "noticeable":
      return 4;
    case "strong":
      return 6;
    default:
      return 0;
  }
}

function scoreStaining(value: string): number {
  switch (value) {
    case "none":
      return 0;
    case "some":
      return 2;
    case "frequent":
      return 4;
    default:
      return 0;
  }
}

function scoreSkinHairIssue(value: string): number {
  switch (value) {
    case "no":
      return 0;
    case "sometimes":
      return 2;
    case "yes":
      return 4;
    default:
      return 0;
  }
}

function scoreApplianceConcern(value: string): number {
  switch (value) {
    case "no":
      return 0;
    case "somewhat":
      return 2;
    case "yes":
      return 4;
    default:
      return 0;
  }
}

function getRiskLevel(total: number): "Low" | "Moderate" | "High" {
  if (total <= 7) return "Low";
  if (total <= 17) return "Moderate";
  return "High";
}

function buildRecommendations(a: QuizAnswers, riskLevel: "Low" | "Moderate" | "High"): string[] {
  const recs: string[] = [];

  if (a.hardness === "hard" || a.hardness === "very-hard") {
    recs.push("Consider a water softener / Envisagez un adoucisseur d’eau");
  }

  if (a.tasteOdor === "noticeable" || a.tasteOdor === "strong") {
    recs.push("Consider carbon filtration for taste and odor / Envisagez une filtration au charbon pour le goût et l’odeur");
  }

  if (a.waterSource === "well") {
    recs.push("Schedule lab testing for well water / Prévoyez une analyse en laboratoire pour l’eau de puits");
  }

  if (a.plumbingAge === "40+") {
    recs.push("Older plumbing may justify inspection / Une plomberie plus ancienne pourrait justifier une inspection");
  }

  if (a.staining === "frequent") {
    recs.push("Frequent staining may indicate mineral or iron issues / Des taches fréquentes peuvent indiquer des problèmes de minéraux ou de fer");
  }

  if (riskLevel === "High") {
    recs.push("Priority: deeper water analysis recommended / Priorité : une analyse d’eau plus approfondie est recommandée");
  }

  if (recs.length === 0) {
    recs.push("Low concern profile: monitor changes over time / Profil à faible préoccupation : surveillez les changements au fil du temps");
  }

  return recs;
}

function buildProducts(a: QuizAnswers): string[] {
  const products: string[] = [];

  if (a.hardness === "hard" || a.hardness === "very-hard") {
    products.push("Water softener / Adoucisseur d’eau");
  }

  if (a.tasteOdor === "noticeable" || a.tasteOdor === "strong") {
    products.push("Carbon filter / Filtre au charbon");
  }

  if (a.waterSource === "well") {
    products.push("Well water lab test kit / Trousse d’analyse pour eau de puits");
  }

  if (a.staining === "frequent") {
    products.push("Iron or sediment pre-filter / Préfiltre pour fer ou sédiments");
  }

  if (products.length === 0) {
    products.push("Basic point-of-use filtration / Filtration de base au point d’utilisation");
  }

  return products;
}

export function scoreSubmission(answers: QuizAnswers): ScoreResult {
  const total =
    scoreWaterSource(answers.waterSource) +
    scorePlumbingAge(answers.plumbingAge) +
    scoreHardness(answers.hardness) +
    scoreTasteOdor(answers.tasteOdor) +
    scoreStaining(answers.staining) +
    scoreSkinHairIssue(answers.skinHairIssue) +
    scoreApplianceConcern(answers.applianceConcern);

  const riskLevel = getRiskLevel(total);

  return {
    total,
    riskLevel,
    recommendations: buildRecommendations(answers, riskLevel),
    products: buildProducts(answers),
  };
}
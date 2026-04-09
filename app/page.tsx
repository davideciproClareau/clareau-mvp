export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Clareau
      </h1>

      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
        Understand your home's water with a personalized score.
        <br />
        <span className="block mt-2">
          Comprenez l’eau de votre domicile avec un score personnalisé.
        </span>
      </p>

      <div className="flex gap-4">
        <a
          href="/quiz"
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          Get My Water Score
        </a>

        <a
          href="/quiz"
          className="border px-6 py-3 rounded-xl"
        >
          Obtenir mon score
        </a>
      </div>
    </main>
  );
}

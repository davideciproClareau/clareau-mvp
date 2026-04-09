export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white text-slate-900">
      
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Clareau
      </h1>

      <p className="text-lg md:text-xl text-slate-700 max-w-2xl mb-10">
        Understand your home's water with a personalized score.
        <br />
        <span className="block mt-2">
          Comprenez l’eau de votre domicile avec un score personnalisé.
        </span>
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
  
  <a
    href="/quiz"
    className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-xl font-medium text-center"
  >
    Get My Water Score
  </a>

  <a
    href="/quiz"
    className="w-full sm:w-auto bg-white text-black border border-black px-6 py-3 rounded-xl font-medium text-center"
  >
    Obtenir mon score
  </a>

</div>
    </main>
  );
}

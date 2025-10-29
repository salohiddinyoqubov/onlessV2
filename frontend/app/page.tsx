import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Onless.uz</h1>
        <p className="text-xl text-neutral-light">
          Haydovchilik nazariy imtihoni platformasi
        </p>
        <Link
          href="/exam"
          className="inline-block px-8 py-4 bg-success hover:bg-success/80 text-white rounded-lg font-semibold transition-colors"
        >
          Imtihonni boshlash
        </Link>
      </div>
    </main>
  );
}

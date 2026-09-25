function Home() {
  return (
    <main className="min-h-screen bg-background text-text">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Bajwa's Collection
          </p>

          <h1 className="font-heading text-5xl font-medium tracking-tight md:text-7xl">
            The RANI Storefront
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-text-muted">
            Premium fashion commerce experience powered by RANI.
          </p>

          <button className="mt-8 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover">
            Explore Collection
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;
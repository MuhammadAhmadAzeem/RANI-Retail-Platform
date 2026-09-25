import { Button, Card } from "@rani/ui";

function Home() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-text">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Bajwa's Collection
        </p>

        <h1 className="mt-4 font-heading text-5xl font-medium tracking-tight md:text-7xl">
          Premium Fashion
        </h1>

        <p className="mt-5 max-w-xl text-text-muted">
          A premium fashion commerce experience powered by RANI.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg">
            Shop Collection
          </Button>

          <Button variant="outline" size="lg">
            Explore New Arrivals
          </Button>
        </div>

        <Card className="mt-12 max-w-md p-6 shadow-[var(--rani-shadow-card)]">
          <h2 className="font-heading text-2xl">
            RANI Design System
          </h2>

          <p className="mt-2 text-sm text-text-muted">
            Shared UI components for the RANI platform.
          </p>
        </Card>
      </div>
    </main>
  );
}

export default Home;
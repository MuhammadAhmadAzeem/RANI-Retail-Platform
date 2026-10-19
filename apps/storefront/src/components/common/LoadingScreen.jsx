function LoadingScreen({ label = "Loading..." }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="flex min-h-[50vh] w-full items-center justify-center px-6 py-16"
    >
      <div className="flex flex-col items-center text-center">
        <span
          aria-hidden="true"
          className="h-9 w-9 rounded-full border-2 border-border border-t-primary motion-safe:animate-spin"
        />

        <p className="mt-4 text-sm font-medium text-text">
          {label}
        </p>
      </div>
    </div>
  );
}

export default LoadingScreen;

import SharedErrorBoundary from "../components/common/ErrorBoundary";

function ErrorBoundary({ children }) {
  return (
    <SharedErrorBoundary>
      {children}
    </SharedErrorBoundary>
  );
}

export default ErrorBoundary;

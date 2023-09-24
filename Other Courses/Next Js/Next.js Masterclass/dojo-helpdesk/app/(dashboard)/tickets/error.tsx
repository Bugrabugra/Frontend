"use client";

type ErrorProps = {
  error: Error
  reset: () => void
}

const error = ({ error, reset }: ErrorProps) => {
  return (
    <main className="text-center">
      <h2 className="text-4xl">Oh no!</h2>
      <p>{error.message}</p>
      <button onClick={reset} className="btn-primary mx-auto my-4">
        Maybe try again?
      </button>
    </main>
  );
};

export default error;

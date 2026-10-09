import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api/health/";

function App() {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function checkBackend() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (data.status !== "ok") {
          throw new Error("Unexpected health-check response");
        }

        setStatus("connected");
        setMessage("Django API is responding successfully.");
      } catch (error) {
        setStatus("error");
        setMessage(error.message || "Could not connect to Django.");
      }
    }

    checkBackend();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <section className="w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-8 text-center shadow-xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
          API Integration Lab
        </p>

        <h1 className="text-3xl font-bold text-white">
          Social Content Intelligence
        </h1>

        <p className="mt-4 text-slate-400">React + Vite + Tailwind CSS</p>

        <div className="mt-8 rounded-xl border border-slate-700 bg-slate-950 p-5">
          <p className="text-sm font-medium text-slate-400">
            Backend Connection
          </p>

          <p
            className={`mt-3 text-lg font-bold ${
              status === "connected"
                ? "text-emerald-400"
                : status === "error"
                  ? "text-red-400"
                  : "text-amber-400"
            }`}
          >
            {status === "loading"
              ? "Connecting..."
              : status === "connected"
                ? "Connected"
                : "Connection failed"}
          </p>

          <p className="mt-2 text-sm text-slate-400">
            {message || "Waiting for the Django API response..."}
          </p>
        </div>
      </section>
    </main>
  );
}

export default App;

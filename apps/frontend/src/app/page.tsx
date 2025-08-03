import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <main
      className="
        w-[90vw] h-[90vh]
        bg-white/50 dark:bg-white/5 backdrop-blur-xl
        rounded-3xl shadow-2xl
        flex flex-col
        overflow-hidden
      "
    >
      <header className="p-6 pb-4">
        <h1 className="text-2xl font-bold tracking-tight">
          Glade Dashboard
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Your widgets at a glance
        </p>
      </header>

      <section className="flex-1 overflow-visible px-6 pb-6">
        <Dashboard />
      </section>
    </main>
  );
}
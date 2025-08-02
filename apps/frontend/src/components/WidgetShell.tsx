export function WidgetShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full rounded-2xl shadow-inner bg-white/80 dark:bg-slate-800/60 p-3 flex flex-col">
      <h2 className="text-xs font-semibold mb-2 truncate">{title}</h2>
      <div className="flex-1 flex items-center justify-center text-center text-sm">
        {children}
      </div>
    </div>
  );
}

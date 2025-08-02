import { getWidgets } from "@/lib/widgetLoader";
import { WidgetShell } from "@/components/WidgetShell";

export default function Dashboard() {
  const widgets = getWidgets();

  return (
    <div
      className="grid gap-6 overflow-auto scrollbar-glade
        [grid-template-columns:repeat(auto-fill,_minmax(clamp(300px,30vw,350px),1fr))]
        [grid-auto-rows:clamp(300px,30vw,350px)]
      "
    >
      {widgets.map(({ meta, Component }) => (
        <WidgetShell key={meta.name} title={meta.desc}>
          <Component />
        </WidgetShell>
      ))}
    </div>
  );
}
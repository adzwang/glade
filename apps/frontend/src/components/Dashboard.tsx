"use client";

import { getWidgets } from "@/lib/widgetLoader";
import { WidgetShell } from "@/components/WidgetShell";

export default function Dashboard() {
  const widgets = getWidgets();

  return (
    <div
      className="grid gap-6 overflow-visible scrollbar-glade
        [grid-template-columns:repeat(auto-fill,_minmax(clamp(300px,30vw,350px),1fr))]
        [grid-auto-rows:clamp(300px,30vw,350px)]
      "
    >
      {widgets.map(({ meta, Component }) => (
        <WidgetShell key={meta.endpoint} title={meta.name} description={meta.desc} fullBleed={!!meta.fullBleed}>
          <Component />
        </WidgetShell>
      ))}
    </div>
  );
}
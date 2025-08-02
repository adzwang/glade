import type { WidgetModule } from "@/lib/types";

const ctx = require.context("../widgets", false, /\.tsx?$/);

export function getWidgets(): WidgetModule[] {
  return ctx.keys().map((key) => ctx(key) as WidgetModule);
}

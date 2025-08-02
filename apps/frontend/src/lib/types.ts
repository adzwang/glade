import React from "react";

export interface WidgetMeta {
  // the pretty name that we render, ideally should match python widget
  name: string;

  // human readable description
  desc: string;

  // endpoint that we hit, MUST match the python widget
  endpoint: string;

  // polling interval in seconds (optional)
  refresh?: number
}

export type WidgetModule = {
  meta: WidgetMeta;
  Component: React.FC
}

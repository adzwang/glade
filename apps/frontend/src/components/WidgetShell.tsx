import React from "react";
import clsx from "clsx";

interface WidgetShellProps {
  /** Title shown above the widget */
  title: string;
  /** Short description shown under the title */
  description?: string;
  children: React.ReactNode;
  /** if true, widget fills the whole card (no shell padding/bg) */
  fullBleed?: boolean;
}

export function WidgetShell({
  title,
  description,
  children,
  fullBleed = false,
}: WidgetShellProps) {
  return (
    <div
      className={clsx(
        // base shape
        "w-full min-h-0 rounded-2xl flex flex-col transition-all duration-200 ease-out overflow-visible shadow-md hover:shadow-lg hover:-translate-y-0.5",
        // visual style per mode
        fullBleed
          ? "bg-transparent p-0"
          : "bg-white/80 dark:bg-slate-800/60 p-3",
      )}
    >
      {!fullBleed && (
        <div className={clsx(
            "flex-shrink-0",
            fullBleed ? "p-2 pt-3" : ""
          )}>
          <h2 className="text-sm font-semibold truncate leading-tight">{title}</h2>
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {description}
            </p>
          )}
        </div>
      )}

      <div className={clsx(
        "flex-1 min-h-0",
        fullBleed ? "" : "pt-2"
      )}>
        {children}
      </div>
    </div>
  );
}

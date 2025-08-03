import "./globals.css";
import type { ReactNode } from "react";

export const metadata = { title: "Glade" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className="
        min-h-screen flex items-center justify-center
        bg-gradient-to-br from-sky-100 to-white
        dark:from-slate-500 dark:to-slate-800
        text-gray-900 dark:text-gray-100
      "
    >
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen w-full flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}

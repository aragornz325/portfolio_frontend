

import "./globals.css";
import { ReactQueryProvider } from "@/lib/providers/reac-query-provider";
import { Analytics } from '@vercel/analytics/next';


export const metadata = {
  title: "Jefe Maestro Console",
  description: "Portafolio de Comando - Full Stack Spartan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-sm bg-black text-terminal-fg font-terminal">
        <ReactQueryProvider>
          {children}
          <Analytics />
        </ReactQueryProvider>
      </body>
    </html>
  );
}

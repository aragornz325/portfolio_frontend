import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/providers/reac-query-provider";
import { Analytics } from '@vercel/analytics/next';


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body className={geistMono.variable}>
        <ReactQueryProvider>
          {children}
          <Analytics />
        </ReactQueryProvider>
      </body>
    </html>
  );
}

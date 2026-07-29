import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InsightIQ — Enterprise Business Intelligence Analytics Platform",
  description: "Next-generation Business Intelligence dashboard with 3D visualizations, automated data cleaning, natural language SQL, AI forecasting, and real-time analytics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#030712] text-slate-100 min-h-screen font-sans antialiased aurora-bg">
        {children}
      </body>
    </html>
  );
}

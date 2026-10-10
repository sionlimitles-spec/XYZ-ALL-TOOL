import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SettingsDrawer } from "@/components/layout/SettingsDrawer";
import { AccentInitializer } from "@/components/providers/AccentInitializer";

export const metadata: Metadata = {
  title: "XYZ ALL TOOL",
  description: "Multi-tool super lengkap dalam satu tempat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" data-accent="violet" className="dark">
      <body>
        <AccentInitializer />
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 flex flex-col">
            <Header />
            <div className="flex-1 p-6 overflow-y-auto">{children}</div>
          </main>
        </div>
        <SettingsDrawer />
      </body>
    </html>
  );
}

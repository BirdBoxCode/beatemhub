import type { Metadata } from "next";
import { montserrat, roboto, kodeMono, roadRage } from "@/app/fonts";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Custom Gaming Setups for Events | Beat Em Hub",
  description: "From retro gaming & arcades to VR, Beat Em Hub builds custom gaming setups that transform any event – trusted by festivals, conferences & brands alike.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${roboto.variable} ${kodeMono.variable} ${roadRage.variable} antialiased bg-background text-foreground`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

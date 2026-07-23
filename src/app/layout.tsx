import type { Metadata } from "next";
import { montserrat, roboto, kodeMono, roadRage } from "@/app/fonts";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://beatemhub.com"),
  title: "Custom Gaming Setups for Events | Beat Em Hub",
  description: "From retro gaming & arcades to VR, Beat Em Hub builds custom gaming setups that transform any event – trusted by festivals, conferences & brands alike.",
  openGraph: {
    title: "Custom Gaming Setups for Events | Beat Em Hub",
    description: "From retro gaming & arcades to VR, Beat Em Hub builds custom gaming setups that transform any event – trusted by festivals, conferences & brands alike.",
    url: "https://beatemhub.com",
    siteName: "Beat Em Hub",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Beat Em Hub – custom gaming setups for events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Gaming Setups for Events | Beat Em Hub",
    description: "From retro gaming & arcades to VR, Beat Em Hub builds custom gaming setups that transform any event – trusted by festivals, conferences & brands alike.",
    images: ["/og-image.png"],
  },
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

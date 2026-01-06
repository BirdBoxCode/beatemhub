import { Montserrat, Roboto, Kode_Mono } from "next/font/google";
import localFont from "next/font/local";

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const kodeMono = Kode_Mono({
  subsets: ["latin"],
  variable: "--font-kode-mono",
  display: "swap",
});

export const roadRage = localFont({
  src: "../../public/fonts/Road_Rage.otf",
  variable: "--font-road-rage",
  display: "swap",
});

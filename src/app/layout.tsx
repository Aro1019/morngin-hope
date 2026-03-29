/* Layout racine - Enveloppe globale de l'application */
/* Ce fichier est le point d'entrée de toute l'arborescence */

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

/* Police principale du site */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/* Métadonnées globales du site */
export const metadata: Metadata = {
  title: "Morning Hope",
  description: "Association caritative pour l'amélioration des conditions de vie des enfants et des familles.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function LayoutRacine({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

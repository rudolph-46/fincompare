import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinCompare Afrique - Comparateur de Crédit au Cameroun",
  description: "Comparez les offres de crédit de plus de 400 banques et microfinances au Cameroun. Trouvez le meilleur taux en 2 minutes.",
  keywords: ["crédit", "prêt", "banque", "microfinance", "Cameroun", "comparateur", "EMF", "COBAC"],
  authors: [{ name: "FinCompare Afrique" }],
  openGraph: {
    title: "FinCompare Afrique - Comparateur de Crédit",
    description: "Trouvez le meilleur crédit au Cameroun. Comparez gratuitement.",
    type: "website",
    locale: "fr_CM",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#059669",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

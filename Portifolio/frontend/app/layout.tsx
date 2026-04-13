import type { Metadata } from "next";
import { Geist, Geist_Mono, Fira_Code, Roboto, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"]
})

const roboto = Roboto({
  variable: "--font-roboto-regular",
  subsets: ["latin"]
})

const montserrat = Montserrat({
  variable: "--font-montserrat-regular",
  subsets: ["latin"],
})

export const metadata: Metadata = { //}Meta Tags steads aqui
  title: "Portifolio | Rafael Machado",
  description: "Desenvolvedor Fullstack focado em soluções robustas com Next.js e Laravel",
  keywords: ["Rafael Machado", "Desenvolvedor", "Fullstack", "Next.js", "Laravel", "Portifolio"],
  authors: [{ name: "Rafael Machado" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://seusite.com.br",
  },
  // Configurações de Compartilhamento (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    type: "website",
    url: "https://seusite.com.br",
    title: "Portifolio | Rafael Machado",
    description: "Desenvolvedor Fullstack focado em soluções robustas com Next.js e Laravel",
    images: [
      {
        url: "https://seusite.com.br/banner-compartilhamento.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  // X (Antigo Twitter)
  twitter: {
    card: "summary_large_image",
    title: "Portifolio | Rafael Machado",
    description: "Desenvolvedor Fullstack focado em soluções robustas com Next.js e Laravel",
    images: ["https://seusite.com.br/banner-compartilhamento.jpg"],
  },
};

export const viewport = { //A cor da barra do mobile com a cor do site
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${firaCode.variable} ${roboto.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

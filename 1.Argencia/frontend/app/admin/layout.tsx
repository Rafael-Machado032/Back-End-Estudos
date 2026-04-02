import { Aside } from "@/components/admin/Aside";
import { Footer } from "@/components/admin/Footer";
import { Header } from "@/components/admin/Header";
import { LayoutProvedor } from "@/contexts/LayoutContext";
import { buscarLayout } from "../lib/BuscarLayout";
import { NavegacaoProvedor } from "@/contexts/Navegacao"; // ajuste o caminho
import { UsuarioProvedor } from "@/contexts/UsuarioContext";
import { buscarUsuarioLogado } from "../lib/BuscarUsuarioLogado";
import { DepoimentoProvedor } from "@/contexts/DepoimentoContext";
import { buscarDepoimentos } from "../lib/BuscarDepoimento";
import { MensagemProvedor } from "@/contexts/MensagemContext";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "../globals.css";


const roboto = Roboto({
  weight: ['400', '700'], // Escolha os pesos (400 é normal, 700 é negrito)
  subsets: ["latin"],
  variable: "--font-roboto", // Nome da variável para o CSS
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = { //}Meta Tags Setados aqui
  title: "10.Agência | Título Incrível",
  description: "Uma descrição curta que convence a pessoa a clicar.",
  keywords: ["palavras-chaves", "separados", "por", "virgula"],
  authors: [{ name: "Rafael Machado" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://seusite.com.br",
  },
  // Configurações de Compartilhamento (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    type: "website",
    url: "https://seusite.com.br",
    title: "Título Incrível do Meu Site",
    description: "Uma descrição curta que convence a pessoa a clicar.",
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
    title: "Título Incrível do Meu Site",
    description: "Uma descrição curta que convence a pessoa a clicar.",
    images: ["https://seusite.com.br/banner-compartilhamento.jpg"],
  },
};

export const viewport = { //A cor da barra do mobile com a cor do site
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
};



export default async function AdminLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  
  const usuarioLogado = await buscarUsuarioLogado();
  const layoutInicial = await buscarLayout();
  const depoimentosIniciais = await buscarDepoimentos();
  const mensagemInicial = null; // Se quiser, pode criar uma função para buscar mensagens iniciais também

  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable} ${geistSans.variable} ${geistMono.variable} font-roboto antialiased`}>
        <NavegacaoProvedor>
          <UsuarioProvedor usuarioInicial={usuarioLogado}>
            <LayoutProvedor layoutInicial={layoutInicial?.layout}>
              <DepoimentoProvedor depoimentosIniciais={depoimentosIniciais}>
                <MensagemProvedor mensagensIniciais={mensagemInicial}>
                  <Header />
                  <div className="flex w-full">
                    <Aside />
                    {children}
                  </div>
                  <Footer />
                </MensagemProvedor>
              </DepoimentoProvedor>
            </LayoutProvedor>
          </UsuarioProvedor>
        </NavegacaoProvedor>

      </body>
    </html>
  );
}
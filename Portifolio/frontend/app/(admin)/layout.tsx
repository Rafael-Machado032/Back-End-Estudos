import type { Metadata } from "next";
import { Geist, Geist_Mono, Fira_Code, Montserrat } from "next/font/google";
import "../globals.css";
import { CurriculoProvedor } from "@/context/CurriculoContext";
import { FormacaoProvedor } from "@/context/FormacaoContext";
import { ProjetoProvedor } from "@/context/ProjetoContext";
import { ItemProvedor } from "@/context/IdEditar";
import { BuscarCurriculoAction } from "@/api/CurriculoAPI";
import { BuscarFormacaoAction } from "@/api/FormacaoAPI";
import { BuscarProjetosAction } from "@/api/ProjetoAPI";



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

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  const buscarCurriculo = await BuscarCurriculoAction();
  const buscarFormacao = await BuscarFormacaoAction();
  const buscarProjeto = await BuscarProjetosAction();
  
  // console.log("Resposta do Banco Projeto", buscarProjeto);
  // console.log("Resposta do Banco Formação", buscarFormacao);
  // console.log("Resposta do Banco Curriculo", buscarCurriculo);

  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} ${firaCode.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CurriculoProvedor curriculoInicial={buscarCurriculo?.dados}>
          <FormacaoProvedor formacaoInicial={buscarFormacao.dados}>
            <ProjetoProvedor projetoInicial={buscarProjeto.dados}>
              <ItemProvedor>
                {children}
              </ItemProvedor>
            </ProjetoProvedor>
          </FormacaoProvedor>
        </CurriculoProvedor>
      </body>
    </html>
  );
}

import Image from "next/image";
import Hero from "@/components/site/Hero";
import Empresas from "@/components/site/Empresas";
import Servicos from "@/components/site/Servicos";
import Incetico from "@/components/site/Incetico";
import Beneficio from "@/components/site/Beneficio";
import Depoimentos from "@/components/site/Depoimentos";
import Formulario from "@/components/site/Formulario";

export default function Home() {
  return (
    <main>
      <Hero/>
      <Empresas/>
      <Servicos/>
      <Incetico/>
      <Beneficio/>
      <Depoimentos/>
      <Formulario/>
    </main>
  );
}

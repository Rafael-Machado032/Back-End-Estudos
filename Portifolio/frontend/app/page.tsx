import Hero from "@/components/Portifolio/Hero";
import Trajetoria from "@/components/Portifolio/Trajetoria";
import Formacao from "@/components/Portifolio/Formacao";
import Projeto from "@/components/Portifolio/Projeto";
import Contato from "@/components/Portifolio/Contato";



export default function Home() {
  return (
    <main>
      <Hero />
      <Trajetoria />
      <Formacao />
      <Projeto />
      <Contato />

    </main>
  );
}
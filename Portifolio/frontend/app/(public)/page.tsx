import Header from "@/components/Portifolio/Header";
import Hero from "@/components/Portifolio/Hero";
import Trajetoria from "@/components/Portifolio/Trajetoria";
import Formacao from "@/components/Portifolio/Formacao";
import Projeto from "@/components/Portifolio/Projeto";
import Contato from "@/components/Portifolio/Contato";
import Footer from "@/components/Portifolio/Footer";



export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Trajetoria />
      <Formacao />
      <Projeto />
      <Contato />
      <Footer />
    </main>
  );
}
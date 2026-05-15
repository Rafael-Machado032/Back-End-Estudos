## Priedade Principais do MOTION

*⚡ Propriedades de Animação Básica*
- animate:          Define o estado final ou atual da animação. Aceita um objeto com propriedades CSS (ex: {{ x: 100, opacity: 1 }}).
- initial:          Define as propriedades visuais do elemento antes dele renderizar. É o ponto de partida da animação. Pode ser desativado com false.
- transition:       Define como a animação ocorre. Controla a duração (duration), o atraso (delay), a curva de velocidade (ease) e o tipo de física (type: "spring").
- exit:             Define o estado final do componente quando ele é removido da árvore do React. Requer o uso do componente <AnimatePresence> por fora e os filhos tenha a propiedade Key.

*🎛️ Propriedades de Interação (Gestos)*
- whileHover:       Define propriedades visuais que disparam quando o usuário passa o mouse sobre o elemento.
- whileTap:         Define propriedades visuais para o momento em que o elemento é clicado ou tocado.
- whileFocus:       Aplica estilos de animação quando o elemento recebe foco (útil para acessibilidade em inputs e botões).
- whileDrag:        Aplica estilos específicos ao elemento enquanto ele está sendo arrastado pelo usuário.

*🖐️ Propriedades de Arrastar (Drag)*
- drag:             Ativa a funcionalidade de arrastar. Aceita true, "x" (apenas horizontal) ou "y" (apenas vertical).
- dragConstraints:  Limita a área onde o elemento pode ser arrastado. Aceita pixels ({ top: 0, left: -100 }) ou a referência de outro elemento HTML (useRef).
- dragElastic:      Define o grau de resistência física ao arrastar para fora dos limites permitidos.
- dragSnapToOrigin: Se definido como true, o elemento volta obrigatoriamente para a posição inicial quando o usuário o solta.

*👁️ Propriedades de Rolagem (Scroll)*
- whileInView:      Dispara uma animação automaticamente quando o elemento entra na área visível da tela (Viewport).
- viewport:         Configura o comportamento do whileInView. Controla se a animação ocorre apenas uma vez (once: true) e define a margem de detecção (margin).

*🛠️ Propriedades Avançadas e Orquestração*
- variants:         Permite criar objetos de configuração externos para reutilizar estados de animação e coordenar animações entre pais e filhos.
- custom:           Passa dados dinâmicos para dentro das variants, permitindo que cada item de uma lista anime com valores diferentes baseados em variáveis.
- layout:           Ativa animações automáticas de layout. O elemento anima suavemente se o seu tamanho ou posição mudar devido a alterações no CSS ao redor.
- layoutId:         Anima a transição de um elemento entre componentes diferentes. Se o componente antigo sumir e um novo surgir com o mesmo layoutId, o Motion cria uma transição fluida entre eles (Hero animation).

## 🎭 initial, animate, exit, whileHover, whileTap, whileFocus, whileDrag, whileInView

 *Atalhos de Posição e Transformação (Mais Usados)*
- x:                                    Deslocamento horizontal (ex: 100, "-50%").
- y:                                    Deslocamento vertical (ex: -200, "10vh").
- z:                                    Deslocamento de profundidade 3D (ex: 50).
- scale:                                Tamanho/escala do elemento (ex: 1 normal, 0 invisível, 1.5 ampliado).
- scaleX / scaleY:                      Altera o tamanho apenas na largura ou na altura.
- rotate:                               Rotação em graus (ex: 90, -180, 360).
- rotateX / rotateY:                    Rotação 3D nos eixos X ou Y.
- skewX / skewY:                        Inclinação do elemento em graus.

 *Opacidade e Visibilidade*
- opacity:                              Transparência (ex: 0 invisível, 1 totalmente visível).
- visibility:                           Controle de exibição do CSS (ex: "visible", "hidden").3. 
    
  *Estilos de Design (CSS Comum)*
- backgroundColor:                     Cor de fundo (ex: "#ff0000", "rgb(0,0,0)", "transparent").
- color:                               Cor do texto (ex: "#ffffff", "zinc-400").
- borderRadius:                        Arredondamento das bordas (ex: "8px", "50%").
- borderWidth / borderColor:           Espessura e cor da borda.
- boxShadow:                           Sombra do elemento (ex: "0px 10px 20px rgba(0,0,0,0.3)").
- width / height:                      Largura e altura físicas (ex: 300, "100%"). 
   
 *Filtros Visuais (Efeitos Especiais)*
- filter:                               Filtros CSS (ex: "blur(10px)" para desfoque, "grayscale(100%)" para preto e branco).
- clipPath:                             Máscaras de corte (ex: "circle(50% at 50% 50%)").

 *Estados Especiais do Framer Motion*
- pathLength:                           Para animar o contorno de desenhos SVG (vai de 0 a 1).
- pathSpacing / pathOffset:             Controla o espaçamento e o início da linha do SVG.

## transition

 *Controles de Tempo Universais*
- duration:                             Tempo total da animação em segundos (ex: 0.5, 3).
- delay:                                Tempo de espera em segundos antes de começar (ex: 0.2).
- repeat:                               Quantas vezes a animação vai repetir (ex: Infinity para loop eterno, ou números como 2, 3).
- repeatType:                           Estilo da repetição. Aceita:
    1. "loop":                Recomeça do início.
    2. "reverse":             Vai e volta (estilo bumerangue).
    3. "mirror":              Inverte o início e o fim a cada ciclo.
- repeatDelay:                          Tempo de espera entre cada repetição. 
   
   *Tipos de Física (type)*
   O valor escolhido em type muda as outras propriedades disponíveis:
- type: "tween" (Animação baseada em tempo):
    1. ease:                  Curva de velocidade. Aceita strings (ex: "linear", "easeIn", "easeOut", "easeInOut") ou uma array de curva Cubic Bezier (ex: [0.17, 0.67, 0.83, 0.67]).
        * linear    -> O objeto se move exatamente com a mesma velocidade do início ao fim. Não há aceleração nem desaceleração.
        * easeIn    -> O movimento começa extremamente lento (em repouso) e vai ganhando velocidade gradativamente até o final, onde atinge a velocidade máxima e para bruscamente.
        * easeOut   -> O objeto surge ou começa na velocidade máxima instantaneamente e vai freando suavemente até parar de forma delicada no destino.
        * easeInOut -> O movimento começa lento, acelera bastante no meio do caminho (pico de velocidade) e desacelera suavemente antes de parar completamente no final.
- type: "spring" (Física de mola realista - Padrão para posições):
    1. stiffness:             Rigidez da mola. Números maiores deixam o movimento mais rápido e abrupto (ex: 100, 300).
    2. damping:               Amortecimento. Números menores fazem o elemento quicar mais. Números maiores freiam o movimento mais rápido (ex: 10, 30).
    3. mass:                  Peso do objeto. Objetos mais pesados demoram mais para acelerar e parar (ex: 1, 5).
    4. velocity:              Velocidade inicial do disparo da mola.
- type: "inertia" (Efeito de desaceleração por atrito):
    1. velocity:              Velocidade inicial.
    2. power:                 A força do empurrão inicial.
    3. timeConstant:          Controla a taxa de desaceleração. 
   
   *Controles Avançados de Sequência (Keyframes e Filhos)* 
- times:                                Array de números entre 0 e 1 para definir o tempo exato de cada passo dos keyframes (ex: [0, 0.3, 1]).
- staggerChildren:                      Tempo de atraso entre a animação de cada filho dentro de um container (ex: 0.1).
- delayChildren:                        Tempo que o container pai espera antes de liberar as animações dos filhos começarem.
- staggerDirection:                     Direção da sequência dos filhos (ex: 1 do primeiro ao último, -1 do último ao primeiro).
- when:                                 Quando a animação do pai ocorre em relação aos filhos (ex: "beforeChildren" roda o pai primeiro, "afterChildren" espera todos os filhos acabarem).

## 🖐️ drag, dragConstraints, dragElastic, dragSnapToOrigin

*Configuração do Eixo (drag)*
Define se o elemento pode se mover e em qual direção:
- true              -> Permite arrastar livremente para qualquer direção (X e Y).
- "x"               -> Bloqueia o movimento na vertical. O elemento só arrasta para os lados.
- "y"               -> Bloqueia o movimento na horizontal. O elemento só arrasta para cima e para baixo (comum em menus do tipo drawer de celular).
- false             -> Desativa o arraste (padrão).

*Limitação de Área (dragConstraints)*
Define até onde o objeto pode ir antes de ser travado ou puxado de volta. Aceita dois formatos:

1. Objeto com Pixels (Margens Absolutas)
Mapeia os limites máximos permitidos em pixels a partir da posição inicial do elemento:
- top:                                  Limite superior (ex: -100 permite subir até 100px).
- bottom:                               Limite inferior (ex: 200 permite descer até 200px).
- left:                                 Limite esquerdo (ex: -50).
- right:                                Limite direito (ex: 50).
Exemplo: dragConstraints={{ top: 0, bottom: 300, left: -50, right: 50 }}

1. Referência de Elemento Pai (useRef)
Prende o elemento obrigatoriamente dentro dos limites de outra tag HTML (ex: uma caixa ou a tela inteira):
- Passa a constante do useRef criada no React.
Exemplo: dragConstraints={meuContainerRef} (O objeto quica nas paredes internas desse container).

*Resistência de Borda (dragElastic)*
Controla o comportamento "elástico" quando o usuário força o elemento para fora dos limites do dragConstraints:
- 0                 -> Desativa a elasticidade. O elemento bate na borda do limite e trava rigidamente como uma parede.
- 1                 -> Elasticidade total (padrão). Permite puxar bastante para fora do limite, mas ele volta como um elástico quando solto.
- 0.5 / 0.2         -> Valores quebrados mudam o peso. Números menores deixam o elástico mais duro e difícil de puxar.
- Objeto por eixo   -> Permite dar elasticidades diferentes por direção (ex: {{ top: 0, bottom: 0.5 }}).

*Retorno Automático (dragSnapToOrigin)*
Controla se o elemento tem "memória" de onde nasceu:
- true              -> Quando o usuário solta o clique, o elemento faz uma transição de mola automática e volta exatamente para o seu lugar de origem no layout.
- false             -> O elemento fica parado exatamente no lugar onde o usuário o soltou (padrão).

*🛠️ Propriedades Extras do Drag*
Você pode adicionar estes três controles muito úteis que entram junto no grupo de arrastar:
- dragTransition:                       Modifica a física de deslizamento quando você joga o elemento (ex: {{ bounceStiffness: 600, bounceDamping: 20 }}).
- dragMomentum:                         Aceita true (padrão) ou false. Se for false, o elemento para na hora que você solta o mouse, tirando o efeito de "deslizar por inércia".
- dragPropagation:                      Aceita true ou false. Se for false, impede que o arraste deste elemento ative o arraste de um container pai que também seja drag.

## Configuração do Comportamento (viewport)

A propriedade viewport recebe um objeto que dita as regras de como e quando o whileInView deve ser disparado.
*Disparar Apenas Uma Vez (once)*
Define se a animação vai acontecer toda vez que o usuário subir/descer a página ou apenas na primeira leitura:
- true: A animação roda apenas uma vez quando o elemento entra na tela e fixa no estado final. Mesmo se o usuário der scroll para longe e voltar, o elemento não se move mais.
- false (Padrão): A animação "reseta" (volta para o estado do initial) sempre que o elemento sair totalmente da tela e roda de novo ao voltar.

*Margem de Detecção (margin)*
Adiciona uma margem virtual ao redor da tela (Viewport) para antecipar ou atrasar o disparo da animação. Aceita strings no mesmo formato do margin do CSS:
- margin: "-100px": Atrasa o disparo. O elemento precisa entrar pelo menos 100px para dentro da tela antes de começar a animar (ótimo para evitar que animações rodem antes do usuário realmente olhar para elas).
- margin: "200px": Antecipa o disparo. O elemento começa a animar 200px antes de aparecer fisicamente na tela (bom para carregar conteúdos pesados de forma fluida).

*Proporção de Interseção (amount)*
Define qual porcentagem do elemento precisa estar visível para o gatilho disparar:
- "some" (Padrão): Basta uma pontinha (1 pixel) do elemento entrar na tela para a animação começar.
- "all": O elemento inteiro precisa estar 100% visível dentro do navegador para disparar.
- Valores Numéricos (de 0 a 1): Define a fração exata. Exemplo: amount: 0.5 significa que a animação só começa quando metade (50%) do tamanho do elemento estiver dentro da área visível.

*Elemento Container (root)*
Por padrão, o Framer Motion monitora a rolagem da página inteira (window). Se o seu elemento estiver dentro de uma caixa menor com scroll interno (ex: uma div com overflow-y: scroll), você deve passar a referência dessa div (useRef) nesta propriedade para que ele monitore o scroll correto.
Exemplo: viewport={{ root: meuContainerRef }}.

## 🛠️ variants, custom, layout, layoutId

Estas propriedades não controlam estilos visuais diretamente; elas gerenciam a arquitetura, o fluxo de dados e a reconfiguração do HTML na tela.
*Objetos Reutilizáveis (variants)*
As variants aceitam um objeto javascript contendo sub-objetos com os nomes dos seus estados de animação personalizados (como hidden, visible, open, closed).
💡 Como funciona a orquestração automática:
- Se um container pai define initial="hidden" e animate="visible", todos os filhos diretos do tipo motion herdarão os gatilhos "hidden" e "visible" automaticamente.
- Você não precisa passar as propriedades initial ou animate para os filhos; basta definir o objeto variants dentro de cada um deles com as mesmas chaves do pai.Permite o uso dos controles de tempo especiais que você anotou na seção anterior (como staggerChildren, delayChildren e when).

```tsx
import { useState } from "react";
import { motion } from "framer-motion";

// 1. REGRAS DO PAI (Container do Menu)
const menuVariants = {
  closed: { 
    x: "-100%", // Joga o menu para fora da tela (esquerda)
    transition: { when: "afterChildren" } // Espera os filhos sumirem para depois fechar o menu
  },
  open: { 
    x: 0, // Traz o menu para a tela
    transition: {
      when: "beforeChildren", // Roda a animação do menu primeiro...
      staggerChildren: 0.1,    // ...e depois solta cada filho com 0.1s de atraso entre eles
    }
  }
};

// 2. REGRAS DOS FILHOS (Itens do Menu)
const itemVariants = {
  closed: { opacity: 0, x: -20 }, // Como eles ficam guardados
  open: { opacity: 1, x: 0 }      // Como eles aparecem
};

export default function MenuOrquestrado() {
    const [isOpen, setIsOpen] = useState(false);
    const links = ["Início", "Perfil", "Configurações", "Sair"];

    return (
        <div className="relative min-h-screen bg-zinc-950 p-6">
        
        {/* Botão para abrir/fechar */}
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md z-50 relative"
        >
            {isOpen ? "Fechar Menu" : "Abrir Menu"}
        </button>

        {/* 📦 CONTAINER PAI */}
        <motion.div
            variants={menuVariants}
            initial="closed"             // <--- O Pai ativa o gatilho "closed"
            animate={isOpen ? "open" : "closed"} // <--- O Pai alterna entre "open" e "closed"
            className="fixed top-0 left-0 h-full w-64 bg-zinc-900 p-6 pt-20 flex flex-col gap-4 shadow-2xl"
        >
            {links.map((link) => (
            /* 🏷️ ELEMENTOS FILHOS */
            <motion.a
                key={link}
                href="#"
                variants={itemVariants} // <--- NÃO PRECISA de initial nem animate aqui!
                className="text-lg text-zinc-300 hover:text-white font-medium"
            >
                {link}
            </motion.a>
            ))}
        </motion.div>

        </div>
    );
}
```

*Dados Dinâmicos (custom)*
A propriedade custom aceita qualquer tipo de dado (números, strings, booleanos ou objetos completos) e os envia como argumento para as funções dentro das suas variants.
💡 Como usar na prática:
- Permite que cada item de uma lista calcule valores únicos (como atrasos diferentes ou posições variadas baseadas no index) sem precisar criar múltiplos objetos.
No componente: <motion.li custom={index} variants={minhasVariants} />
Na Variant:
```tsx
const minhasVariants = {
    visible: (index: number) => ({
        opacity: 1,
        transition: { delay: index * 0.1 } // Cada item entra 0.1s após o anterior
    })
};
```
*Animação Automática de Layout (layout)*
A propriedade layout avisa ao Framer Motion para monitorar o tamanho físico (width/height) e a posição (top/left/flex) do elemento. Ela aceita:
- true: Ativa o monitoramento completo. Se a caixa esticar, encolher ou mudar de lugar por causa de alterações no CSS ao redor (ex: novos itens adicionados a uma lista Flexbox ou Grid), ela faz uma transição visual suave em vez de dar um "salto" seco.
- "position": Anima apenas a mudança de posição geográfica na tela, ignorando mudanças no tamanho do elemento.
- "size": Anima apenas o esticamento/encolhimento do elemento, ignorando mudanças de posição geográfica.
⚠️ Correção de distorção de texto:
Quando um elemento estica com layout, textos e filhos dentro dele podem sofrer um efeito visual de "esticamento borrado" temporário. Para corrigir isso, adicione a propriedade layout também nos elementos filhos diretos.
```tsx
import { useState } from "react";
import { motion } from "framer-motion";

export default function CardFAQ() {
    const [aberto, setAberto] = useState(false);

    return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
            
            {/* 📦 ELEMENTO PAI (A CAIXA) */}
            <motion.div
                layout // <--- Anima suavemente o crescimento da caixa de tamanho
                onClick={() => setAberto(!aberto)}
                className="w-80 cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 p-5 text-white shadow-lg select-none"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {/* 🏷️ FILHO 1: TÍTULO */}
                <motion.h3 
                layout // <--- IMPEDE o título de entortar ou pular quando a caixa abrir
                className="text-lg font-bold"
                >
                {aberto ? "Clique para fechar 🔼" : "Clique para expandir 🔽"}
                </motion.h3>

                {/* 📝 FILHO 2: TEXTO QUE APARECE */}
                {aberto && (
                <motion.p
                    layout // <--- ESSENCIAL AQUI! Impede as letras de sofrerem o efeito "elástico borrado"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-sm text-zinc-400 leading-relaxed"
                >
                    Este texto agora aparece sem nenhuma distorção visual nas fontes. 
                    O Framer Motion calcula a escala reversa do texto em tempo real 
                    enquanto o container pai se expande.
                </motion.p>
                )}

            </motion.div>

            </div>
        );
}
```

*Animações Compartilhadas / Efeito Hero (layoutId)*
A propriedade layoutId aceita uma string única compartilhada entre dois elementos diferentes no React.
💡 Como funciona a mágica:
- Quando o Componente A desaparece da tela e o Componente B aparece em outro lugar (mesmo sendo tags ou arquivos totalmente diferentes), se ambos tiverem exatamente o mesmo layoutId, o Framer Motion cria uma transição fluida interpolando o tamanho e a posição do Componente A diretamente para o Componente B.
- Muito utilizado para fazer marcadores de abas ativas (abas de menu onde a barrinha desliza de uma palavra para a outra) ou miniaturas de fotos que expandem para um modal centralizado.

```tsx
import { useState } from "react";
import { motion } from "framer-motion";

export default function AbasNavegacao() {
  const [abaAtiva, setAbaAtiva] = useState("Home");
  const abas = ["Home", "Projetos", "Contato"];

  return (
    <div className="flex gap-4 bg-zinc-900 p-2 rounded-lg">
        {abas.map((aba) => (
            <button
                key={aba} 
                onClick={() => setAbaAtiva(aba)}
                className="relative px-4 py-2 text-white z-10"
            >
                {aba}
                {/* Se esta for a aba ativa, renderiza o fundo animado */}
                {abaAtiva === aba && (
                <motion.div
                    layoutId="fundo-ativo" // Transforma a movimentação entre botões em um slide suave
                    className="absolute inset-0 bg-blue-600 rounded-md -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
            )}
            </button>
        ))}
    </div>
  );
}
```
## Priedade Principais do MOTION

*⚡ Propriedades de Animação Básica*
- animate:          Define o estado final ou atual da animação. Aceita um objeto com propriedades CSS (ex: {{ x: 100, opacity: 1 }}).
- initial:          Define as propriedades visuais do elemento antes dele renderizar. É o ponto de partida da animação. Pode ser desativado com false.
- transition:       Define como a animação ocorre. Controla a duração (duration), o atraso (delay), a curva de velocidade (ease) e o tipo de física (type: "spring").
- exit:             Define o estado final do componente quando ele é removido da árvore do React. Requer o uso do componente <AnimatePresence> por fora.

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


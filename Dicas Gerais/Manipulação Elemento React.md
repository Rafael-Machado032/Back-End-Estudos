## Manipular Elemento Dinamicamente

O useRef é um Hook do React que guarda todas as propriedade do elemento e tambem pode manipular

```tsx
import { useRef } from 'react'; //Importa o hook
 
// 1. Cria a referência iniciando vazia
  const divRef = useRef<HTMLInputElement>(null);
// 2. Para usar referencia sempre usa o current 
  const elemento = divRef.current;

if (elemento) {
  // 1. Largura e altura totais (inclui conteúdo, padding e bordas)
  const larguraTotal = elemento.offsetWidth;
  const alturaTotal = elemento.offsetHeight;

  // 2. Largura e altura internas (apenas conteúdo e padding, ignora bordas e barras de rolagem)
  const larguraInterna = elemento.clientWidth;
  const alturaInterna = elemento.clientHeight;

  // 3. Tamanho total do conteúdo rolável (mesmo a parte que está escondida)
  const alturaDoConteudoEscondido = elemento.scrollHeight;
  const larguraDoConteudoEscondido = elemento.scrollWidth;
}

if (elemento) {
  const retangulo = elemento.getBoundingClientRect();

  // Salvando as propriedades em variáveis separadas
  const larguraPrecisa = retangulo.width;   // Ex: 150.45px
  const alturaPrecisa = retangulo.height;   // Ex: 80.20px
  const distanciaDoTopo = retangulo.top;    // Distância até o topo da tela
  const distanciaDaEsquerda = retangulo.left; // Distância até a esquerda da tela
}

if (elemento) {
  // 1. Descobrir a posição atual do scroll (útil para criar barras de progresso)
  const rolagemVertical = elemento.scrollTop;   // Quantos pixels rolou para baixo
  const rolagemHorizontal = elemento.scrollLeft; // Quantos pixels rolou para o lado

  // 2. Método para forçar a div a rolar para o topo suavemente
  elemento.scrollTo({ top: 0, behavior: 'smooth' });
}

if (elemento) {
  // 1. Modificar estilos diretamente
  elemento.style.backgroundColor = 'red';
  elemento.style.transform = 'scale(1.1)';

  // 2. Adicionar ou remover classes do Tailwind / CSS normal
  elemento.classList.add('bg-blue-500', 'ativo');
  elemento.classList.remove('escondido');

  // 3. Verificar se uma classe existe na div (retorna true ou false)
  const temClasseAtivo = elemento.classList.contains('ativo');
}

if (elemento) {
  // 1. Pegar todo o texto visível dentro da div
  const textoInterno = elemento.innerText;

  // 2. Buscar um botão específico que está dentro dessa div
  const botaoInterno = elemento.querySelector('button'); 
}



    <div ref={divRef} >
        Minha largura é: {largura}px
    </div>

  
```
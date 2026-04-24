**Rotas**
app/
1. layout.js: O "esqueleto" do seu site (header, footer). Tudo que você colocar aqui aparece em todas as páginas.
2. page.js: É a sua Home (/). É aqui que você vai fazer o fetch para buscar os dados lá no Laravel.
3. Subpastas (ex: usuarios/page.js): Se você criar uma pasta usuarios com um page.js dentro, a URL será ://seusite.com/usuarios
4. Pasta com (parenteses) Route Groups, separa os hambientes e o Next não leva em conta os nomes da pasta, so interna, e pode ter só 1 layout em cada pasta com (parenteses), isso evita o carregamento de um hambiente para outro ex: site e admin

**imagens**
public/
1. Aqui você coloca arquivos estáticos que não mudam: logotipos, ícones e imagens. Tudo que estiver aqui pode ser acessado direto pela URL (ex: /logo.png).

**Componentes**
components/
1. Guardar pedaços da interface que se repetem, como Botao.js, Navbar.js ou CardPost.js.

**Contestos**
contexts/
1. Criada para gerenciar o Estado Global da aplicação. Serve para compartilhar dados (como login do usuário) entre todas as páginas sem precisar passar "na mão" de um arquivo para outro.

**Chamadas de API**
app/services/
1. Você cria um arquivo chamado api.js aqui dentro. Nele, você configura o Axios ou o fetch com a URL do seu Laravel (http://localhost:8000/api).

**Estados**
hooks/
1. Se você criar funções de lógica personalizadas que usam o estado do React (como um formulário de cadastro que envia dados para o Laravel), elas ficam aqui.

**Tipagem de Dados**
types/
1. Definir o "formato" dos dados que vêm do Laravel. Exemplo: Um "Usuario" tem id, nome e email. (Usa no Typescript)

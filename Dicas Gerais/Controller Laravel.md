1. index() — A Listagem
- O que faz: Busca todos os registros no banco para mostrar em uma tabela ou lista.
Exemplo: return Layout::all(); (Retorna todos os layouts salvos).

2. create() — O Formulário de Criação (Web)
- O que faz: Retorna a página HTML com o formulário para o usuário preencher.
Nota: Como você está usando Next.js, você não vai usar esse método, pois o formulário já existe lá no seu frontend.

3. store(Request $request) — O "Salvar Novo"
- O que faz: Recebe os dados do formulário do Next.js e cria um novo registro no banco de dados.
Exemplo: Aqui você salvaria uma nova foto de mockup que ainda não existe.

4. show(Layout $layout) — Ver um Específico
- O que faz: Mostra os detalhes de apenas um layout (ex: só o de ID 5).
Dica: O Laravel já busca o objeto $layout para você automaticamente pelo ID que vem na URL.

5. edit(Layout $layout) — O Formulário de Edição (Web)
- O que faz: Retorna a página HTML para editar um registro existente.
Nota: Também não será usado no seu caso (Next.js), pois o Next cuida da tela.

6. update(Request $request, Layout $layout) — O "Salvar Alteração"
- O que faz: É aqui que a mágica da atualização acontece. Ele pega um layout que já existe e troca os dados (como a foto do PC que você quer mudar).
É o que você vai usar para trocar a foto do mockup!

7. destroy(Layout $layout) — O "Excluir"
- O que faz: Apaga o registro do banco de dados (e você aproveitaria para apagar o arquivo do HD também).
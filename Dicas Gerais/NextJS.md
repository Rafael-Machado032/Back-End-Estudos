## O que é React Next?

**React** é uma biblioteca JavaScript para construir interfaces de usuário de forma eficiente e declarativa. Ele permite criar componentes reutilizáveis e gerenciar o estado da aplicação de maneira simples.

**Next.js** é um framework baseado em React que facilita o desenvolvimento de aplicações web modernas. Ele oferece recursos como renderização do lado do servidor (SSR), geração de sites estáticos (SSG), roteamento automático e otimização de desempenho.

## Como começar

1. **Pré-requisitos**: Tenha o Node.js instalado em seu computador.
2. **Criar um projeto Next.js**:
```bash
    npx create-next-app@latest frontend --yes
```
3. **Executar o projeto**:
```bash
    cd nome-do-projeto
    npm run dev
```
4. **Acessar no navegador**: Abra `http://localhost:3000` para ver sua aplicação rodando.

## Recursos úteis

- [Documentação React](https://react.dev/)
- [Documentação Next.js](https://nextjs.org/docs)

## Modo Produção

1. **Execultar a verificação**
```bash
    npm run build
```
2. **Ativar Servidor**
```bash
    npm start
```

## Limpeza de cach
1. Para limpar o cash exclui a pasta .next e node_modules depois da exclusão execute o comando npm instal para reinstalar os modulos.
```bash
    npm install
```
O comando abaixo ja faz esse procedimento.
```bash
    rd /s /q .next && rd /s /q node_modules && npm install
```
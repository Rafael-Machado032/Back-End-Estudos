**Criando Projeto**
Na pasta onde fica o projeto instala com o coamando
`composer create-project laravel/laravel nome_projeto`
Obs: Caso esqueça alguma extensão desmarcado no caso ";" na exteção vai no caminho indicado ex:

To enable extensions, verify that they are enabled in your .ini files:
    - C:\PHP\php.ini

E remove o ";" da extesão ex:
;extension=fileinfo

Depois disso instala com o `composer install`

**Criando chave criptografado**
`php artisan key:generate`
Gera uma chave api unica para ter acesso a api do backend ("Obrigatorio")

**Instalando e Configurando CORS**
Serve para não bloquear no navegador entre o NEXT e Laravel
`php artisan install:api`
Cria o arquivo routes/api.php (onde vamos colocar a rota de upload).
Instala o Laravel Sanctum (que cuida da segurança da API).
Cria o arquivo config/cors.php automaticamente.

No cors.php modifique:
- 'allowed_origins_patterns' => ['http://localhost:3000'],    // URL padrão do Next.js
- 'supports_credentials' => true,                             //Liberar o uso de cookies de sessão ("para autenticação baseado em cookies" )

**Banco de Dados**
1. Criando a "Receita" da Tabela
    *Criando Tabela*
    `php artisan make:migration criar_tabela_nome`
    Cria o script para desenhar as colunas da tabela. Posso criar quantos scripts quiser antes de rodar o próximo comando. obs: É 1 tabela por arquivo
    
    *Criando Colunas*
    - database/migrations/
    - Dentro da função up criase as colunas 
  
    public function up(): void{
        Schema::create('produtos', function (Blueprint $table) {
            // CHAVE PRIMÁRIA E INCREMENTO
            // O Laravel já cria o 'id' como Chave Primária e Autoincremento por padrão.
            $table->id(); 

            // NOT NULL (Padrão)
            // No Laravel, se você não disser nada, a coluna é NOT NULL.
            $table->string('nome'); 

            // PERMITIR VAZIO (NULLABLE)
            // Se quiser que o campo aceite ficar vazio, use ->nullable()
            $table->text('descricao')->nullable();

            // VALOR PADRÃO (DEFAULT)
            $table->integer('estoque')->default(0);

            // UNICO (UNIQUE) - Ex: E-mail ou CPF que não pode repetir
            $table->string('slug')->unique();

            // CHAVE ESTRANGEIRA (Relacionar com outra tabela)
            // Ex: Este produto pertence a uma categoria
            $table->foreignId('categoria_id')->constrained('categorias');

            $table->timestamps(); // Cria 'created_at' e 'updated_at'
        });
    }

    *Principais tipos de colunas:*
    - $table->string('coluna')            Para textos curtos (até 255 caracteres)
    - $table->text('coluna')              Para textos longos (descrições)
    - $table->integer('coluna')           Para números inteiros
    - $table->decimal('coluna', 8, 2)     Para dinheiro (preço)
    - $table->boolean('coluna')           Para verdadeiro/falso (0 ou 1)

    *Rafazendo:*
    Se você errou o nome de uma coluna e já deu php artisan migrate, não adianta só mudar o arquivo e salvar. Você tem duas opções:
    `php artisan migrate:rollback`  Ele "desfaz" a última migração.
    `php artisan migrate:fresh`     Ele apaga tudo e cria do zero (cuidado: apaga os dados que você já salvou!).

1. Construindo a Tabela no Banco
    `php artisan migrate`
    Executa os scripts. Na primeira vez, cria o arquivo do banco (.sqlite) e as tabelas físicas.

2. O Gerente dos Dados (Model)
    `php artisan make:model NomeNoSingular`
    - app/Models/
    É a ponte. Ele traduz os comandos do Next.js (PHP) para a linguagem do banco (SQL). É quem salva, deleta e busca.
    Ex:
    class Imagem extends Model
    {

        // Informa ao Laravel que o nome da tabela no banco é "imagens"
        protected $table = 'imagens';

        // Permite preencher esses campos via código
        protected $fillable = ['titulo', 'caminho', 'tipo'];

        public $timestamps = true; //Autoriza registrar a data de criação

    }

3. O Cérebro da Lógica (Controller)
    `php artisan make:controller NomeController`
    - app/Http/Controllers/
    Valida se os dados estão certos, decide em qual pasta do HD salvar o arquivo e responde para o Next.js se deu certo ou errado.

4. Abrindo a Porta das Imagens
    `php artisan storage:link`
    Cria um "atalho" da pasta Privada para a Pública. Essencial para o Next.js conseguir exibir as fotos no navegador.

5. Ligando o Motor
    `php artisan serve`
    Ativa o servidor. Sem ele rodando, o Next.js não consegue "conversar" com o banco de dados.


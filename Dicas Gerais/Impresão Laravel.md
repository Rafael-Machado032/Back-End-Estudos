## Laravel

*No arquivo laravel.log*
Imprimir informações no log do Laravel (que geralmente fica em storage/logs/laravel.log), você usa a Facade Log.

Importe o log
```php
    use Illuminate\Support\Facades\Log;
```
e insira 
```php
    Log::info('O usuário tentou logar', ['email' => $request->email]);
    Log::info('Dados recebidos do Next.js:', $request->all());
    Log::error('Erro ao conectar com o banco de dados');
    Log::warning('Acesso suspeito detectado');
    Log::debug('Conteúdo da variável:', $dados); // Ótimo para arrays
```
*No console*
```php
    error_log('Dados recebidos do Next.js: ' . json_encode($request->all())); //Mensagem Simples com variaveis simples sem array
    dump($request->all()); // Ideal para objetos e arrays
```
## Next

*Ver formData*
```tsx
    formData.forEach((value, key) => {
        console.log(key, value);
    });
```



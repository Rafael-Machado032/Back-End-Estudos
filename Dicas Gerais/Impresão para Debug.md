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

## Next

*Do Next para Laravel*
Pode verificar o que chega do next pelo return do controll
```php
    return response()->json([
        'debug'   => $request->all(), // Retorna o q chegou no next
        'error'   => 'Erro interno no servidor.',
        'details' => config('app.debug') ? $e->getMessage() : null
    ], 500);
```

Na resposta da api imprima na console
```tsx
    const dadosDoBanco = await res.json();
    console.log("Resposta do servidor", dadosDoBanco.debug);
```

*Ver formData*
```tsx
    formData.forEach((value, key) => {
        console.log(key, value);
    });
```



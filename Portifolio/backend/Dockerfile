FROM php:8.2-apache

# Instala dependências do sistema e pacotes necessários para o Composer e Laravel
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    libpq-dev \
    ca-certificates

RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# Ativa o módulo de reescrita do Apache para as rotas do Laravel funcionarem
RUN a2enmod rewrite

# Aponta o Apache para a pasta pública do Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Copia os arquivos do projeto para o servidor antes de rodar o composer
WORKDIR /var/www/html
COPY . .

# Baixa e instala o Composer globalmente de forma segura usando a imagem oficial
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Executa a instalação das dependências do Laravel
RUN composer install --no-dev --optimize-autoloader

# Ajusta as permissões de pastas do Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80

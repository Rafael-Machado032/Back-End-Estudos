import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mantém o que você já tinha
  allowedDevOrigins: ['169.254.83.107'],

  // ADICIONE ISSO AQUI:
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
  },

  experimental: { //Almenta o limite de upload para 4mb, o que é mais do que suficiente para um currículo em PDF
    serverActions: {
      bodySizeLimit: '4mb', // Define o limite aqui
    },
  },
};

export default nextConfig;

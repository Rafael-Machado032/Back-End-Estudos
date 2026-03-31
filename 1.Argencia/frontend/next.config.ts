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
                hostname: 'localhost', // ADICIONE ESTE AQUI
                port: '8000',
                pathname: '/storage/**',
            },
        ],
    },
};

export default nextConfig;

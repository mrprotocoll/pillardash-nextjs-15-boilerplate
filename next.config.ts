import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.website.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'website.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;

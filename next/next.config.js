const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  
  // SWCでEmotionサポートを有効化
  compiler: {
    emotion: true
  },
  
  images: {
    // static exportでは画像最適化が制限されるため、loaderを使用
    loader: 'custom',
    loaderFile: './src/utils/imageLoader.js',
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Material-UI最適化
  transpilePackages: ['@mui/material', '@mui/system', '@mui/icons-material'],
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material']
  }
};

module.exports = withBundleAnalyzer(nextConfig);

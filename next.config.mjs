/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  images: { unoptimized: true }   // 👈 this is the important line
};

export default nextConfig;

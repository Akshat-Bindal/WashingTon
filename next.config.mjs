/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  images: { unoptimized: true }, // required since Next Image optimizer doesn’t work on static hosting
  trailingSlash: true,           // optional (keeps routes as /about/ -> about/index.html)
};

export default nextConfig;

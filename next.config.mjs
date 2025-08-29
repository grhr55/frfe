/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "2000", // 👈 твой порт сервера
        pathname: "/portfol/uploads/**",
      },
    ],
  },
};
export default nextConfig;

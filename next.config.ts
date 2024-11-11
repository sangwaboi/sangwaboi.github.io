import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "win98icons.alexmeub.com",
        port: "",
        pathname: "/icons/**",
      },
    ],
  },
};

export default nextConfig;

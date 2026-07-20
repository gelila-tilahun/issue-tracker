import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/signin", destination: "/login", permanent: false },
      { source: "/signout", destination: "/logout", permanent: false },
    ];
  },
};

export default nextConfig;

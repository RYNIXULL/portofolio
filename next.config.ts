import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "rayhanzulkarnain.dev",
          },
        ],
        destination: "https://www.rayhanzulkarnain.dev/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

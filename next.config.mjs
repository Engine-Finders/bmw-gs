/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [
      {
        // static, content-hashed-by-convention frame sequences never change in place —
        // safe to cache for a year so the animation loop never re-hits the network/edge
        source: "/home/wheel-frames/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.bmwgarage.uk" }],
        destination: "https://bmwgarage.uk/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

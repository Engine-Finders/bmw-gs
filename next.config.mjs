/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    // allow higher re-encode quality than Next's default 75 for the process photos
    qualities: [75, 90, 100],
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
      // guide pages renamed to the addresses used in the content documents: old address keeps working
      { source: "/bmw-failed-rebuild-remediation", destination: "/bmw-failed-rebuild-repair", permanent: true },
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

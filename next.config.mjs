/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "(gdbonffh1rqr0pzj.public.blob.vercel-storage.com)",
      },
    ],
  },
};

export default nextConfig;

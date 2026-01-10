/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['l-cross-002-card-invitation.limgrow.com'],
    unoptimized: true,
  },
}

export default nextConfig

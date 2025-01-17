/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "7052b97e83f4c651c881b251c3efd21bcd458c73044e7b6ac07a04cfd5f1168f"
  }
};

module.exports = nextConfig; 
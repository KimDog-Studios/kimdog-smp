import type { NextConfig } from "next";
import dotenv from 'dotenv';

dotenv.config();

const nextConfig: NextConfig = {
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  env: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },
};

export default nextConfig;
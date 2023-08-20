/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: 'ts-loader',
          options: { transpileOnly: true },
        },
      ],
    });

    return config;
  },
  env: {
    SERVER_BASE_URL: process.env.SERVER_BASE_URL,
    PORT: process.env.PORT,
  },
};

module.exports = nextConfig;

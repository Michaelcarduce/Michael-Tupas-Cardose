// module.exports = {
//   reactStrictMode: true,
//   swcMinify: true,
//   compiler: {
//     removeConsole: process.env.NODE_ENV === "production",
//   },
//   // Add this for better debugging
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback = {
//         ...config.resolve.fallback,
//         fs: false,
//         net: false,
//         tls: false,
//       };
//     }
//     return config;
//   },
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    styledComponents: true, // If you use styled-components
  },
  typescript: {
    ignoreBuildErrors: false, // Set to true temporarily if you have build errors
  },
  eslint: {
    ignoreDuringBuilds: true, // Set to false if you want strict ESLint checks
  },
  webpack: (config, { isServer, webpack }) => {
    // Client-side specific configurations
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        dns: false,
      };
    }

    // Add support for importing SVG as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;

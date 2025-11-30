// next.config.js
/** @type {import("next").NextConfig} */
const nextConfig = {
    output: "export",

    // GitHub Pages 用のパス調整（プロジェクトページの場合必要）
    basePath: "/Devlog",
    assetPrefix: "/Devlog/",

    images: {
        unoptimized: true,
    },
};

export default nextConfig;

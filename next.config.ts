/** @type {import("next").NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
    output: "export",

    basePath: isProd ? "/Devlog" : "",
    assetPrefix: isProd ? "/Devlog/" : "",

    images: {
        unoptimized: true,
    },
};

export default nextConfig;

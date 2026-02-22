import type { Post } from "./types";

export const posts: Post[] = [
    {
        title: "Runo: Rust製GUIフレームワークの開発ログ",
        date: "2026/02/22",
        summary:
            "winit + wgpu + vello を使って、Retained-mode指向の GUI フレームワークを自作する取り組みを紹介します。",
        badges: ["Rust", "wgpu", "vello", "winit", "GUI"],
        readingTime: "6 min read",
        link: "/apps/runo",
    },
    {
        title: "【Tauri】OCR+翻訳オーバーレイアプリを公開しました",
        date: "2025/11/30",
        summary:
            "日本語対応していないゲームなどをプレイする際に、画面上で即座に英→日翻訳できるユーティリティを開発しました。",
        badges: ["PaddleOCR", "LibreTranslate", "Tauri", "Rust", "Python"],
        readingTime: "5 min read",
        link: "/apps/overlay-translator",
    },
];

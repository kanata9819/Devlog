import Link from "next/link";

const posts: { title: string; date: string; summary: string; badges: string[]; readingTime: string; link: string }[] = [
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

const roadmap = [
    {
        title: "整備中",
        status: "In progress",
        detail: "基盤を製作しました",
    },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-linear-to-b from-zinc-950 via-zinc-900 to-black pb-24 pt-10 text-zinc-100">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500">最終更新: 2025/11/30</p>
                <header className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,#1e1e1e,#09090b)] p-10 shadow-2xl shadow-black/50">
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-zinc-400">
                        Devlog
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                        かけだしエンジニアの成長日記
                    </h1>
                    <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
                        プロトタイピングから本番公開までの学びや、ただの感想などをまとめるブログです。<br />
                        作ったアプリの紹介や、技術的なトピックも随時発信していきます。
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4 text-sm font-semibold">
                        <Link
                            href="/apps/overlay-translator"
                            className="rounded-full bg-white px-6 py-3 text-zinc-900 transition hover:bg-zinc-100"
                        >
                            最新の開発中アプリを見る
                        </Link>
                        <a
                            href="#latest"
                            className="rounded-full border border-white/40 px-6 py-3 text-white transition hover:border-white hover:bg-white/10"
                        >
                            最新ログへ
                        </a>
                    </div>
                </header>

                <main className="grid gap-8 lg:grid-cols-[2fr,1fr]">
                    <section className="space-y-8">
                        <div
                            id="latest"
                            className="rounded-3xl border border-white/10 bg-zinc-900/80 p-8 shadow-2xl shadow-black/40 backdrop-blur"
                        >
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm font-semibold tracking-[0.2em] text-zinc-500">
                                        Latest
                                    </p>
                                    <h2 className="text-2xl font-semibold text-white">
                                        最新ログ
                                    </h2>
                                </div>
                                <a
                                    className="text-sm font-medium text-zinc-400 underline underline-offset-4 hover:text-white"
                                    href="#"
                                >
                                    アーカイブをすべて見る
                                </a>
                            </div>
                            <div className="mt-6 space-y-6">
                                {posts.map((post) => (
                                    <Link href={post.link} key={post.title}>
                                        <article
                                            key={post.title}
                                            className="rounded-2xl border border-white/10 bg-zinc-800/70 p-6 shadow-inner shadow-black/50"
                                        >
                                            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-zinc-400">
                                                <span>{post.date}</span>
                                                <span className="hidden h-1 w-1 rounded-full bg-zinc-600 sm:inline-block" />
                                                <span>{post.readingTime}</span>
                                            </div>
                                            <h3 className="mt-4 text-xl font-semibold text-white">
                                                {post.title}
                                            </h3>
                                            <p className="mt-3 text-base leading-relaxed text-zinc-300">
                                                {post.summary}
                                            </p>
                                            <div className="mt-4 flex flex-wrap gap-2 text-xs">
                                                {post.badges.map((badge) => (
                                                    <span
                                                        key={badge}
                                                        className="rounded-full bg-white/10 px-3 py-1 font-medium text-white"
                                                    >
                                                        {badge}
                                                    </span>
                                                ))}
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <section className="rounded-3xl bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white shadow-2xl shadow-black/40">
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
                                    Roadmap
                                </p>
                                <h2 className="mt-2 text-2xl font-semibold">
                                    次に取り組むこと
                                </h2>
                                <ul className="mt-6 space-y-5">
                                    {roadmap.map((item) => (
                                        <li key={item.title} className="rounded-2xl bg-black/20 p-4 backdrop-blur">
                                            <div className="flex items-center justify-between text-sm">
                                                <p className="font-semibold">
                                                    {item.title}
                                                </p>
                                                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                                                    {item.status}
                                                </span>
                                            </div>
                                            <p className="mt-3 text-sm text-white/80">
                                                {item.detail}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    </section>

                    <aside className="space-y-8">
                        <section className="rounded-3xl bg-linear-to-br from-rose-600 to-orange-500 p-8 text-white shadow-2xl shadow-black/40">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
                                Talk
                            </p>
                            <h2 className="mt-3 text-2xl font-semibold">
                                お問い合わせ・感想などはこちらから！
                            </h2>
                            <div className="mt-6 space-y-2 text-sm">
                                <a
                                    href="mailto:taka9819@gmail.com"
                                    className="block rounded-2xl bg-white/10 px-4 py-3 font-semibold hover:bg-white/20"
                                >
                                    hello@example.com
                                </a>
                            </div>
                        </section>
                    </aside>
                </main>
            </div>
        </div>
    );
}

import Link from "next/link";

const highlights: { title: string; description: string }[] = [
    {
        title: "スクリーン上で即時 OCR ＆翻訳",
        description:
            "Rust で画面を矩形キャプチャし、一時ファイルとして保存。Python プロセスにパスを渡して TrOCR / PaddleOCR でテキスト認識し、結果を JSON で受け取ります。",
    },
    {
        title: "ローカルで完結する翻訳フロー",
        description:
            "翻訳は Rust から LibreTranslate(同梱バイナリ) を起動して HTTP で呼び出し。必要に応じて外部の LLM API も選択できるようにして、オンライン / オフラインの両方に対応できる設計を目指しました。",
    },
    {
        title: "軽量なデスクトップユーティリティ",
        description:
            "Tauri + Rust で実装しているため、Electron と比べてメモリ消費が小さく、起動も高速。OCR や翻訳の重い処理はバックエンドに寄せつつ、フロントはシンプルな React UI に絞っています。",
    },
];

const steps: { label: string; detail: string }[] = [
    {
        label: "1. Capture",
        detail:
            "Rust 側で screenshots クレートを使って矩形スクリーンショットを取得し、一時ディレクトリに PNG として保存。保存先のパスを Python プロセスへ送ります。",
    },
    {
        label: "2. OCR",
        detail:
            "Python 側で TrOCR や PaddleOCR を起動し、画像から英語テキストを抽出。認識結果を文字列や JSON として標準出力に書き出し、Rust が 1 行単位で受信します。",
    },
    {
        label: "3. Translate & Overlay",
        detail:
            "抽出テキストを LibreTranslate などの翻訳エンジンに送り、日本語に変換。翻訳結果は Tauri の WebView 上でオーバーレイ表示し、元の画面から目線を動かさずに内容を確認できるようにしています。",
    },
];

const metrics: { label: string; value: string; sub: string }[] = [
    { label: "OCR 精度", value: "90〜96%", sub: "英語 UI や技術ドキュメントでの実測" },
    { label: "翻訳レイテンシ", value: "1.5〜3.0s", sub: "OCR + 翻訳 + 描画までの目安" },
    { label: "リソース消費", value: "低〜中", sub: "Electron 相当構成より体感で軽量" },
];

export default function OverlayTranslatorPage() {
    return (
        <div className="min-h-screen bg-[#050505] pb-20 pt-14 text-zinc-100">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500">
                    最終更新: 2025/11/30
                </p>

                <header className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,#1b1b1f,#050505)] p-10 shadow-2xl shadow-black/60">
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500">
                        OverTrans – Overlay Translator Powered by Tauri
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
                        OCR × 翻訳 × オーバーレイで、
                        <br />
                        英文 UI をその場で読み解く
                    </h1>
                    <p className="mt-6 max-w-4xl text-lg leading-relaxed text-zinc-300">
                        OverTrans は、デスクトップ画面の一部を矩形選択してキャプチャし、その画像を Rust →
                        Python 間のプロセス通信で OCR → 翻訳するデスクトップユーティリティです。<br />
                        取得したテキストはローカルで翻訳され、Tauri のオーバーレイウィンドウ上に原文と同じ位置へ重ねて描画します。
                        海外ツールや英語 UI を触っているときでも、画面を行き来せずに内容を把握できることを目標に設計しています。
                    </p>
                    <p className="mt-6 max-w-4xl text-sm leading-relaxed text-zinc-300">
                        対応OS: Windows<br />
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold">
                        <a
                            className="rounded-full bg-white px-6 py-3 text-zinc-900 transition hover:bg-zinc-600"
                            href="https://github.com/kanata9819/OverTrans"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHubリポジトリを見る
                        </a>
                        <a
                            className="rounded-full bg-white px-6 py-3 text-zinc-900 transition hover:bg-zinc-600"
                            href="https://github.com/kanata9819/OverTrans/releases/tag/v0.1.0"
                            target="_blank"
                            rel="noreferrer"
                        >
                            リリースノートを見る
                        </a>
                        <a
                            className="rounded-full bg-green-400 px-6 py-3 text-zinc-900 transition hover:bg-green-800"
                            href="https://github.com/kanata9819/OverTrans/releases/download/v0.1.0/overtrans_0.1.0_x64_en-US.msi"
                            target="_blank"
                            rel="noreferrer"
                        >
                            最新版をダウンロード
                        </a>
                        <Link
                            href="/"
                            className="rounded-full border border-white/30 px-6 py-3 text-white transition hover:border-white hover:bg-white/10"
                        >
                            ブログトップへ戻る
                        </Link>
                    </div>
                </header>

                <main className="grid gap-8 lg:grid-cols-[3fr,2fr]">
                    <section className="space-y-8">
                        <div className="rounded-3xl border border-white/10 bg-zinc-900/80 p-8 shadow-2xl shadow-black/60 backdrop-blur">
                            <h2 className="text-2xl font-semibold text-white">なぜ作ったか</h2>
                            <p className="mt-4 text-base leading-relaxed text-zinc-300">
                                日本語対応していないゲームを、快適にプレイしたいという友人の希望を叶えるために開発を始めました。
                            </p>
                            <p className="mt-3 text-base leading-relaxed text-zinc-300">
                                特にこだわったのは、
                                <span className="font-semibold">
                                    Rust 側でのスクリーンショット処理と、
                                    Python 側 OCR スクリプトとのやり取りをシンプルな標準入出力だけで実現すること
                                </span>
                                です。重い処理は外部プロセスに逃がしつつ、
                                Tauri のフロントからは「OCR を走らせて結果を受け取る」だけに見えるように分離しています。
                            </p>
                        </div>

                        <section className="rounded-3xl border border-white/10 bg-zinc-900/80 p-8 shadow-2xl shadow-black/60 backdrop-blur">
                            <h2 className="text-2xl font-semibold text-white">ハイライト</h2>
                            <ul className="mt-6 space-y-5">
                                {highlights.map((item) => (
                                    <li
                                        key={item.title}
                                        className="rounded-2xl border border-white/5 bg-zinc-800/70 p-5 shadow-inner shadow-black/40"
                                    >
                                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
                                            Feature
                                        </p>
                                        <p className="mt-2 text-xl font-semibold text-white">
                                            {item.title}
                                        </p>
                                        <p className="mt-2 text-sm text-zinc-300">{item.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="rounded-3xl border border-white/10 bg-zinc-900/80 p-8 shadow-2xl shadow-black/60 backdrop-blur">
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500">
                                    Workflow
                                </p>
                                <h2 className="text-2xl font-semibold text-white">3 ステップの処理フロー</h2>
                            </div>
                            <ol className="mt-6 space-y-6">
                                {steps.map((step) => (
                                    <li
                                        key={step.label}
                                        className="rounded-2xl border border-white/10 bg-zinc-800/70 p-5"
                                    >
                                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                                            {step.label}
                                        </p>
                                        <p className="mt-2 text-base font-semibold text-white">
                                            {step.detail}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </section>
                    </section>

                    <aside className="space-y-8">
                        <section className="rounded-3xl border border-white/10 bg-linear-to-br from-cyan-500 to-blue-600 p-8 text-white shadow-2xl shadow-black/60">
                            <h2 className="text-2xl font-semibold">成果と手触り</h2>
                            <dl className="mt-6 space-y-4">
                                {metrics.map((metric) => (
                                    <div
                                        key={metric.label}
                                        className="rounded-2xl bg-white/10 px-4 py-4 text-center backdrop-blur"
                                    >
                                        <dt className="text-xs uppercase tracking-[0.3em] text-white/80">
                                            {metric.label}
                                        </dt>
                                        <dd className="mt-2 text-3xl font-semibold">{metric.value}</dd>
                                        <p className="mt-1 text-xs text-white/80">{metric.sub}</p>
                                    </div>
                                ))}
                            </dl>
                            <p className="mt-4 text-xs text-white/80 text-left">
                                ※ 数値は手元環境での計測・体感ベースです。OCR モデルや翻訳エンジン、マシンスペックにより変動します。
                            </p>
                        </section>

                        <section className="rounded-3xl border border-white/10 bg-zinc-900/80 p-8 shadow-2xl shadow-black/60 backdrop-blur">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
                                Stack
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold text-white">技術構成</h2>
                            <ul className="mt-5 space-y-3 text-sm text-zinc-300">
                                <li>
                                    <span className="font-semibold text-white">フロント:</span>{" "}
                                    Tauri + React（TypeScript）、オーバーレイ用のシンプルな UI コンポーネント
                                </li>
                                <li>
                                    <span className="font-semibold text-white">バックエンド:</span>{" "}
                                    Rust（スクリーンショット取得、一時ファイル管理、Python プロセス起動、LibreTranslate 起動）
                                </li>
                                <li>
                                    <span className="font-semibold text-white">OCR:</span>{" "}
                                    Python + TrOCR / PaddleOCR、標準入出力で Rust と連携
                                </li>
                                <li>
                                    <span className="font-semibold text-white">翻訳エンジン:</span>{" "}
                                    LibreTranslate ローカルバイナリ（必要に応じて外部 LLM API に差し替え可能な設計）
                                </li>
                                <li>
                                    <span className="font-semibold text-white">設定・データ:</span>{" "}
                                    ローカルファイルでの設定保存（JSON 等）を想定したローカルファースト構成
                                </li>
                            </ul>
                        </section>
                    </aside>
                </main>
            </div>
        </div>
    );
}

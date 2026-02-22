import Link from "next/link";

const highlights: { title: string; description: string }[] = [
    {
        title: "Rust で完結する GUI フレームワーク実験",
        description:
            "Runo は winit + wgpu + vello を土台に、Retained-mode 指向の UI アーキテクチャを Rust だけで組み上げることを目標にしたプロジェクトです。",
    },
    {
        title: "build / update に分かれた明快なライフサイクル",
        description:
            "RunoApplication の build() で UI ツリーを宣言し、update() で UiEvent を処理して状態を更新。描画・入力・状態を分離して、見通しの良い実装を維持しています。",
    },
    {
        title: "Widget と State API を両輪で設計",
        description:
            "button, text_box, combo_box, checkbox, radio_button, slider, div などの Widget API と、set_text / set_value などの State API を揃え、操作しやすい開発体験を目指しています。",
    },
];

const steps: { label: string; detail: string }[] = [
    {
        label: "1. Build UI Tree",
        detail:
            "build() で label や button などを宣言し、vertical / horizontal / div でレイアウトを構築。初期状態の UI を一度に定義します。",
    },
    {
        label: "2. Handle Events",
        detail:
            "update() で UiEvent を取り出し、ButtonClicked や TextBoxChanged などのイベントに応じてアプリ側の状態を更新します。",
    },
    {
        label: "3. Mutate UI State",
        detail:
            "ui.state() から各ウィジェット状態を更新し、必要な部分だけ見た目を変化。イベント駆動でインタラクションを積み上げます。",
    },
];

const metrics: { label: string; value: string; sub: string }[] = [
    { label: "Workspace", value: "2 crates", sub: "runo_core / example" },
    { label: "Widgets", value: "8+", sub: "button, text_box, slider ほか" },
    { label: "Render Stack", value: "wgpu + vello", sub: "GPU レンダリング基盤" },
];

const exampleFlowCode = `fn build(&mut self, ui: &mut Ui<'_>) {
    ui.vertical(|ui| {
        Self::build_title(ui);
        ui.widgets()
            .div()
            .id(MAIN_PANEL_ID)
            .show(|ui| {
                Self::build_name_input(ui);
                Self::build_role_combo(ui);
                Self::build_toggle_button(ui);
            });
    });
}

fn update(&mut self, ui: &mut Ui<'_>) {
    for event in ui.events().drain_events() {
        match event {
            UiEvent::ButtonClicked { id } if id == TOGGLE_BUTTON_ID => {
                self.toggled = !self.toggled;
                ui.state().button().set_text(
                    TOGGLE_BUTTON_ID,
                    if self.toggled { "Toggle: ON" } else { "Toggle: OFF" },
                );
            }
            UiEvent::TextBoxChanged { id, text } if id == INPUT_NAME_ID => {
                self.input_text = text;
            }
            _ => {}
        }
    }
}`;

const exampleFlowNotes: { title: string; detail: string }[] = [
    {
        title: "build() は UI の初期構築専用",
        detail:
            "example では vertical コンテナの中に title と panel(div) を配置し、panel 内で text_box / combo_box / button を宣言しています。",
    },
    {
        title: "update() はイベントドリブンで状態更新",
        detail:
            "ui.events().drain_events() でキューを消費し、ButtonClicked や TextBoxChanged ごとにアプリ状態を更新する流れです。",
    },
    {
        title: "見た目の変更は ui.state() 経由",
        detail:
            "ボタンラベル変更のような描画反映は ui.state().button().set_text(...) で行い、Widget 宣言と更新ロジックを分離しています。",
    },
];

export default function RunoPage() {
    return (
        <div className="min-h-screen overflow-x-hidden bg-[#050505] pb-12 pt-8 text-zinc-100 sm:pb-20 sm:pt-14">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-7 px-4 sm:gap-10 sm:px-6">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500">
                    最終更新: 2026/02/22
                </p>

                <header className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,#1b1b1f,#050505)] p-6 shadow-2xl shadow-black/60 sm:p-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500">
                        Runo – Experimental Rust GUI Framework
                    </p>
                    <h1 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-5xl">
                        Rust ネイティブの GUI を、
                        <br />
                        ゼロから設計する挑戦
                    </h1>
                    <p className="mt-5 max-w-4xl text-base leading-relaxed text-zinc-300 sm:mt-6 sm:text-lg">
                        Runo は、winit + wgpu + vello をベースにした実験的な GUI フレームワークです。<br />
                        宣言的な Widget API と、イベント駆動の State 更新 API を組み合わせて、
                        「小さく作って検証しながら拡張できる GUI 基盤」を目指しています。
                    </p>
                    <div className="mt-7 grid grid-cols-1 gap-3 text-sm font-semibold sm:mt-8 sm:flex sm:flex-wrap sm:gap-4">
                        <a
                            className="rounded-full bg-white px-6 py-3 text-center text-zinc-900 transition hover:bg-zinc-600"
                            href="https://github.com/kanata9819/runo"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHubリポジトリを見る
                        </a>
                        <a
                            className="rounded-full bg-white px-6 py-3 text-center text-zinc-900 transition hover:bg-zinc-600"
                            href="https://github.com/kanata9819/runo/blob/master/README.md"
                            target="_blank"
                            rel="noreferrer"
                        >
                            READMEを見る
                        </a>
                        <Link
                            href="/"
                            className="rounded-full border border-white/30 px-6 py-3 text-center text-white transition hover:border-white hover:bg-white/10"
                        >
                            ブログトップへ戻る
                        </Link>
                    </div>
                </header>

                <main className="grid gap-6 sm:gap-8 lg:grid-cols-[3fr,2fr]">
                    <section className="min-w-0 space-y-6 sm:space-y-8">
                        <div className="min-w-0 rounded-3xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl shadow-black/60 backdrop-blur sm:p-8">
                            <h2 className="text-2xl font-semibold text-white">なぜ作ったか</h2>
                            <p className="mt-4 wrap-break-word text-base leading-relaxed text-zinc-300">
                                既存 GUI フレームワークを使うだけでなく、描画・入力・状態管理の責務分離を
                                自分の手で理解したいという目的で、学習兼プロトタイピングとして始めました。
                            </p>
                            <p className="mt-3 wrap-break-word text-base leading-relaxed text-zinc-300">
                                特に重視しているのは、
                                <span className="font-semibold">
                                    「build() で UI を宣言し、update() でイベントに反応する」流れをシンプルに保つこと
                                </span>
                                です。API を増やすときもこの軸を崩さない設計を意識しています。
                            </p>
                        </div>

                        <section className="rounded-3xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl shadow-black/60 backdrop-blur sm:p-8">
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

                        <section className="rounded-3xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl shadow-black/60 backdrop-blur sm:p-8">
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500">
                                    Workflow
                                </p>
                                <h2 className="text-2xl font-semibold text-white">Runo の開発フロー</h2>
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

                        <section className="rounded-3xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl shadow-black/60 backdrop-blur sm:p-8">
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500">
                                    Example Flow
                                </p>
                                <h2 className="text-2xl font-semibold text-white">
                                    example コードで見る処理の流れ
                                </h2>
                            </div>
                            <pre className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-4 text-[11px] leading-relaxed text-zinc-200 sm:p-5 sm:text-xs">
                                <code>{exampleFlowCode}</code>
                            </pre>
                            <ul className="mt-6 space-y-4">
                                {exampleFlowNotes.map((note) => (
                                    <li
                                        key={note.title}
                                        className="rounded-2xl border border-white/10 bg-zinc-800/60 p-4"
                                    >
                                        <p className="text-sm font-semibold text-white">{note.title}</p>
                                        <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                                            {note.detail}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </section>

                    <aside className="min-w-0 space-y-6 sm:space-y-8">
                        <section className="rounded-3xl border border-white/10 bg-linear-to-br from-cyan-500 to-blue-600 p-6 text-white shadow-2xl shadow-black/60 sm:p-8">
                            <h2 className="text-2xl font-semibold">現在の到達点</h2>
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
                        </section>

                        <section className="rounded-3xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl shadow-black/60 backdrop-blur sm:p-8">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
                                Stack
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold text-white">技術構成</h2>
                            <ul className="mt-5 space-y-3 text-sm text-zinc-300">
                                <li>
                                    <span className="font-semibold text-white">描画基盤:</span>{" "}
                                    wgpu + vello
                                </li>
                                <li>
                                    <span className="font-semibold text-white">ウィンドウ/イベント:</span>{" "}
                                    winit
                                </li>
                                <li>
                                    <span className="font-semibold text-white">コア API:</span>{" "}
                                    RunoApplication / Ui / UiEvent / UiState
                                </li>
                                <li>
                                    <span className="font-semibold text-white">Widget:</span>{" "}
                                    button, label, text_box, combo_box, checkbox, radio_button, slider, div
                                </li>
                                <li>
                                    <span className="font-semibold text-white">検証アプリ:</span>{" "}
                                    crates/example で動作確認
                                </li>
                            </ul>
                        </section>
                    </aside>
                </main>
            </div>
        </div>
    );
}

import { cp, mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outDir = path.join(rootDir, "out");
const docsDir = path.join(rootDir, "docs");

async function exists(targetPath) {
    try {
        await stat(targetPath);
        return true;
    } catch {
        return false;
    }
}

async function cleanDirectory(dirPath) {
    const entries = await readdir(dirPath);
    await Promise.all(
        entries.map((entry) =>
            rm(path.join(dirPath, entry), { recursive: true, force: true }),
        ),
    );
}

async function copyOutToDocs() {
    if (!(await exists(outDir))) {
        throw new Error("`out/` が見つかりません。先に `npm run build` を実行してください。");
    }

    await mkdir(docsDir, { recursive: true });
    await cleanDirectory(docsDir);

    const outEntries = await readdir(outDir);
    await Promise.all(
        outEntries.map((entry) =>
            cp(path.join(outDir, entry), path.join(docsDir, entry), {
                recursive: true,
                force: true,
            }),
        ),
    );

    await writeFile(path.join(docsDir, ".nojekyll"), "");
}

copyOutToDocs()
    .then(() => {
        console.log("Synced: out/ -> docs/");
    })
    .catch((error) => {
        console.error(error.message);
        process.exitCode = 1;
    });

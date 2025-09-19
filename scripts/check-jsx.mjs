import { readFileSync } from "node:fs";
import { globby } from "globby";
import { parse } from "@babel/parser";

const files = await globby(["src/**/*.{jsx,js}"], { gitignore: true });

let failed = false;
for (const f of files) {
  const code = readFileSync(f, "utf8");
  try {
    parse(code, {
      sourceType: "module",
      allowReturnOutsideFunction: true,
      plugins: [
        "jsx",
        "classProperties",
        "classPrivateProperties",
        "classPrivateMethods",
        "importMeta",
        "topLevelAwait",
        // add "typescript" if you use TS
      ],
    });
  } catch (e) {
    failed = true;
    const loc = e.loc ? `${e.loc.line}:${e.loc.column}` : "?";
    console.error(`❌ ${f}:${loc}  ${e.message}`);
  }
}
if (!failed) {
  console.log("✅ All JS/JSX parsed cleanly (no syntax issues found).");
  process.exit(0);
} else {
  console.error("\n💥 Syntax errors detected above. Fix those first.");
  process.exit(1);
}

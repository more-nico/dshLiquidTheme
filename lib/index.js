import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const cssPath = join(dirname(fileURLToPath(import.meta.url)), "styles", "liquid-glass.css");

function injectBoot(html, css) {
  const snippet = `<style data-plugin="dsh-liquid-glass" data-plugin-css="dsh-liquid-glass/liquid-glass.css">${css}</style><script>(()=>{document.documentElement.setAttribute("data-liquid-glass","");const apply=()=>{if(document.body)document.body.setAttribute("data-liquid-glass","")};apply();document.addEventListener("DOMContentLoaded",apply)})()<\/script>`;
  const head = /<\/head>/i.exec(html);
  if (head === null) return `${snippet}${html}`;
  return `${html.slice(0, head.index)}${snippet}${html.slice(head.index)}`;
}

/** Host half: inject wallpaper CSS before first paint so the default white shell never flashes. */
export function apply(ctx) {
  ctx.inject(["webServer"], (httpCtx) => {
    let css = "";
    try {
      css = readFileSync(cssPath, "utf8");
    } catch (error) {
      ctx.emit?.("logger/error", `dsh-liquid-glass: failed to read stylesheet: ${error}`);
      return;
    }
    httpCtx.effect(
      () => httpCtx.webServer.tapIndex((html) => injectBoot(html, css)),
      "liquid-glass: index stylesheet",
    );
  });
}

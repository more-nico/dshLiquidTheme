import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const cssPath = join(dir, "styles", "liquid-glass.css");
const svgPath = join(dir, "styles", "glass-distortion.svg");

function injectBoot(html, css, svg) {
  const snippet = `<style data-plugin="dsh-liquid-glass" data-plugin-css="dsh-liquid-glass/liquid-glass.css">${css}</style><script>(()=>{document.documentElement.setAttribute("data-liquid-glass","");const apply=()=>{if(document.body)document.body.setAttribute("data-liquid-glass","")};apply();document.addEventListener("DOMContentLoaded",apply)})()<\/script>`;
  const head = /<\/head>/i.exec(html);
  const withCss = head === null ? `${snippet}${html}` : `${html.slice(0, head.index)}${snippet}${html.slice(head.index)}`;
  const body = /<body(?:\s[^>]*)?>/i.exec(withCss);
  if (body === null) return `${withCss}${svg}`;
  const at = body.index + body[0].length;
  return `${withCss.slice(0, at)}${svg}${withCss.slice(at)}`;
}

/** Host half: inject wallpaper CSS before first paint so the default white shell never flashes. */
export function apply(ctx) {
  ctx.inject(["webServer"], (httpCtx) => {
    httpCtx.effect(
      () => httpCtx.webServer.tapIndex((html) => {
        const css = readFileSync(cssPath, "utf8");
        const svg = readFileSync(svgPath, "utf8");
        return injectBoot(html, css, svg);
      }),
      "liquid-glass: index stylesheet",
    );
  });
}

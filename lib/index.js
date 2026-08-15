import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const cssPath = join(dir, "styles", "liquid-glass.css");
const svgPath = join(dir, "styles", "glass-distortion.svg");
const wallPath = join(dir, "styles", "wallpaper.jpg");

const BOOT = `<script>(()=>{try{var k="dsh-liquid-theme";var cfg={};try{cfg=JSON.parse(localStorage.getItem(k)||localStorage.getItem("dsh-liquid-glass")||"{}")||{}}catch(e){}window.__DSH_LG__=cfg;if(cfg.enabled===false)return;document.documentElement.setAttribute("data-liquid-glass","");var apply=function(){if(!document.body)return;document.body.setAttribute("data-liquid-glass","");var a=typeof cfg.opacity==="number"?Math.max(0,Math.min(1,cfg.opacity/100)):0.2;document.body.style.setProperty("--lg-alpha",String(a));var b=typeof cfg.blur==="number"?Math.max(0,Math.min(40,cfg.blur)):5;document.body.style.setProperty("--lg-blur",b+"px");var sat=typeof cfg.sat==="number"?Math.max(50,Math.min(200,cfg.sat)):110;document.body.style.setProperty("--lg-sat",sat+"%");var ct=typeof cfg.contrast==="number"?Math.max(80,Math.min(140,cfg.contrast)):100;document.body.style.setProperty("--lg-contrast",String(ct/100));var br=typeof cfg.bright==="number"?Math.max(80,Math.min(140,cfg.bright)):120;document.body.style.setProperty("--lg-bright",String(br/100));var s=typeof cfg.scrim==="number"?Math.max(0,Math.min(1,cfg.scrim/100)):0.25;document.body.style.setProperty("--lg-scrim",String(s));var sb=typeof cfg.scrimBlur==="number"?Math.max(0,Math.min(40,cfg.scrimBlur)):5;document.body.style.setProperty("--lg-scrim-blur",sb+"px");if(s>0||sb>0)document.body.setAttribute("data-lg-scrim","");if(cfg.wallpaper){var w=String(cfg.wallpaper);if(/^color:/i.test(w)||/^#[0-9a-fA-F]{3,8}$/.test(w)){var hex=w.replace(/^color:/i,"");document.body.setAttribute("data-lg-wallpaper","");document.body.setAttribute("data-lg-bg","color");document.body.style.setProperty("--lg-bg-color",hex);document.body.style.setProperty("--lg-wallpaper","none")}else{document.body.setAttribute("data-lg-wallpaper","");document.body.style.setProperty("--lg-wallpaper","url("+JSON.stringify(w)+")")}}};apply();document.addEventListener("DOMContentLoaded",apply)}catch(e){}})()<\/script>`;

function wallpaperStyle() {
  try {
    const data = readFileSync(wallPath).toString("base64");
    return `<style data-plugin="dsh-liquid-theme-wallpaper">body[data-liquid-glass]{--lg-default-wallpaper:url("data:image/jpeg;base64,${data}")}</style>`;
  } catch {
    return "";
  }
}

function injectBoot(html, css, svg) {
  const snippet = `<style data-plugin="dsh-liquid-theme" data-plugin-css="dsh-liquid-theme/liquid-glass.css">${css}</style>${wallpaperStyle()}${BOOT}`;
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

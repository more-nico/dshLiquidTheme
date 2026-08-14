window.__ModuleLoader__.load({
  id: "dsh-liquid-glass",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;

    const SOURCE = "dsh-liquid-glass";
    const ATTR = "data-liquid-glass";
    const STYLE_ID = "dsh-liquid-glass/liquid-glass.css";

    function pair(light, dark) {
      return { light, dark };
    }

    const TOKENS = {
      "--dsw-alias-bg-base": pair("rgba(255,255,255,0.06)", "rgba(8,10,16,0.10)"),
      "--dsw-alias-bg-layer-1": pair("rgba(255,255,255,0.22)", "rgba(22,24,32,0.28)"),
      "--dsw-alias-bg-layer-2": pair("rgba(255,255,255,0.82)", "rgba(28,30,40,0.84)"),
      "--dsw-alias-bg-layer-3": pair("rgba(255,255,255,0.58)", "rgba(36,38,50,0.66)"),
      "--dsw-alias-bg-overlay": pair("rgba(255,255,255,0.62)", "rgba(30,32,42,0.70)"),
      "--dsw-alias-bg-module-platform": pair("rgba(255,255,255,0.22)", "rgba(24,26,36,0.30)"),
      "--dsw-alias-bg-multi-select": pair("rgba(255,255,255,0.36)", "rgba(24,26,36,0.44)"),
      "--dsw-alias-bg-mask-1": pair("rgba(20,28,45,0.22)", "rgba(0,0,0,0.46)"),
      "--dsw-alias-bg-mask-2": pair("rgba(20,28,45,0.12)", "rgba(0,0,0,0.24)"),
      "--dsw-alias-bg-mask-3": pair("rgba(20,28,45,0.38)", "rgba(0,0,0,0.52)"),
      "--dsw-alias-bg-mask-drop": pair("rgba(255,255,255,0.42)", "rgba(12,14,20,0.55)"),
      "--dsw-alias-bg-skeleton": pair("rgba(20,28,45,0.06)", "rgba(255,255,255,0.08)"),
      "--dsw-alias-border-l1": pair("rgba(255,255,255,0.38)", "rgba(255,255,255,0.08)"),
      "--dsw-alias-border-l2": pair("rgba(255,255,255,0.50)", "rgba(255,255,255,0.14)"),
      "--dsw-alias-border-l2-darkmode-thin": pair("rgba(20,28,45,0.08)", "rgba(255,255,255,0.08)"),
      "--dsw-alias-border-l3": pair("rgba(20,28,45,0.12)", "rgba(255,255,255,0.18)"),
      "--dsw-alias-border-l4": pair("rgba(20,28,45,0.16)", "rgba(255,255,255,0.22)"),
      "--dsw-alias-border-inverted": pair("rgba(255,255,255,0.55)", "rgba(255,255,255,0.12)"),
      "--dsw-alias-border-inverted2": pair("rgba(255,255,255,0.35)", "rgba(255,255,255,0.08)"),
      "--dsw-alias-button-elevated-fill": pair("rgba(255,255,255,0.58)", "rgba(40,42,54,0.55)"),
      "--dsw-alias-button-floating-fill": pair("rgba(255,255,255,0.62)", "rgba(36,38,50,0.58)"),
      "--dsw-alias-button-floating-hover": pair("rgba(255,255,255,0.78)", "rgba(50,52,66,0.7)"),
      "--dsw-alias-button-primary-fill": pair("rgba(22,26,36,0.78)", "rgba(245,247,252,0.88)"),
      "--dsw-alias-button-primary-hover": pair("rgba(22,26,36,0.90)", "rgba(255,255,255,0.96)"),
      "--dsw-alias-button-primary-dimmed": pair("rgba(255,255,255,0.42)", "rgba(40,42,54,0.5)"),
      "--dsw-alias-button-ghost-active-fill": pair("rgba(255,255,255,0.55)", "rgba(255,255,255,0.12)"),
      "--dsw-alias-button-ghost-active-hover": pair("rgba(255,255,255,0.68)", "rgba(255,255,255,0.16)"),
      "--dsw-alias-button-ghost-active-border": pair("rgba(20,28,45,0.16)", "rgba(255,255,255,0.22)"),
      "--dsw-alias-button-tool-bar-fill": pair("rgba(84,85,87,0.38)", "rgba(84,85,87,0.45)"),
      "--dsw-alias-button-tool-bar-hover": pair("rgba(84,85,87,0.5)", "rgba(84,85,87,0.58)"),
      "--dsw-alias-interactive-bg-hover": pair("rgba(255,255,255,0.36)", "rgba(255,255,255,0.08)"),
      "--dsw-alias-interactive-bg-active": pair("rgba(255,255,255,0.48)", "rgba(255,255,255,0.14)"),
      "--dsw-alias-interactive-bg-hover-solid": pair("rgba(255,255,255,0.58)", "rgba(40,42,54,0.62)"),
      "--dsw-alias-interactive-bg-hover-accent": pair("rgba(80,130,230,0.16)", "rgba(255,255,255,0.18)"),
      "--dsw-alias-markdown-code-block": pair("rgba(255,255,255,0.78)", "rgba(14,16,22,0.82)"),
      "--dsw-alias-markdown-code-block-banner": pair("rgba(255,255,255,0.70)", "rgba(20,22,30,0.78)"),
      "--dsw-alias-markdown-inline-code": pair("rgba(255,255,255,0.62)", "rgba(255,255,255,0.08)"),
      "--dsw-alias-markdown-placeholder": pair("rgba(255,255,255,0.36)", "rgba(20,22,30,0.5)"),
      "--dsw-alias-markdown-tag": pair("rgba(255,255,255,0.5)", "rgba(255,255,255,0.08)"),
      "--dsw-alias-markdown-citation": pair("rgba(255,255,255,0.5)", "rgba(255,255,255,0.08)"),
      "--dsw-alias-scrollbar-bg-l1": pair("rgba(20,28,45,0.18)", "rgba(255,255,255,0.16)"),
      "--dsw-alias-scrollbar-bg-l2": pair("rgba(20,28,45,0.22)", "rgba(255,255,255,0.2)"),
      "--dsw-alias-scrollbar-hover-l1": pair("rgba(20,28,45,0.3)", "rgba(255,255,255,0.28)"),
      "--dsw-alias-scrollbar-hover-l2": pair("rgba(20,28,45,0.34)", "rgba(255,255,255,0.32)"),
      "--dsw-alias-tooltip-bg": pair("rgba(32,36,46,0.82)", "rgba(36,38,48,0.82)"),
      "--dsw-alias-toast-bg": pair("rgba(32,36,46,0.78)", "rgba(40,42,54,0.78)"),
      "--dsw-specific-sidebar-fill": pair("transparent", "transparent"),
      "--dsw-specific-sidebar-nav-item-hover": pair("rgba(255,255,255,0.36)", "rgba(255,255,255,0.08)"),
      "--dsw-specific-sidebar-nav-item-active": pair("rgba(255,255,255,0.48)", "rgba(255,255,255,0.12)"),
      "--dsw-specific-sidebar-nav-item-active-accent": pair("rgba(180,210,255,0.40)", "rgba(80,120,220,0.28)"),
      "--dsw-specific-input-major": pair("rgba(255,255,255,0.72)", "rgba(22,24,32,0.68)"),
      "--dsw-specific-bubble": pair("rgba(255,255,255,0.36)", "rgba(28,30,40,0.38)"),
      "--dsw-specific-bubble-highlight": pair("rgba(190,216,255,0.48)", "rgba(60,90,180,0.32)"),
      "--dsw-specific-menu": pair("rgba(255,255,255,0.32)", "rgba(28,30,40,0.40)"),
      "--dsw-specific-selector": pair("rgba(255,255,255,0.42)", "rgba(28,30,40,0.5)"),
      "--dsw-specific-tip": pair("rgba(255,255,255,0.42)", "rgba(28,30,40,0.5)"),
      "--dsw-specific-login-input": pair("rgba(255,255,255,0.5)", "rgba(16,18,24,0.55)"),
    };

    const REDUCED_TOKENS = {
      "--dsw-alias-bg-base": pair("#f4f6fa", "#101218"),
      "--dsw-alias-bg-layer-1": pair("#ffffff", "#1c1e26"),
      "--dsw-alias-bg-layer-2": pair("#ffffff", "#22242e"),
      "--dsw-alias-bg-layer-3": pair("#f7f8fb", "#2a2c38"),
      "--dsw-specific-sidebar-fill": pair("#eef2f8", "#14161c"),
      "--dsw-specific-input-major": pair("#ffffff", "#1c1e26"),
    };

    function reducedTransparency() {
      return typeof matchMedia !== "undefined"
        && matchMedia("(prefers-reduced-transparency: reduce)").matches;
    }

    function activeTokens() {
      if (!reducedTransparency()) return TOKENS;
      return { ...TOKENS, ...REDUCED_TOKENS };
    }

    function mark(on) {
      const root = document.documentElement;
      const body = document.body;
      if (on) {
        root.setAttribute(ATTR, "");
        if (body) body.setAttribute(ATTR, "");
      } else {
        root.removeAttribute(ATTR);
        if (body) body.removeAttribute(ATTR);
      }
    }

    const inject = ["theme"];

    function mountLayers(el, kind) {
      if (!el) return;
      el.setAttribute("data-lg-host", kind);
      if (el.querySelector(":scope > .dsh-lg-effect")) return;
      const effect = document.createElement("div");
      effect.className = "dsh-lg-effect";
      effect.setAttribute("aria-hidden", "true");
      const shine = document.createElement("div");
      shine.className = "dsh-lg-shine";
      shine.setAttribute("aria-hidden", "true");
      el.insertBefore(shine, el.firstChild);
      el.insertBefore(effect, el.firstChild);
      if (kind === "sidebar") {
        const kids = [...el.children].filter((node) => {
          const cls = node.className || "";
          return cls.indexOf("dsh-lg-effect") < 0 && cls.indexOf("dsh-lg-shine") < 0;
        });
        kids.slice(0, -1).forEach((node) => {
          node.style.position = "relative";
          node.style.zIndex = "1";
        });
      }
    }

    function findComposerHost() {
      const input = document.querySelector("#root textarea, #root [contenteditable='true']");
      if (input === null) return null;
      let el = input.parentElement;
      for (let i = 0; i < 10 && el; i += 1) {
        const box = el.getBoundingClientRect();
        if (box.width >= 360 && box.height >= 72 && box.height <= 320) return el;
        el = el.parentElement;
      }
      return null;
    }

    function findHeaderHost() {
      const slot = document.querySelector('[data-slot="conversation.session.header"]');
      const bar = slot && slot.firstElementChild;
      if (!bar) return null;
      return bar.getBoundingClientRect().height >= 24 ? bar : null;
    }

    function stripSidebarOverlays() {
      const col = document.querySelector("#root > [data-slot] > div > div:first-child");
      if (!col) return;
      for (const node of col.querySelectorAll(".dsh-lg-effect, .dsh-lg-shine")) node.remove();
      const inner = col.querySelector('[data-slot="sidebar"] > *');
      if (inner) {
        inner.removeAttribute("data-lg-host");
        for (const child of inner.children) {
          child.style.removeProperty("z-index");
          child.style.removeProperty("position");
        }
      }
    }

    function decorateChrome() {
      stripSidebarOverlays();
      mountLayers(findHeaderHost(), "header");
      mountLayers(findComposerHost(), "composer");
    }

    function apply(ctx) {
      mark(true);
      ctx.effect(() => {
        return () => mark(false);
      }, "liquid-glass: body attribute");

      ctx.effect(() => {
        let timer = 0;
        const schedule = () => {
          if (timer) return;
          timer = window.setTimeout(() => {
            timer = 0;
            decorateChrome();
          }, 48);
        };
        decorateChrome();
        const root = document.getElementById("root");
        const observer = new MutationObserver(schedule);
        if (root) observer.observe(root, { childList: true, subtree: true });
        return () => {
          if (timer) window.clearTimeout(timer);
          observer.disconnect();
          for (const node of document.querySelectorAll(".dsh-lg-effect, .dsh-lg-shine")) node.remove();
          for (const node of document.querySelectorAll("[data-lg-host]")) node.removeAttribute("data-lg-host");
        };
      }, "liquid-glass: chrome layers");

      const applyLayer = () => ctx.theme.overrideTokens(SOURCE, activeTokens());
      ctx.effect(applyLayer, "liquid-glass: token overrides");

      if (typeof matchMedia !== "undefined") {
        const media = matchMedia("(prefers-reduced-transparency: reduce)");
        const onChange = () => applyLayer();
        ctx.effect(() => {
          media.addEventListener("change", onChange);
          return () => media.removeEventListener("change", onChange);
        }, "liquid-glass: reduced-transparency listener");
      }
    }

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  },
});

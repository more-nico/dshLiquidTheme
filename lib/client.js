window.__ModuleLoader__.load({
  id: "dsh-liquid-glass",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;

    const SOURCE = "dsh-liquid-glass";
    const ATTR = "data-liquid-glass";
    const WALL_ATTR = "data-lg-wallpaper";
    const STORAGE_KEY = "dsh-liquid-glass";
    const MAX_WALLPAPER_CHARS = 1800000;

    const DEFAULTS = {
      enabled: true,
      opacity: 100,
      blur: 20,
      wallpaper: "",
    };

    function pair(light, dark) {
      return { light, dark };
    }

    const TOKENS = {
      "--dsw-alias-bg-base": pair("transparent", "transparent"),
      "--dsw-alias-bg-layer-1": pair("rgba(255,255,255,0.08)", "rgba(22,24,32,0.16)"),
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
      "--dsw-alias-button-floating-fill": pair("rgba(255,255,255,0.72)", "rgba(36,38,50,0.72)"),
      "--dsw-alias-button-floating-hover": pair("rgba(255,255,255,0.84)", "rgba(50,52,66,0.8)"),
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
      "--dsw-specific-menu": pair("rgba(255,255,255,0.64)", "rgba(28,30,40,0.74)"),
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

    function clamp(n, min, max, fallback) {
      const v = Number(n);
      if (!Number.isFinite(v)) return fallback;
      return Math.min(max, Math.max(min, v));
    }

    function readPrefs() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { ...DEFAULTS };
        const parsed = JSON.parse(raw);
        return {
          enabled: parsed.enabled !== false,
          opacity: clamp(parsed.opacity, 0, 100, 100),
          blur: clamp(parsed.blur, 0, 40, 20),
          wallpaper: typeof parsed.wallpaper === "string" ? parsed.wallpaper : "",
        };
      } catch {
        return { ...DEFAULTS };
      }
    }

    function writePrefs(prefs) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      window.__DSH_LG__ = prefs;
    }

    function createStore() {
      let value = readPrefs();
      window.__DSH_LG__ = value;
      const listeners = new Set();
      return {
        get() {
          return value;
        },
        set(patch) {
          value = { ...value, ...patch };
          writePrefs(value);
          for (const fn of listeners) fn(value);
        },
        subscribe(fn) {
          listeners.add(fn);
          return () => listeners.delete(fn);
        },
      };
    }

    function scaleRgba(value, mul) {
      if (mul >= 0.999 || typeof value !== "string") return value;
      return value.replace(
        /rgba\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/g,
        (_, r, g, b, a) => {
          const next = Math.max(0, Math.min(1, parseFloat(a) * mul));
          return `rgba(${r},${g},${b},${+next.toFixed(4)})`;
        },
      );
    }

    function scaleTokenMap(map, mul) {
      const out = {};
      for (const [key, modes] of Object.entries(map)) {
        out[key] = {
          light: scaleRgba(modes.light, mul),
          dark: scaleRgba(modes.dark, mul),
        };
      }
      return out;
    }

    function activeTokens(opacity) {
      const mul = clamp(opacity, 0, 100, 100) / 100;
      const base = reducedTransparency() ? { ...TOKENS, ...REDUCED_TOKENS } : TOKENS;
      return scaleTokenMap(base, mul);
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

    function applyWallpaper(url) {
      const body = document.body;
      if (!body) return;
      if (url) {
        body.setAttribute(WALL_ATTR, "");
        body.style.setProperty("--lg-wallpaper", `url(${JSON.stringify(url)})`);
      } else {
        body.removeAttribute(WALL_ATTR);
        body.style.removeProperty("--lg-wallpaper");
      }
    }

    function applyAlpha(opacity) {
      const body = document.body;
      if (!body) return;
      body.style.setProperty("--lg-alpha", String(clamp(opacity, 0, 100, 100) / 100));
    }

    function applyBlur(blur) {
      const body = document.body;
      if (!body) return;
      body.style.setProperty("--lg-blur", `${clamp(blur, 0, 40, 20)}px`);
    }

    function stripChrome() {
      for (const node of document.querySelectorAll(".dsh-lg-effect, .dsh-lg-shine")) node.remove();
      for (const node of document.querySelectorAll("[data-lg-host]")) node.removeAttribute("data-lg-host");
    }

    function mountLayers(el, kind) {
      if (!el) return;
      el.setAttribute("data-lg-host", kind);
      if (el.querySelector(":scope > .dsh-lg-effect")) return;
      const effect = document.createElement("div");
      effect.className = "dsh-lg-effect";
      effect.setAttribute("aria-hidden", "true");
      el.insertBefore(effect, el.firstChild);
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

    function findComposerSeat(from) {
      let el = from;
      for (let i = 0; i < 10 && el; i += 1) {
        const pos = getComputedStyle(el).position;
        if (pos === "sticky" || pos === "fixed") return el;
        el = el.parentElement;
      }
      return null;
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

    function markActiveTabs() {
      const list = document.querySelector('[data-slot="conversation.session.header"] [role="tablist"]');
      if (!list) return;
      for (const tab of list.querySelectorAll("button")) {
        const on = tab.getAttribute("aria-selected") === "true"
          || /tabActive/i.test(tab.className || "");
        if (on) tab.setAttribute("data-lg-tab", "active");
        else tab.removeAttribute("data-lg-tab");
      }
    }

    function findTracesHost() {
      const view = document.querySelector('[data-slot="conversation.view"] > *');
      if (!view) return null;
      const text = (view.innerText || "").slice(0, 120);
      if (text.includes("Duration") || text.includes("Turns") || text.includes("Calls")) return view;
      return null;
    }

    function findJumpButton() {
      return document.querySelector(
        'button[aria-label="回到底部"], button[aria-label="Back to bottom"]'
      );
    }

    function findContextPanel() {
      const trigger = document.querySelector(
        'button[aria-label*="上下文"], button[aria-label*="context used" i], button[aria-label*="of context used"]'
      );
      const root = trigger && trigger.parentElement;
      const scope = root || document;
      for (const el of scope.querySelectorAll("*")) {
        const pos = getComputedStyle(el).position;
        if (pos !== "absolute" && pos !== "fixed") continue;
        const box = el.getBoundingClientRect();
        if (box.height >= 80 && box.width >= 160 && box.width <= 400) return el;
      }
      return null;
    }

    function decorateChrome() {
      stripSidebarOverlays();
      mountLayers(findHeaderHost(), "header");
      const composer = findComposerHost();
      mountLayers(composer, "composer");
      const seat = findComposerSeat(composer);
      if (seat && seat !== composer) mountLayers(seat, "seat");
      markActiveTabs();
      const traces = findTracesHost();
      if (traces) {
        traces.setAttribute("data-lg-host", "traces");
        syncTracesClearance(traces);
      }
      const jump = findJumpButton();
      if (jump) jump.setAttribute("data-lg-host", "jump");
      const panel = findContextPanel();
      if (panel) {
        panel.setAttribute("data-lg-host", "float");
        for (const node of panel.querySelectorAll(":scope > .dsh-lg-effect, :scope > .dsh-lg-shine")) {
          node.remove();
        }
      }
    }

    function syncTracesClearance(traces) {
      traces.style.removeProperty("padding-top");
      const header = findHeaderHost();
      const viewArea = document.querySelector('[data-slot="conversation.session"] > *');
      if (!header || !viewArea) {
        traces.style.removeProperty("--lg-traces-shift");
        return;
      }
      const contentTop = viewArea.getBoundingClientRect().top
        + (parseFloat(getComputedStyle(viewArea).paddingTop) || 0);
      const need = Math.max(0, Math.round(header.getBoundingClientRect().bottom + 12 - contentTop));
      traces.style.setProperty("--lg-traces-shift", need + "px");
    }

    function startChrome() {
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
        stripChrome();
      };
    }

    const ZH = {
      lead: "这些选项只改 Liquid Glass 外观，不影响官方浅色 / 深色，也不卸载插件。",
      enableTitle: "启用 Liquid Glass",
      enableHint: "关闭后恢复官方皮肤。本页仍在，随时可以再打开。",
      opacityTitle: "玻璃透明度",
      opacityHint: "同时调节侧栏、顶栏、输入条、菜单、浮层等所有霜玻璃。",
      blurTitle: "玻璃模糊",
      blurHint: "backdrop 模糊半径，作用在所有霜玻璃表面。0 为不模糊。",
      wallTitle: "背景图",
      wallHint: "默认是内置渐变。也可以填图片地址，或从本地选一张图。",
      apply: "应用",
      choose: "选择图片",
      reset: "恢复默认",
      urlPh: "https://… 或 data:image/…",
      tooBig: "图片太大，请换一张小于约 1.2MB 的图，或改用图片地址。",
      badUrl: "请填写 http(s) 或 data:image 地址。",
    };

    const EN = {
      lead: "These options only change the Liquid Glass look. Official light/dark still works, and the plugin stays installed.",
      enableTitle: "Enable Liquid Glass",
      enableHint: "Turn off to restore the official skin. This page stays so you can turn it back on.",
      opacityTitle: "Glass opacity",
      opacityHint: "Applies to the sidebar, header, composer, menus, and other frost surfaces.",
      blurTitle: "Glass blur",
      blurHint: "Backdrop blur radius on every frost surface. 0 turns blur off.",
      wallTitle: "Wallpaper",
      wallHint: "The built-in gradient is the default. Paste an image URL or pick a local file.",
      apply: "Apply",
      choose: "Choose image",
      reset: "Reset",
      urlPh: "https://… or data:image/…",
      tooBig: "That image is too large. Use one under about 1.2MB, or paste a URL.",
      badUrl: "Use an http(s) or data:image URL.",
    };

    function copy() {
      const lang = `${document.documentElement.lang || ""} ${navigator.language || ""}`.toLowerCase();
      return lang.includes("zh") ? ZH : EN;
    }

    function isWallpaperUrl(value) {
      return /^(https?:|data:image\/)/i.test(value);
    }

    function SettingsPanel(store, React) {
      return function LiquidGlassSettings() {
        const t = copy();
        const [prefs, setPrefs] = React.useState(() => store.get());
        const [draft, setDraft] = React.useState(() => store.get().wallpaper);
        const [error, setError] = React.useState("");
        const fileRef = React.useRef(null);

        React.useEffect(() => store.subscribe((next) => {
          setPrefs(next);
          setDraft(next.wallpaper.startsWith("data:") ? "" : next.wallpaper);
        }), []);

        const setEnabled = () => {
          store.set({ enabled: !prefs.enabled });
        };
        const setOpacity = (event) => {
          store.set({ opacity: clamp(event.target.value, 0, 100, 100) });
        };
        const setBlur = (event) => {
          store.set({ blur: clamp(event.target.value, 0, 40, 20) });
        };
        const applyUrl = () => {
          const url = (draft || "").trim();
          if (!url) {
            if (prefs.wallpaper.startsWith("data:")) {
              setError("");
              return;
            }
            store.set({ wallpaper: "" });
            setError("");
            return;
          }
          if (!isWallpaperUrl(url)) {
            setError(t.badUrl);
            return;
          }
          store.set({ wallpaper: url });
          setError("");
        };
        const onFile = (event) => {
          const file = event.target.files && event.target.files[0];
          event.target.value = "";
          if (!file) return;
          if (file.size > MAX_WALLPAPER_CHARS * 0.75) {
            setError(t.tooBig);
            return;
          }
          const reader = new FileReader();
          reader.onload = () => {
            const data = typeof reader.result === "string" ? reader.result : "";
            if (!data || data.length > MAX_WALLPAPER_CHARS) {
              setError(t.tooBig);
              return;
            }
            store.set({ wallpaper: data });
            setDraft(data.startsWith("data:") ? "" : data);
            setError("");
          };
          reader.onerror = () => setError(t.tooBig);
          reader.readAsDataURL(file);
        };
        const resetWall = () => {
          store.set({ wallpaper: "" });
          setDraft("");
          setError("");
        };

        const preview = prefs.wallpaper
          ? { "--lg-pref-preview": `url(${JSON.stringify(prefs.wallpaper)})` }
          : null;

        return React.createElement("div", { className: "dsh-lg-pref", "data-lg-settings": "" },
          React.createElement("p", { className: "dsh-lg-pref-lead" }, t.lead),
          React.createElement("div", { className: "dsh-lg-pref-card" },
            React.createElement("div", { className: "dsh-lg-pref-row" },
              React.createElement("div", { className: "dsh-lg-pref-copy" },
                React.createElement("div", { className: "dsh-lg-pref-title" }, t.enableTitle),
                React.createElement("div", { className: "dsh-lg-pref-hint" }, t.enableHint),
              ),
              React.createElement("button", {
                type: "button",
                className: "dsh-lg-pref-switch",
                role: "switch",
                "aria-checked": prefs.enabled ? "true" : "false",
                "aria-label": t.enableTitle,
                onClick: setEnabled,
              }),
            ),
          ),
          React.createElement("div", { className: "dsh-lg-pref-card" },
            React.createElement("div", { className: "dsh-lg-pref-row" },
              React.createElement("div", { className: "dsh-lg-pref-copy" },
                React.createElement("div", { className: "dsh-lg-pref-title" }, t.opacityTitle),
                React.createElement("div", { className: "dsh-lg-pref-hint" }, t.opacityHint),
              ),
              React.createElement("div", { className: "dsh-lg-pref-meta" }, `${prefs.opacity}%`),
            ),
            React.createElement("input", {
              className: "dsh-lg-pref-range",
              type: "range",
              min: 0,
              max: 100,
              step: 1,
              value: prefs.opacity,
              "aria-label": t.opacityTitle,
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              "aria-valuenow": prefs.opacity,
              disabled: !prefs.enabled,
              onChange: setOpacity,
            }),
          ),
          React.createElement("div", { className: "dsh-lg-pref-card" },
            React.createElement("div", { className: "dsh-lg-pref-row" },
              React.createElement("div", { className: "dsh-lg-pref-copy" },
                React.createElement("div", { className: "dsh-lg-pref-title" }, t.blurTitle),
                React.createElement("div", { className: "dsh-lg-pref-hint" }, t.blurHint),
              ),
              React.createElement("div", { className: "dsh-lg-pref-meta" }, `${prefs.blur}px`),
            ),
            React.createElement("input", {
              className: "dsh-lg-pref-range",
              type: "range",
              min: 0,
              max: 40,
              step: 1,
              value: prefs.blur,
              "aria-label": t.blurTitle,
              "aria-valuemin": 0,
              "aria-valuemax": 40,
              "aria-valuenow": prefs.blur,
              disabled: !prefs.enabled,
              onChange: setBlur,
            }),
          ),
          React.createElement("div", { className: "dsh-lg-pref-card" },
            React.createElement("div", { className: "dsh-lg-pref-copy" },
              React.createElement("div", { className: "dsh-lg-pref-title" }, t.wallTitle),
              React.createElement("div", { className: "dsh-lg-pref-hint" }, t.wallHint),
            ),
            preview && React.createElement("div", {
              className: "dsh-lg-pref-preview",
              style: preview,
              "aria-hidden": "true",
            }),
            React.createElement("div", { className: "dsh-lg-pref-field" },
              React.createElement("input", {
                type: "text",
                value: draft,
                placeholder: t.urlPh,
                "aria-label": t.wallTitle,
                disabled: !prefs.enabled,
                onChange: (event) => setDraft(event.target.value),
                onKeyDown: (event) => {
                  if (event.key === "Enter") applyUrl();
                },
              }),
              React.createElement("button", {
                type: "button",
                className: "dsh-lg-pref-btn",
                disabled: !prefs.enabled,
                onClick: applyUrl,
              }, t.apply),
            ),
            React.createElement("div", { className: "dsh-lg-pref-field" },
              React.createElement("input", {
                ref: fileRef,
                type: "file",
                accept: "image/*",
                hidden: true,
                onChange: onFile,
              }),
              React.createElement("button", {
                type: "button",
                className: "dsh-lg-pref-btn",
                disabled: !prefs.enabled,
                onClick: () => fileRef.current && fileRef.current.click(),
              }, t.choose),
              React.createElement("button", {
                type: "button",
                className: "dsh-lg-pref-btn",
                disabled: !prefs.enabled || !prefs.wallpaper,
                onClick: resetWall,
              }, t.reset),
            ),
            error ? React.createElement("p", { className: "dsh-lg-pref-error" }, error) : null,
          ),
        );
      };
    }

    function registerSettings(ctx, store) {
      const slots = ctx.get ? ctx.get("slots") : ctx.slots;
      if (!slots || typeof slots.inject !== "function") return;
      let React = null;
      try {
        React = require("react");
      } catch {
        return;
      }
      if (!React || !React.createElement) return;
      const Panel = SettingsPanel(store, React);
      slots.inject("settings.section", () => slots.register({
        name: "settings.section",
        id: "liquid-glass",
        order: 20,
        label: () => "Liquid Glass",
      }, Panel));
    }

    const inject = ["theme"];

    function apply(ctx) {
      const store = createStore();

      const slots = ctx.get ? ctx.get("slots") : ctx.slots;
      if (slots) {
        registerSettings(ctx, store);
      } else if (typeof ctx.inject === "function") {
        ctx.inject(["slots"], (slotCtx) => {
          registerSettings(slotCtx, store);
        });
      }

      ctx.effect(() => {
        let stopChrome = null;
        let stopTokens = null;

        const teardown = () => {
          if (stopChrome) {
            stopChrome();
            stopChrome = null;
          }
          if (stopTokens) {
            stopTokens();
            stopTokens = null;
          }
          mark(false);
          applyWallpaper("");
          if (document.body) {
            document.body.style.removeProperty("--lg-alpha");
            document.body.style.removeProperty("--lg-blur");
          }
        };

        const paint = (prefs) => {
          if (!prefs.enabled) {
            teardown();
            return;
          }
          mark(true);
          applyAlpha(prefs.opacity);
          applyBlur(prefs.blur);
          applyWallpaper(prefs.wallpaper);
          if (stopTokens) stopTokens();
          stopTokens = ctx.theme.overrideTokens(SOURCE, activeTokens(prefs.opacity));
          if (!stopChrome) stopChrome = startChrome();
        };

        paint(store.get());
        const unsub = store.subscribe(paint);

        let media = null;
        const onMedia = () => paint(store.get());
        if (typeof matchMedia !== "undefined") {
          media = matchMedia("(prefers-reduced-transparency: reduce)");
          media.addEventListener("change", onMedia);
        }

        const onStorage = (event) => {
          if (event.key !== STORAGE_KEY) return;
          const next = readPrefs();
          store.set(next);
        };
        window.addEventListener("storage", onStorage);

        return () => {
          unsub();
          window.removeEventListener("storage", onStorage);
          if (media) media.removeEventListener("change", onMedia);
          teardown();
        };
      }, "liquid-glass: apply preferences");
    }

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  },
});

window.__ModuleLoader__.load({
  id: "dsh-liquid-theme",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;

    const SOURCE = "dsh-liquid-theme";
    const ATTR = "data-liquid-glass";
    const WALL_ATTR = "data-lg-wallpaper";
    const STORAGE_KEY = "dsh-liquid-theme";
    const LEGACY_STORAGE_KEY = "dsh-liquid-glass";
    const MAX_WALLPAPER_CHARS = 1800000;

    const DEFAULTS = {
      enabled: true,
      opacity: 20,
      blur: 5,
      refract: 15,
      refractOn: true,
      scrim: 25,
      scrimBlur: 5,
      wallpaper: "",
    };

    const REFRACT_FILTERS = {
      sidebar: "dsh-lg-refract-sidebar",
      header: "dsh-lg-refract-header",
      composer: "dsh-lg-refract-composer",
      traces: "dsh-lg-refract-traces",
      dock: "dsh-lg-refract-dock",
      pill: "dsh-lg-refract-pill",
      dialog: "dsh-lg-refract-dialog",
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
        const raw = localStorage.getItem(STORAGE_KEY)
          || localStorage.getItem(LEGACY_STORAGE_KEY);
        if (!raw) return { ...DEFAULTS };
        const parsed = JSON.parse(raw);
        return {
          enabled: parsed.enabled !== false,
          opacity: clamp(parsed.opacity, 0, 100, 20),
          blur: clamp(parsed.blur, 0, 40, 5),
          refract: clamp(parsed.refract, 0, 100, 15),
          refractOn: parsed.refractOn !== false,
          scrim: clamp(parsed.scrim, 0, 100, 25),
          scrimBlur: clamp(parsed.scrimBlur, 0, 40, 5),
          wallpaper: typeof parsed.wallpaper === "string" ? parsed.wallpaper : "",
        };
      } catch {
        return { ...DEFAULTS };
      }
    }

    function writePrefs(prefs) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      localStorage.removeItem(LEGACY_STORAGE_KEY);
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
      const mul = clamp(opacity, 0, 100, 20) / 100;
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

    function isColorWallpaper(value) {
      return /^color:/i.test(String(value || "").trim())
        || /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(String(value || "").trim());
    }

    function toColorPref(value) {
      const raw = String(value || "").trim().replace(/^color:/i, "");
      const short = /^#([0-9a-f]{3})$/i.exec(raw);
      if (short) {
        const r = short[1][0];
        const g = short[1][1];
        const b = short[1][2];
        return `color:#${r}${r}${g}${g}${b}${b}`.toLowerCase();
      }
      if (/^#([0-9a-f]{6})$/i.test(raw)) return `color:${raw.toLowerCase()}`;
      return "";
    }

    function wallpaperHex(value) {
      const pref = toColorPref(value);
      return pref ? pref.slice("color:".length) : "#0b1420";
    }

    function applyWallpaper(value) {
      const body = document.body;
      if (!body) return;
      const color = toColorPref(value);
      if (color) {
        body.setAttribute(WALL_ATTR, "");
        body.setAttribute("data-lg-bg", "color");
        body.style.setProperty("--lg-bg-color", wallpaperHex(color));
        body.style.setProperty("--lg-wallpaper", "none");
        return;
      }
      body.removeAttribute("data-lg-bg");
      body.style.removeProperty("--lg-bg-color");
      if (value && isWallpaperUrl(value)) {
        body.setAttribute(WALL_ATTR, "");
        body.style.setProperty("--lg-wallpaper", `url(${JSON.stringify(value)})`);
        return;
      }
      body.removeAttribute(WALL_ATTR);
      body.style.removeProperty("--lg-wallpaper");
    }

    function applyAlpha(opacity) {
      const body = document.body;
      if (!body) return;
      body.style.setProperty("--lg-alpha", String(clamp(opacity, 0, 100, 20) / 100));
    }

    function applyBlur(blur) {
      const body = document.body;
      if (!body) return;
      body.style.setProperty("--lg-blur", `${clamp(blur, 0, 40, 5)}px`);
    }

    function syncRimSize() {
      const body = document.body;
      if (!body) return;
      const size = Math.round(Math.hypot(window.innerWidth || 1, window.innerHeight || 1) * 0.4);
      body.style.setProperty("--lg-rim-size", `${Math.max(80, size)}px`);
    }

    function applyRefract(refract, on) {
      const body = document.body;
      if (!body) return;
      const n = on === false ? 0 : clamp(refract, 0, 100, 15) / 100;
      body.style.setProperty("--lg-refract", String(n));
      if (n > 0) body.setAttribute("data-lg-refract", "");
      else body.removeAttribute("data-lg-refract");
    }

    function supportsRefract() {
      try {
        return typeof CSS !== "undefined"
          && CSS.supports("backdrop-filter", "url(#dsh-lg-refract-sidebar) blur(1px)");
      } catch {
        return false;
      }
    }

    function smoothStep(a, b, t) {
      const x = Math.max(0, Math.min(1, (t - a) / (b - a)));
      return x * x * (3 - 2 * x);
    }

    function roundedRectSDF(x, y, halfW, halfH, radius) {
      const qx = Math.abs(x) - halfW + radius;
      const qy = Math.abs(y) - halfH + radius;
      return Math.min(Math.max(qx, qy), 0)
        + Math.hypot(Math.max(qx, 0), Math.max(qy, 0))
        - radius;
    }

    function quantizeSize(n) {
      return Math.max(8, Math.round(n / 16) * 16);
    }

    function readRadius(el, fallback) {
      if (!el) return fallback;
      const n = parseFloat(getComputedStyle(el).borderTopLeftRadius);
      return Number.isFinite(n) ? n : fallback;
    }

    const refractCache = new Map();
    let refractCanvas = null;

    function getRefractCanvas(w, h) {
      if (!refractCanvas) refractCanvas = document.createElement("canvas");
      if (refractCanvas.width !== w) refractCanvas.width = w;
      if (refractCanvas.height !== h) refractCanvas.height = h;
      return refractCanvas;
    }

    function buildDisplacementMap(width, height, radiusPx) {
      const maxDim = 192;
      const ratio = Math.min(1, maxDim / Math.max(width, height));
      const cw = Math.max(16, Math.round(width * ratio));
      const ch = Math.max(16, Math.round(height * ratio));
      const radius = Math.max(1, radiusPx * ratio);
      const rim = Math.max(18, Math.min(34, Math.min(width, height) * 0.11)) * ratio;
      const innerW = Math.max(cw / 2 - rim, cw * 0.22);
      const innerH = Math.max(ch / 2 - rim, ch * 0.22);
      const data = new Uint8ClampedArray(cw * ch * 4);
      const raw = [];
      let maxScale = 0;

      for (let y = 0; y < ch; y += 1) {
        for (let x = 0; x < cw; x += 1) {
          const fx = x + 0.5;
          const fy = y + 0.5;
          const ix = fx / cw - 0.5;
          const iy = fy / ch - 0.5;
          const d = roundedRectSDF(fx - cw / 2, fy - ch / 2, innerW, innerH, Math.min(radius, innerW, innerH));
          const displacement = smoothStep(0.8, 0, d / rim - 0.15);
          const scaled = smoothStep(0, 1, displacement);
          const dx = (ix * scaled + 0.5) * cw - fx;
          const dy = (iy * scaled + 0.5) * ch - fy;
          maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
          raw.push(dx, dy);
        }
      }

      maxScale = Math.max(maxScale, 0.0001) * 0.5;
      let index = 0;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = (raw[index++] / maxScale + 0.5) * 255;
        data[i + 1] = (raw[index++] / maxScale + 0.5) * 255;
        data[i + 2] = 0;
        data[i + 3] = 255;
      }

      const canvas = getRefractCanvas(cw, ch);
      const ctx = canvas.getContext("2d");
      ctx.putImageData(new ImageData(data, cw, ch), 0, 0);
      return {
        href: canvas.toDataURL("image/png"),
        scale: maxScale / ratio,
        mapW: cw,
        mapH: ch,
      };
    }

    function findFilterParts(id) {
      const filter = document.getElementById(id);
      if (!filter) return null;
      return {
        filter,
        image: filter.querySelector("feImage"),
        map: filter.querySelector("feDisplacementMap"),
      };
    }

    function fitFilterImage(parts, width, height) {
      const w = Math.max(8, Math.round(width));
      const h = Math.max(8, Math.round(height));
      parts.image.setAttribute("x", "0");
      parts.image.setAttribute("y", "0");
      parts.image.setAttribute("width", String(w));
      parts.image.setAttribute("height", String(h));
    }

    function paintFilter(id, width, height, radiusPx, strength) {
      const parts = findFilterParts(id);
      if (!parts || !parts.image || !parts.map) return false;
      const w = Math.max(8, Math.round(width));
      const h = Math.max(8, Math.round(height));
      const r = Math.max(1, radiusPx);
      fitFilterImage(parts, w, h);

      const qw = quantizeSize(w);
      const qh = quantizeSize(h);
      const key = `${qw}x${qh}r${Math.round(r)}s${Math.round(strength * 100)}`;
      if (refractCache.get(id) === key) return true;

      const built = buildDisplacementMap(qw, qh, r);
      parts.image.setAttribute("href", built.href);
      parts.image.setAttributeNS("http://www.w3.org/1999/xlink", "href", built.href);
      parts.map.setAttribute("scale", String(Math.min(48, built.scale * strength)));
      refractCache.set(id, key);
      return true;
    }

    function frostStack(filterId, blurPx) {
      const blur = Math.max(0, blurPx);
      const url = filterId ? `url(#${filterId}) ` : "";
      return `${url}blur(${blur}px) saturate(var(--lg-sat)) contrast(var(--lg-contrast)) brightness(var(--lg-bright))`;
    }

    function applyFx(el, filterId, width, height, radiusPx, strength, blurPx) {
      if (!el) return;
      if (strength <= 0 || width < 8 || height < 8 || !supportsRefract()) {
        el.style.removeProperty("--lg-fx");
        return;
      }
      if (!paintFilter(filterId, width, height, radiusPx, strength)) {
        el.style.removeProperty("--lg-fx");
        return;
      }
      el.style.setProperty("--lg-fx", frostStack(filterId, blurPx));
    }

    function clearFx(el) {
      if (el) el.style.removeProperty("--lg-fx");
    }

    function refractBlur(blur, strength) {
      if (strength <= 0) return blur;
      return Math.max(0.35, blur * (1 - strength) ** 1.6 + 1.4 * strength);
    }

    function syncRefraction() {
      const body = document.body;
      if (!body || !body.hasAttribute(ATTR) || reducedTransparency()) {
        const sidebar = document.querySelector("#root > [data-slot] > div > div:first-child");
        clearFx(sidebar);
        clearFx(document.querySelector("[role='dialog']"));
        return;
      }
      const prefs = window.__DSH_LG__ || DEFAULTS;
      const strength = prefs.refractOn === false ? 0 : clamp(prefs.refract, 0, 100, 15) / 100;
      const blur = clamp(prefs.blur, 0, 40, 5);
      const frost = refractBlur(blur, strength);

      const sidebar = document.querySelector("#root > [data-slot] > div > div:first-child");
      if (sidebar) {
        const box = sidebar.getBoundingClientRect();
        applyFx(
          sidebar,
          REFRACT_FILTERS.sidebar,
          box.width,
          box.height,
          readRadius(sidebar, 22),
          strength * 0.42,
          frost,
        );
      }

      const header = findHeaderHost();
      if (header) {
        const box = header.getBoundingClientRect();
        applyFx(
          header,
          REFRACT_FILTERS.header,
          box.width,
          box.height,
          readRadius(header, 18),
          strength * 0.55,
          frost,
        );
      }

      const composer = findComposerHost();
      if (composer) {
        const box = composer.getBoundingClientRect();
        applyFx(
          composer,
          REFRACT_FILTERS.composer,
          box.width,
          box.height,
          readRadius(composer, 22),
          strength * 0.62,
          frost,
        );
      }

      const traces = document.querySelector('[data-lg-host="traces"]');
      if (traces) {
        const box = traces.getBoundingClientRect();
        applyFx(
          traces,
          REFRACT_FILTERS.traces,
          box.width,
          box.height,
          readRadius(traces, 18),
          strength * 0.28,
          frost,
        );
      } else {
        const stale = findFilterParts(REFRACT_FILTERS.traces);
        if (stale) stale.map.setAttribute("scale", "0");
      }

      const dock = document.querySelector('[data-slot="conversation.composer.dock"] > *');
      if (dock) {
        const box = dock.getBoundingClientRect();
        applyFx(
          dock,
          REFRACT_FILTERS.dock,
          box.width,
          box.height,
          Math.min(box.height / 2, readRadius(dock, 999)),
          strength * 0.62,
          frost,
        );
      }

      const jump = findJumpButton();
      if (jump) {
        const box = jump.getBoundingClientRect();
        applyFx(
          jump,
          REFRACT_FILTERS.pill,
          box.width,
          box.height,
          Math.min(box.width, box.height) / 2,
          strength * 0.62,
          frost,
        );
      }

      const dialog = document.querySelector("[role='dialog']");
      if (dialog) {
        const box = dialog.getBoundingClientRect();
        applyFx(
          dialog,
          REFRACT_FILTERS.dialog,
          box.width,
          box.height,
          readRadius(dialog, 22),
          strength * 0.5,
          Math.max(0.35, blur * 1.3),
        );
      }
    }

    function applyScrim(scrim, blur) {
      const body = document.body;
      if (!body) return;
      const n = clamp(scrim, 0, 100, 25) / 100;
      const b = clamp(blur, 0, 40, 5);
      body.style.setProperty("--lg-scrim", String(n));
      body.style.setProperty("--lg-scrim-blur", `${b}px`);
      if (n > 0 || b > 0) body.setAttribute("data-lg-scrim", "");
      else body.removeAttribute("data-lg-scrim");
    }

    function stripChrome() {
      for (const node of document.querySelectorAll(".dsh-lg-effect, .dsh-lg-shine, .dsh-lg-rim")) node.remove();
      for (const node of document.querySelectorAll("[data-lg-host]")) node.removeAttribute("data-lg-host");
      for (const node of document.querySelectorAll("[data-lg-pad]")) node.removeAttribute("data-lg-pad");
      const sidebar = document.querySelector("#root > [data-slot] > div > div:first-child");
      clearFx(sidebar);
      const dock = document.querySelector('[data-slot="conversation.composer.dock"] > *');
      clearFx(dock);
      refractCache.clear();
    }

    function isDisclosureOpen(root) {
      return !!root.querySelector('[aria-expanded="true"]');
    }

    function markReadingPads() {
      for (const node of document.querySelectorAll("[data-lg-pad]")) {
        node.removeAttribute("data-lg-pad");
      }
      if (document.body.hasAttribute("data-lg-home")) return;

      for (const row of document.querySelectorAll(
        '[data-chat-flow-kind="user"], [data-chat-flow-kind="steering"]'
      )) {
        const bubble = row.querySelector('[class*="bubble"]');
        if (bubble) bubble.setAttribute("data-lg-pad", "user");
      }

      for (const step of document.querySelectorAll('[data-chat-flow-kind="assistant-step"]')) {
        let host = step;
        while (host && host.children.length === 1) {
          const only = host.firstElementChild;
          if (!only || only.hasAttribute("data-variant")) break;
          if (host.querySelector(":scope > [data-variant]")) break;
          host = only;
        }
        if (!host) continue;
        const kids = [...host.children];
        if (kids.some((child) => child.hasAttribute("data-variant"))) {
          for (const child of kids) {
            if (!child.hasAttribute("data-variant")) child.setAttribute("data-lg-pad", "assistant");
          }
        } else if (host !== step) {
          host.setAttribute("data-lg-pad", "assistant");
        }
      }

      for (const card of document.querySelectorAll("[data-variant]")) {
        if (!isDisclosureOpen(card)) continue;
        const expanded = card.querySelector('[class*="thinkBody"]')
          || card.querySelector("pre")
          || [...card.children].find((el) => !el.querySelector("[aria-expanded]"));
        if (expanded && expanded !== card) expanded.setAttribute("data-lg-pad", "expand");
      }
    }

    function mountLayers(el, kind) {
      if (!el) return;
      el.setAttribute("data-lg-host", kind);
      if (!el.querySelector(":scope > .dsh-lg-effect")) {
        const effect = document.createElement("div");
        effect.className = "dsh-lg-effect";
        effect.setAttribute("aria-hidden", "true");
        el.insertBefore(effect, el.firstChild);
      }
      if (kind === "seat") return;
      if (el.querySelector(":scope > .dsh-lg-shine")) return;
      const shine = document.createElement("div");
      shine.className = "dsh-lg-shine";
      shine.setAttribute("aria-hidden", "true");
      const effect = el.querySelector(":scope > .dsh-lg-effect");
      el.insertBefore(shine, effect ? effect.nextSibling : el.firstChild);
    }

    function mountRim(el) {
      if (!el) return;
      const sidebar = document.querySelector("#root > [data-slot] > div > div:first-child");
      if (sidebar && (el === sidebar || sidebar.contains(el) && !el.matches("[role='dialog']"))) return;
      if (el.querySelector(":scope > .dsh-lg-rim")) return;
      if (getComputedStyle(el).position === "static") el.style.position = "relative";
      const rim = document.createElement("div");
      rim.className = "dsh-lg-rim";
      rim.setAttribute("aria-hidden", "true");
      el.appendChild(rim);
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
      for (const node of col.querySelectorAll(".dsh-lg-effect, .dsh-lg-shine, .dsh-lg-rim")) node.remove();
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
      if (document.querySelector('[data-slot="conversation.hero.workspace"]')) {
        document.body.setAttribute("data-lg-home", "");
      } else {
        document.body.removeAttribute("data-lg-home");
      }
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
      markReadingPads();
      mountRim(findHeaderHost());
      mountRim(composer);
      mountRim(traces);
      mountRim(jump);
      mountRim(document.querySelector('[data-slot="conversation.composer.dock"] > *'));
      mountRim(document.querySelector("[role='dialog']"));
      if (panel) mountRim(panel);
      for (const menu of document.querySelectorAll("[role='menu'], [role='listbox']")) mountRim(menu);
      syncRefraction();
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
      let raf = 0;
      let stable = 0;
      let lastSig = "";
      const watched = new Set();

      const sidebarEl = () => document.querySelector("#root > [data-slot] > div > div:first-child");

      const sizeSig = () => {
        const nodes = [
          sidebarEl(),
          findHeaderHost(),
          findComposerHost(),
          document.querySelector('[data-lg-host="traces"]'),
          document.querySelector("[role='dialog']"),
        ];
        return nodes.map((el) => {
          if (!el) return "0";
          const box = el.getBoundingClientRect();
          return `${Math.round(box.width)}x${Math.round(box.height)}`;
        }).join("|");
      };

      const pulse = () => {
        if (raf) return;
        stable = 0;
        const step = () => {
          const sig = sizeSig();
          if (sig !== lastSig) {
            lastSig = sig;
            stable = 0;
            syncRefraction();
          } else {
            stable += 1;
          }
          raf = stable < 24 ? window.requestAnimationFrame(step) : 0;
        };
        raf = window.requestAnimationFrame(step);
      };

      const attachWatches = () => {
        if (!ro) return;
        const sidebar = sidebarEl();
        const targets = [
          sidebar,
          sidebar && sidebar.parentElement,
          findHeaderHost(),
          findComposerHost(),
          document.querySelector("[role='dialog']"),
          document.getElementById("root"),
        ];
        for (const el of targets) {
          if (!el || watched.has(el)) continue;
          watched.add(el);
          ro.observe(el);
        }
      };

      const schedule = () => {
        pulse();
        if (timer) return;
        timer = window.setTimeout(() => {
          timer = 0;
          decorateChrome();
          attachWatches();
        }, 48);
      };

      const ro = typeof ResizeObserver === "function"
        ? new ResizeObserver(pulse)
        : null;

      decorateChrome();
      attachWatches();
      pulse();

      const root = document.getElementById("root");
      const observer = new MutationObserver(schedule);
      if (root) observer.observe(root, { childList: true, subtree: true });
      const onResize = () => {
        syncRimSize();
        pulse();
      };
      window.addEventListener("resize", onResize);
      document.addEventListener("transitionrun", pulse, true);
      document.addEventListener("transitionstart", pulse, true);

      let glowRaf = 0;
      let pointerX = 0;
      let pointerY = 0;
      const paintRims = () => {
        glowRaf = 0;
        const nodes = [
          sidebarEl(),
          ...document.querySelectorAll("[data-lg-host], [role='dialog'], [role='menu'], [role='listbox']"),
        ];
        for (const el of nodes) {
          if (!el) continue;
          const box = el.getBoundingClientRect();
          el.style.setProperty("--lg-mx", `${pointerX - box.left}px`);
          el.style.setProperty("--lg-my", `${pointerY - box.top}px`);
        }
      };
      const onPointer = (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (!glowRaf) glowRaf = window.requestAnimationFrame(paintRims);
      };
      window.addEventListener("pointermove", onPointer, { passive: true });
      syncRimSize();

      return () => {
        if (timer) window.clearTimeout(timer);
        if (raf) window.cancelAnimationFrame(raf);
        if (glowRaf) window.cancelAnimationFrame(glowRaf);
        observer.disconnect();
        if (ro) ro.disconnect();
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointermove", onPointer);
        document.removeEventListener("transitionrun", pulse, true);
        document.removeEventListener("transitionstart", pulse, true);
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
      blurHint: "backdrop 模糊半径。折射越高，实际模糊会自动压低，否则边缘弯折会被抹平。",
      refractOnTitle: "折射玻璃",
      refractOnHint: "关掉后所有折射层变成普通霜玻璃。强度数值会保留，再打开还是刚才那样。",
      refractTitle: "折射强度",
      refractHint: "圆角边缘把背后的壁纸 / 对话弯折。0 只留霜面。",
      wallTitle: "背景图",
      wallHint: "默认是内置的深海虎鲸图。也可以填图片地址、选本地图，或指定纯色。",
      colorTitle: "纯色背景",
      colorHint: "选色后立刻铺满整页，替代壁纸。",
      scrimTitle: "内容垫层透明度",
      scrimHint: "只垫在你和 AI 的主对话上。思考、工具、搜索折叠时不垫，展开后才垫。",
      scrimBlurTitle: "内容垫层模糊",
      scrimBlurHint: "同一套垫层的模糊，只作用在上面这些主内容块。",
      apply: "应用",
      choose: "选择图片",
      reset: "恢复默认",
      urlPh: "https://…、#1a2332 或 data:image/…",
      tooBig: "图片太大，请换一张小于约 1.2MB 的图，或改用图片地址。",
      badUrl: "请填写 http(s)、data:image 或 #RRGGBB 颜色。",
    };

    const EN = {
      lead: "These options only change the Liquid Glass look. Official light/dark still works, and the plugin stays installed.",
      enableTitle: "Enable Liquid Glass",
      enableHint: "Turn off to restore the official skin. This page stays so you can turn it back on.",
      opacityTitle: "Glass opacity",
      opacityHint: "Applies to the sidebar, header, composer, menus, and other frost surfaces.",
      blurTitle: "Glass blur",
      blurHint: "Backdrop blur radius. Higher refraction automatically lowers the blur so the rim can still bend.",
      refractOnTitle: "Refraction",
      refractOnHint: "Turn off to make every liquid surface plain frost. The strength slider is kept for later.",
      refractTitle: "Refraction strength",
      refractHint: "How much the rounded rim bends wallpaper and chat. 0 is frost only.",
      wallTitle: "Wallpaper",
      wallHint: "The built-in orca wallpaper is the default. Paste an image URL, pick a file, or set a solid color.",
      colorTitle: "Solid color",
      colorHint: "Fills the page immediately and replaces the wallpaper.",
      scrimTitle: "Reading pad opacity",
      scrimHint: "Only on your bubbles and the assistant reply. Think/tool rows stay clear until expanded.",
      scrimBlurTitle: "Reading pad blur",
      scrimBlurHint: "Same pad blur, only on those main content blocks.",
      apply: "Apply",
      choose: "Choose image",
      reset: "Reset",
      urlPh: "https://…, #1a2332, or data:image/…",
      tooBig: "That image is too large. Use one under about 1.2MB, or paste a URL.",
      badUrl: "Use an http(s) URL, data:image, or #RRGGBB color.",
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
        const [draft, setDraft] = React.useState(() => {
          const wall = store.get().wallpaper;
          return wall.startsWith("data:") || isColorWallpaper(wall) ? "" : wall;
        });
        const [error, setError] = React.useState("");
        const fileRef = React.useRef(null);

        React.useEffect(() => store.subscribe((next) => {
          setPrefs(next);
          setDraft(next.wallpaper.startsWith("data:") || isColorWallpaper(next.wallpaper) ? "" : next.wallpaper);
        }), []);

        const setEnabled = () => {
          store.set({ enabled: !prefs.enabled });
        };
        const setOpacity = (event) => {
          store.set({ opacity: clamp(event.target.value, 0, 100, 20) });
        };
        const setBlur = (event) => {
          store.set({ blur: clamp(event.target.value, 0, 40, 5) });
        };
        const setRefract = (event) => {
          store.set({ refract: clamp(event.target.value, 0, 100, 15) });
        };
        const setRefractOn = () => {
          store.set({ refractOn: prefs.refractOn === false });
        };
        const setScrim = (event) => {
          store.set({ scrim: clamp(event.target.value, 0, 100, 25) });
        };
        const setScrimBlur = (event) => {
          store.set({ scrimBlur: clamp(event.target.value, 0, 40, 5) });
        };
        const applyUrl = () => {
          const url = (draft || "").trim();
          if (!url) {
            if (prefs.wallpaper.startsWith("data:") || isColorWallpaper(prefs.wallpaper)) {
              setError("");
              return;
            }
            store.set({ wallpaper: "" });
            setError("");
            return;
          }
          const color = toColorPref(url);
          if (color) {
            store.set({ wallpaper: color });
            setDraft("");
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
        const setColor = (event) => {
          const color = toColorPref(event.target.value);
          if (!color) return;
          store.set({ wallpaper: color });
          setDraft("");
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

        const colorOn = isColorWallpaper(prefs.wallpaper);
        const preview = colorOn
          ? { backgroundColor: wallpaperHex(prefs.wallpaper), "--lg-pref-preview": "none" }
          : prefs.wallpaper
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
            React.createElement("div", { className: "dsh-lg-pref-row" },
              React.createElement("div", { className: "dsh-lg-pref-copy" },
                React.createElement("div", { className: "dsh-lg-pref-title" }, t.refractOnTitle),
                React.createElement("div", { className: "dsh-lg-pref-hint" }, t.refractOnHint),
              ),
              React.createElement("button", {
                type: "button",
                className: "dsh-lg-pref-switch",
                role: "switch",
                "aria-checked": prefs.refractOn !== false ? "true" : "false",
                "aria-label": t.refractOnTitle,
                disabled: !prefs.enabled,
                onClick: setRefractOn,
              }),
            ),
            React.createElement("div", { className: "dsh-lg-pref-row" },
              React.createElement("div", { className: "dsh-lg-pref-copy" },
                React.createElement("div", { className: "dsh-lg-pref-title" }, t.refractTitle),
                React.createElement("div", { className: "dsh-lg-pref-hint" }, t.refractHint),
              ),
              React.createElement("div", { className: "dsh-lg-pref-meta" }, `${prefs.refract}%`),
            ),
            React.createElement("input", {
              className: "dsh-lg-pref-range",
              type: "range",
              min: 0,
              max: 100,
              step: 1,
              value: prefs.refract,
              "aria-label": t.refractTitle,
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              "aria-valuenow": prefs.refract,
              disabled: !prefs.enabled || prefs.refractOn === false,
              onChange: setRefract,
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
            React.createElement("div", { className: "dsh-lg-pref-row" },
              React.createElement("div", { className: "dsh-lg-pref-copy" },
                React.createElement("div", { className: "dsh-lg-pref-title" }, t.colorTitle),
                React.createElement("div", { className: "dsh-lg-pref-hint" }, t.colorHint),
              ),
              React.createElement("div", { className: "dsh-lg-pref-meta" },
                colorOn ? wallpaperHex(prefs.wallpaper) : "—",
              ),
            ),
            React.createElement("div", { className: "dsh-lg-pref-field" },
              React.createElement("input", {
                className: "dsh-lg-pref-color",
                type: "color",
                value: colorOn ? wallpaperHex(prefs.wallpaper) : "#0b1420",
                "aria-label": t.colorTitle,
                disabled: !prefs.enabled,
                onChange: setColor,
              }),
            ),
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
            React.createElement("div", { className: "dsh-lg-pref-row" },
              React.createElement("div", { className: "dsh-lg-pref-copy" },
                React.createElement("div", { className: "dsh-lg-pref-title" }, t.scrimTitle),
                React.createElement("div", { className: "dsh-lg-pref-hint" }, t.scrimHint),
              ),
              React.createElement("div", { className: "dsh-lg-pref-meta" }, `${prefs.scrim}%`),
            ),
            React.createElement("input", {
              className: "dsh-lg-pref-range",
              type: "range",
              min: 0,
              max: 100,
              step: 1,
              value: prefs.scrim,
              "aria-label": t.scrimTitle,
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              "aria-valuenow": prefs.scrim,
              disabled: !prefs.enabled,
              onChange: setScrim,
            }),
            React.createElement("div", { className: "dsh-lg-pref-row" },
              React.createElement("div", { className: "dsh-lg-pref-copy" },
                React.createElement("div", { className: "dsh-lg-pref-title" }, t.scrimBlurTitle),
                React.createElement("div", { className: "dsh-lg-pref-hint" }, t.scrimBlurHint),
              ),
              React.createElement("div", { className: "dsh-lg-pref-meta" }, `${prefs.scrimBlur}px`),
            ),
            React.createElement("input", {
              className: "dsh-lg-pref-range",
              type: "range",
              min: 0,
              max: 40,
              step: 1,
              value: prefs.scrimBlur,
              "aria-label": t.scrimBlurTitle,
              "aria-valuemin": 0,
              "aria-valuemax": 40,
              "aria-valuenow": prefs.scrimBlur,
              disabled: !prefs.enabled,
              onChange: setScrimBlur,
            }),
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
        id: "dsh-liquid-theme",
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
            document.body.style.removeProperty("--lg-refract");
            document.body.style.removeProperty("--lg-scrim");
            document.body.style.removeProperty("--lg-scrim-blur");
            document.body.style.removeProperty("--lg-bg-color");
            document.body.style.removeProperty("--lg-rim-size");
            document.body.removeAttribute("data-lg-scrim");
            document.body.removeAttribute("data-lg-refract");
            document.body.removeAttribute("data-lg-bg");
            document.body.removeAttribute("data-lg-home");
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
          applyRefract(prefs.refract, prefs.refractOn);
          applyScrim(prefs.scrim, prefs.scrimBlur);
          applyWallpaper(prefs.wallpaper);
          if (stopTokens) stopTokens();
          stopTokens = ctx.theme.overrideTokens(SOURCE, activeTokens(prefs.opacity));
          if (!stopChrome) stopChrome = startChrome();
          else syncRefraction();
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
          if (event.key !== STORAGE_KEY && event.key !== LEGACY_STORAGE_KEY) return;
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

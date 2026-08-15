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
    const MAX_WALL_EDGE = 2560;

    const DEFAULTS = {
      enabled: true,
      opacity: 20,
      blur: 5,
      refract: 15,
      refractOn: true,
      inkAuto: true,
      scrim: 25,
      scrimBlur: 5,
      sat: 110,
      contrast: 100,
      bright: 120,
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
          inkAuto: parsed.inkAuto !== false,
          scrim: clamp(parsed.scrim, 0, 100, 25),
          scrimBlur: clamp(parsed.scrimBlur, 0, 40, 5),
          sat: clamp(parsed.sat, 50, 200, 110),
          contrast: clamp(parsed.contrast, 80, 140, 100),
          bright: clamp(parsed.bright, 80, 140, 120),
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

    function applyTone(sat, contrast, bright) {
      const body = document.body;
      if (!body) return;
      body.style.setProperty("--lg-sat", `${clamp(sat, 50, 200, 110)}%`);
      body.style.setProperty("--lg-contrast", String(clamp(contrast, 80, 140, 100) / 100));
      body.style.setProperty("--lg-bright", String(clamp(bright, 80, 140, 120) / 100));
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

    const WALL_FALLBACK = [11, 20, 32];

    let wallCanvas = null;
    let wallPixels = null;
    let wallCanvasKey = "";
    let wallCanvasReady = false;
    let wallLoadGen = 0;
    let inkRaf = 0;
    let inkForceQueued = false;

    function isDarkTheme() {
      return !!(document.body && document.body.hasAttribute("data-ds-dark-theme"));
    }

    function parseCssUrl(value) {
      const raw = String(value || "").trim();
      const wrapped = /^url\(\s*(['"]?)([\s\S]*?)\1\s*\)$/i.exec(raw);
      return wrapped ? wrapped[2] : raw;
    }

    function defaultWallpaperSrc() {
      if (!document.body) return "";
      return parseCssUrl(getComputedStyle(document.body).getPropertyValue("--lg-default-wallpaper"));
    }

    function wallpaperSampleSrc(prefs) {
      const wall = prefs && prefs.wallpaper;
      if (!wall) return defaultWallpaperSrc();
      if (isColorWallpaper(wall)) return "";
      if (isWallpaperUrl(wall)) return wall;
      return defaultWallpaperSrc();
    }

    function hexRgb(hex) {
      const raw = String(hex || "").replace(/^#/, "");
      if (raw.length === 3) {
        return [
          parseInt(raw[0] + raw[0], 16),
          parseInt(raw[1] + raw[1], 16),
          parseInt(raw[2] + raw[2], 16),
        ];
      }
      const n = parseInt(raw.slice(0, 6), 16);
      if (!Number.isFinite(n)) return WALL_FALLBACK.slice();
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }

    function loadWallCanvas(src) {
      const key = src || "";
      if (key === wallCanvasKey && wallCanvasReady) return Promise.resolve(wallCanvas);
      const gen = ++wallLoadGen;
      wallCanvasKey = key;
      wallCanvasReady = false;
      wallCanvas = null;
      wallPixels = null;
      if (!key || !/^(data:image\/|https?:)/i.test(key)) {
        wallCanvasReady = true;
        return Promise.resolve(null);
      }
      return new Promise((resolve) => {
        const img = new Image();
        if (!/^data:/i.test(key)) img.crossOrigin = "anonymous";
        img.onload = () => {
          if (gen !== wallLoadGen) return resolve(wallCanvas);
          const max = 160;
          let width = img.naturalWidth || img.width || 1;
          let height = img.naturalHeight || img.height || 1;
          const scale = Math.min(1, max / Math.max(width, height));
          width = Math.max(1, Math.round(width * scale));
          height = Math.max(1, Math.round(height * scale));
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          if (!ctx) {
            wallCanvasReady = true;
            return resolve(null);
          }
          try {
            ctx.drawImage(img, 0, 0, width, height);
            wallCanvas = canvas;
            wallPixels = { data: ctx.getImageData(0, 0, width, height).data, w: width, h: height };
            wallCanvasReady = true;
            resolve(canvas);
          } catch {
            wallCanvas = null;
            wallPixels = null;
            wallCanvasReady = true;
            resolve(null);
          }
        };
        img.onerror = () => {
          if (gen !== wallLoadGen) return resolve(wallCanvas);
          wallCanvasReady = true;
          resolve(null);
        };
        img.src = key;
      });
    }

    function ensureWallCanvas(prefs) {
      if (!prefs || prefs.inkAuto === false) return Promise.resolve(null);
      if (isColorWallpaper(prefs.wallpaper)) {
        wallCanvasKey = `color:${wallpaperHex(prefs.wallpaper)}`;
        wallCanvas = null;
        wallPixels = null;
        wallCanvasReady = true;
        return Promise.resolve(null);
      }
      return loadWallCanvas(wallpaperSampleSrc(prefs));
    }

    function resetWallCanvas() {
      wallLoadGen += 1;
      wallCanvas = null;
      wallPixels = null;
      wallCanvasKey = "";
      wallCanvasReady = false;
      cancelInk();
    }

    function coverPixel(vx, vy, pos) {
      if (!wallPixels) return null;
      const vw = window.innerWidth || 1;
      const vh = window.innerHeight || 1;
      const iw = wallPixels.w;
      const ih = wallPixels.h;
      const scale = Math.max(vw / iw, vh / ih);
      const drawW = iw * scale;
      const drawH = ih * scale;
      const ox = pos === "right" ? vw - drawW : (vw - drawW) / 2;
      const oy = (vh - drawH) / 2;
      const cx = Math.max(0, Math.min(iw - 1, Math.round((vx - ox) / scale)));
      const cy = Math.max(0, Math.min(ih - 1, Math.round((vy - oy) / scale)));
      const i = (cy * iw + cx) * 4;
      return [wallPixels.data[i], wallPixels.data[i + 1], wallPixels.data[i + 2]];
    }

    function sampleWallAt(vx, vy, prefs) {
      if (isColorWallpaper(prefs.wallpaper)) return hexRgb(wallpaperHex(prefs.wallpaper));
      const custom = !!(prefs.wallpaper && isWallpaperUrl(prefs.wallpaper));
      return coverPixel(vx, vy, custom ? "center" : "right");
    }

    function toneRgb(rgb, contrast, bright) {
      return rgb.map((v) => {
        let x = v / 255;
        x = (x - 0.5) * contrast + 0.5;
        x *= bright;
        return Math.max(0, Math.min(255, x * 255));
      });
    }

    function blendRgb(under, over, alpha) {
      if (alpha <= 0) return under;
      if (alpha >= 1) return over;
      return [
        under[0] + (over[0] - under[0]) * alpha,
        under[1] + (over[1] - under[1]) * alpha,
        under[2] + (over[2] - under[2]) * alpha,
      ];
    }

    function frostOver(rgb, kind, prefs) {
      if (reducedTransparency()) {
        if (kind === "pad") return isDarkTheme() ? [28, 30, 40] : [247, 248, 251];
        return isDarkTheme() ? [28, 30, 38] : [243, 245, 248];
      }
      const contrast = clamp(prefs.contrast, 80, 140, 100) / 100;
      const bright = clamp(prefs.bright, 80, 140, 120) / 100;
      const alpha = clamp(prefs.opacity, 0, 100, 20) / 100;
      const dark = isDarkTheme();
      if (kind === "hero") return rgb.slice();
      let out = toneRgb(rgb, contrast, bright);
      if (kind === "pad") {
        const wash = dark ? [12, 14, 20] : [255, 255, 255];
        return blendRgb(out, wash, clamp(prefs.scrim, 0, 100, 25) / 100);
      }
      const frost = dark ? [22, 24, 30] : [255, 255, 255];
      let frostA = (dark ? 0.4 : 0.16) * alpha;
      if (kind === "float") frostA = (dark ? 0.24 : 0.12) * alpha;
      else if (kind === "composer" || kind === "dialog" || kind === "menu" || kind === "jump") {
        frostA = (dark ? 0.52 : 0.38) * alpha;
      }
      return blendRgb(out, frost, frostA);
    }

    function relLum(rgb) {
      return 0.2126 * ((rgb[0] / 255) ** 2.2)
        + 0.7152 * ((rgb[1] / 255) ** 2.2)
        + 0.0722 * ((rgb[2] / 255) ** 2.2);
    }

    function hue2rgb(v1, v2, vH) {
      let h = vH;
      if (h < 0) h += 1;
      if (h > 1) h -= 1;
      if (6 * h < 1) return v1 + (v2 - v1) * 6 * h;
      if (2 * h < 1) return v2;
      if (3 * h < 2) return v1 + (v2 - v1) * ((2 / 3) - h) * 6;
      return v1;
    }

    function rgb2hsl(r, g, b) {
      const red = r / 255;
      const green = g / 255;
      const blue = b / 255;
      const min = Math.min(red, green, blue);
      const max = Math.max(red, green, blue);
      const delta = max - min;
      let h = 0;
      let s = 0;
      const l = (max + min) / 2;
      if (delta !== 0) {
        s = l < 0.5 ? delta / (max + min) : delta / (2 - max - min);
        const dr = ((max - red) / 6 + delta / 2) / delta;
        const dg = ((max - green) / 6 + delta / 2) / delta;
        const db = ((max - blue) / 6 + delta / 2) / delta;
        if (red === max) h = db - dg;
        else if (green === max) h = 1 / 3 + dr - db;
        else h = 2 / 3 + dg - dr;
        if (h < 0) h += 1;
        if (h > 1) h -= 1;
      }
      return [Math.round(360 * h), Math.round(s * 100), Math.round(l * 100)];
    }

    function hsl2rgb(h, s, l) {
      const hue = h / 360;
      const sat = s / 100;
      const light = l / 100;
      if (sat === 0) {
        const v = Math.round(light * 255);
        return [v, v, v];
      }
      const tmp2 = light < 0.5 ? light * (1 + sat) : light + sat - sat * light;
      const tmp1 = 2 * light - tmp2;
      return [
        Math.round(255 * hue2rgb(tmp1, tmp2, hue + 1 / 3)),
        Math.round(255 * hue2rgb(tmp1, tmp2, hue)),
        Math.round(255 * hue2rgb(tmp1, tmp2, hue - 1 / 3)),
      ];
    }

    function w3cDiff(a, b) {
      return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
    }

    function parseCssRgb(value) {
      const m = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i.exec(String(value || ""));
      if (!m) return null;
      return [Number(m[1]), Number(m[2]), Number(m[3])];
    }

    /* @exhuma/readable-color (W3C): walk HSL lightness of the sampled
       background until contrast is readable. Keeps hue so type is not
       flat black/white. https://codepen.io/Michel-Albert/pen/eYxrXeG */
    function readableRgb(bg) {
      const [h, s, startL] = rgb2hsl(bg[0], bg[1], bg[2]);
      let l = Math.max(1, startL);
      const lift = relLum(bg) < 0.43;
      const next = lift
        ? (value) => Math.min(100, value * 1.2)
        : (value) => Math.max(0, value * 0.8);
      l = next(l);
      let out = hsl2rgb(h, s, l);
      for (let i = 0; i < 50 && w3cDiff(bg, out) < 500; i += 1) {
        l = next(l);
        out = hsl2rgb(h, s, l);
      }
      return out;
    }

    function paintReadableInk(el, bg, force) {
      const ink = readableRgb(bg);
      const prev = parseCssRgb(el.style.getPropertyValue("--lg-ink"));
      if (!force && prev && w3cDiff(prev, ink) < 28) return;
      const lift = relLum(bg) < 0.43;
      el.setAttribute("data-lg-ink", lift ? "light" : "dark");
      el.style.setProperty("--lg-ink", `rgb(${ink[0]}, ${ink[1]}, ${ink[2]})`);
      el.style.setProperty("--lg-ink-soft", `rgba(${ink[0]}, ${ink[1]}, ${ink[2]}, 0.72)`);
      el.style.setProperty("--lg-ink-faint", `rgba(${ink[0]}, ${ink[1]}, ${ink[2]}, 0.48)`);
      el.style.setProperty("--lg-ink-flip", `rgb(${Math.round(bg[0])}, ${Math.round(bg[1])}, ${Math.round(bg[2])})`);
    }

    function clearInkVars(el) {
      el.removeAttribute("data-lg-ink");
      el.style.removeProperty("--lg-ink");
      el.style.removeProperty("--lg-ink-soft");
      el.style.removeProperty("--lg-ink-faint");
      el.style.removeProperty("--lg-ink-flip");
    }

    function requestInk(force) {
      if (force) inkForceQueued = true;
      if (inkRaf) return;
      inkRaf = window.requestAnimationFrame(() => {
        inkRaf = 0;
        const forceNow = inkForceQueued;
        inkForceQueued = false;
        syncInk(forceNow);
      });
    }

    function cancelInk() {
      if (inkRaf) {
        window.cancelAnimationFrame(inkRaf);
        inkRaf = 0;
      }
      inkForceQueued = false;
    }

    function sampleBoxRgb(el, kind, prefs) {
      const box = el.getBoundingClientRect();
      if (box.width < 2 || box.height < 2) return null;
      const pts = [
        [0.5, 0.5],
        [0.2, 0.2],
        [0.8, 0.2],
        [0.2, 0.8],
        [0.8, 0.8],
        [0.5, 0.22],
        [0.5, 0.78],
        [0.22, 0.5],
        [0.78, 0.5],
      ];
      const lumas = [];
      const rgbs = [];
      for (const [px, py] of pts) {
        const under = sampleWallAt(box.left + box.width * px, box.top + box.height * py, prefs);
        if (!under) continue;
        const mixed = frostOver(under, kind, prefs);
        rgbs.push(mixed);
        lumas.push(relLum(mixed));
      }
      if (!lumas.length) return null;
      const order = lumas.map((L, i) => i).sort((a, b) => lumas[a] - lumas[b]);
      return rgbs[order[(order.length - 1) >> 1]];
    }

    function applyInkAuto(on) {
      const body = document.body;
      if (!body) return;
      if (on === false) {
        clearInk();
        return;
      }
      body.setAttribute("data-lg-ink-auto", "");
    }

    function clearInk() {
      if (document.body) {
        document.body.removeAttribute("data-lg-ink-auto");
        clearInkVars(document.body);
      }
      for (const node of document.querySelectorAll("[data-lg-ink]")) {
        clearInkVars(node);
      }
    }

    function collectTextBlocks(root, kind, minH, maxH, maxW) {
      const out = [];
      if (!root) return out;
      const walk = (el) => {
        if (!el || el.nodeType !== 1) return;
        if (el.classList && (el.classList.contains("dsh-lg-effect")
          || el.classList.contains("dsh-lg-shine")
          || el.classList.contains("dsh-lg-rim"))) return;
        const box = el.getBoundingClientRect();
        if (box.width < 8 || box.height < 8) {
          for (const child of el.children) walk(child);
          return;
        }
        const text = (el.innerText || "").trim();
        const compact = text && box.height >= minH && box.height <= maxH
          && box.width <= maxW && box.width >= 24;
        if (compact && /[^\s\d:./|-]/.test(text)) {
          out.push([el, kind]);
          return;
        }
        for (const child of el.children) walk(child);
      };
      walk(root);
      return out;
    }

    function inkTargets() {
      const out = [];
      const add = (el, kind) => {
        if (el) out.push([el, kind]);
      };
      const sidebar = document.querySelector("#root > [data-slot] > div > div:first-child");
      if (sidebar) {
        for (const el of sidebar.querySelectorAll("button, a, [role='button']")) {
          const box = el.getBoundingClientRect();
          if (box.height >= 18 && box.height <= 80 && box.width >= 20) add(el, "sidebar");
        }
        out.push(...collectTextBlocks(sidebar, "sidebar", 14, 64, 280));
      }
      const hero = document.querySelector('[data-slot="conversation.hero.workspace"]');
      out.push(...collectTextBlocks(hero, "hero", 16, 96, 1000));
      const composerSlot = document.querySelector('[data-slot="conversation.composer"]');
      if (document.body.hasAttribute("data-lg-home") && composerSlot) {
        out.push(...collectTextBlocks(composerSlot, "hero", 16, 72, 1000));
      }
      add(document.querySelector('[data-slot="conversation.composer.dock"] > *'), "dock");
      add(document.querySelector("[role='dialog']"), "dialog");
      const settingsBtn = document.querySelector(
        '[data-slot="sidebar.settings"] button, [data-slot="settings.trigger"]',
      );
      add((settingsBtn && settingsBtn.closest("button")) || settingsBtn, "sidebar");
      for (const el of document.querySelectorAll("[data-lg-host]")) {
        add(el, el.getAttribute("data-lg-host") || "host");
      }
      for (const el of document.querySelectorAll("[data-lg-pad]")) add(el, "pad");
      for (const el of document.querySelectorAll("[role='menu'], [role='listbox']")) add(el, "menu");
      return out;
    }

    function syncInk(force) {
      const body = document.body;
      const prefs = window.__DSH_LG__ || DEFAULTS;
      if (!body || !body.hasAttribute(ATTR) || prefs.inkAuto === false) {
        clearInk();
        return;
      }
      body.setAttribute("data-lg-ink-auto", "");
      body.removeAttribute("data-lg-ink");
      if (!isColorWallpaper(prefs.wallpaper) && !wallCanvasReady) return;
      const seen = new Set();
      for (const [el, kind] of inkTargets()) {
        if (!el || seen.has(el)) continue;
        if (el === body) continue;
        seen.add(el);
        const rgb = sampleBoxRgb(el, kind, prefs);
        if (!rgb) continue;
        paintReadableInk(el, rgb, force);
      }
      for (const node of document.querySelectorAll("[data-lg-ink]")) {
        if (!seen.has(node)) clearInkVars(node);
      }
    }

    function stripChrome() {
      for (const node of document.querySelectorAll(".dsh-lg-effect, .dsh-lg-shine, .dsh-lg-rim")) node.remove();
      for (const node of document.querySelectorAll("[data-lg-host]")) node.removeAttribute("data-lg-host");
      for (const node of document.querySelectorAll("[data-lg-pad]")) node.removeAttribute("data-lg-pad");
      for (const node of document.querySelectorAll("[data-lg-ink]")) clearInkVars(node);
      const sidebar = document.querySelector("#root > [data-slot] > div > div:first-child");
      clearFx(sidebar);
      const dock = document.querySelector('[data-slot="conversation.composer.dock"] > *');
      clearFx(dock);
      refractCache.clear();
    }

    function isDisclosureOpen(root) {
      return root.getAttribute("aria-expanded") === "true"
        || !!root.querySelector('[aria-expanded="true"]');
    }

    function firstExpandedSurface(root) {
      if (!root) return null;
      return root.querySelector('[class*="thinkBody"]')
        || root.querySelector("[data-terminal]")
        || root.querySelector('[class*="ioCard"]')
        || root.querySelector('[class*="terminalBody"]')
        || root.querySelector('[class*="diffBody"]')
        || root.querySelector('[class*="readBody"]')
        || root.querySelector('[class*="searchBody"]')
        || root.querySelector('[class*="webBody"]')
        || root.querySelector('[class*="codeBody"]')
        || root.querySelector("pre");
    }

    function findExpandedPad(card) {
      const host = card.hasAttribute("data-sample") && card.parentElement
        ? card.parentElement
        : card;
      const hit = firstExpandedSurface(host) || firstExpandedSurface(card.nextElementSibling);
      if (hit) return hit;
      return [...host.children].find((el) => (
        el.getAttribute("aria-expanded") !== "true"
        && !el.querySelector("[aria-expanded]")
      ));
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
        const expanded = findExpandedPad(card);
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
      syncSeatVeil();
      mountRim(findHeaderHost());
      mountRim(composer);
      mountRim(traces);
      mountRim(jump);
      mountRim(document.querySelector('[data-slot="conversation.composer.dock"] > *'));
      mountRim(document.querySelector("[role='dialog']"));
      if (panel) mountRim(panel);
      for (const menu of document.querySelectorAll("[role='menu'], [role='listbox']")) mountRim(menu);
      syncRefraction();
      requestInk(false);
    }

    function syncSeatVeil() {
      const seat = document.querySelector('[data-lg-host="seat"]');
      const effect = seat && seat.querySelector(":scope > .dsh-lg-effect");
      if (!seat || !effect) return;
      const seatBox = seat.getBoundingClientRect();
      const top = Math.max(0, Math.round(seatBox.top));
      effect.style.position = "fixed";
      effect.style.left = "0px";
      effect.style.width = `${window.innerWidth}px`;
      effect.style.top = `${top}px`;
      effect.style.height = `${Math.max(seatBox.height, window.innerHeight - top)}px`;
      effect.style.right = "auto";
      effect.style.bottom = "auto";
      effect.style.borderRadius = "0";
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
            requestInk(false);
            syncSeatVeil();
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
        syncSeatVeil();
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
      const onScroll = () => {
        syncSeatVeil();
        requestInk(false);
      };
      window.addEventListener("scroll", onScroll, { passive: true, capture: true });
      const themeObs = typeof MutationObserver === "function"
        ? new MutationObserver(() => requestInk(true))
        : null;
      if (themeObs) {
        themeObs.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["data-ds-dark-theme", "class", "data-theme"],
        });
        if (document.body) {
          themeObs.observe(document.body, {
            attributes: true,
            attributeFilter: ["data-ds-dark-theme", "class"],
          });
        }
      }
      syncRimSize();
      syncSeatVeil();
      requestInk(true);

      return () => {
        if (timer) window.clearTimeout(timer);
        if (raf) window.cancelAnimationFrame(raf);
        if (glowRaf) window.cancelAnimationFrame(glowRaf);
        observer.disconnect();
        if (themeObs) themeObs.disconnect();
        if (ro) ro.disconnect();
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("scroll", onScroll, { capture: true });
        document.removeEventListener("transitionrun", pulse, true);
        document.removeEventListener("transitionstart", pulse, true);
        stripChrome();
      };
    }

    const ZH = {
      lead: "只改外观。官方浅色 / 深色不受影响，关掉本页随时能再打开。",
      enableTitle: "启用 Liquid Glass",
      enableHint: "关闭后恢复官方皮肤。",
      bgGroup: "背景",
      bgGroupHint: "默认是内置虎鲸图。本地图和网址图都会压进浏览器，刷新不用重新下载。",
      wallTitle: "图片地址",
      colorTitle: "纯色",
      colorHint: "选色后立刻铺满，替代壁纸。",
      glassGroup: "玻璃",
      glassGroupHint: "侧栏、顶栏、输入条、菜单、设置弹层共用。",
      opacityTitle: "透明度",
      opacityHint: "玻璃上那层霜有多实。",
      blurTitle: "模糊",
      blurHint: "折射打开时会再压低一点，好让边缘弯折看得见。",
      satTitle: "饱和度",
      satHint: "100% 是壁纸原色。太高会发飘、发荧光。",
      contrastTitle: "对比度",
      contrastHint: "1.00 是不加减。略高会让玻璃更利落。",
      brightTitle: "亮度",
      brightHint: "1.00 是不加减。略高玻璃会更透亮。",
      refractGroup: "折射",
      refractGroupHint: "圆角边缘把背后的壁纸 / 对话弯折。",
      refractOnTitle: "启用折射",
      refractOnHint: "关掉后变成普通霜玻璃，强度会留着。",
      inkAutoTitle: "自适应字色",
      inkAutoHint: "按每个区域背后的颜色推一组能看清的字色（和背景同色相、改明度）。",
      refractTitle: "强度",
      refractHint: "0 只留霜面。",
      padGroup: "对话垫层",
      padGroupHint: "只垫在你和 AI 的主气泡上。思考 / 工具 / 搜索折叠时不垫。起始页没有。",
      scrimTitle: "透明度",
      scrimHint: "垫层有多实。",
      scrimBlurTitle: "模糊",
      scrimBlurHint: "同一套垫层的模糊。",
      apply: "应用",
      choose: "选择图片",
      reset: "恢复默认",
      urlPh: "https://…、#1a2332 或 data:image/…",
      tooBig: "这张图压缩后还是太大，请换一张。",
      noCache: "这张图站点不允许本地缓存，将按地址加载，刷新时可能闪一下。",
      badUrl: "请填写 http(s)、data:image 或 #RRGGBB 颜色。",
    };

    const EN = {
      lead: "Appearance only. Official light/dark is unchanged, and you can turn this back on anytime.",
      enableTitle: "Enable Liquid Glass",
      enableHint: "Off restores the official skin.",
      bgGroup: "Background",
      bgGroupHint: "Default is the built-in orca. Local and remote images are stored in the browser.",
      wallTitle: "Image URL",
      colorTitle: "Solid color",
      colorHint: "Fills the page immediately and replaces the wallpaper.",
      glassGroup: "Glass",
      glassGroupHint: "Shared by the sidebar, header, composer, menus, and settings.",
      opacityTitle: "Opacity",
      opacityHint: "How solid the frost tint is.",
      blurTitle: "Blur",
      blurHint: "Refraction lowers this a bit so the rim can still bend.",
      satTitle: "Saturation",
      satHint: "100% is the wallpaper’s own color. Too high looks neon.",
      contrastTitle: "Contrast",
      contrastHint: "1.00 is unchanged.",
      brightTitle: "Brightness",
      brightHint: "1.00 is unchanged. A little higher makes the glass clearer.",
      refractGroup: "Refraction",
      refractGroupHint: "Bends wallpaper and chat through the rounded rim.",
      refractOnTitle: "Enable refraction",
      refractOnHint: "Off turns every surface into plain frost. Strength is kept.",
      inkAutoTitle: "Adaptive text",
      inkAutoHint: "Walks the lightness of the color behind each area until the type is readable.",
      refractTitle: "Strength",
      refractHint: "0 is frost only.",
      padGroup: "Reading pad",
      padGroupHint: "Only on your bubbles and the assistant reply. Think/tool rows stay clear until expanded. None on the home page.",
      scrimTitle: "Opacity",
      scrimHint: "How solid the pad is.",
      scrimBlurTitle: "Blur",
      scrimBlurHint: "Blur on the same pad.",
      apply: "Apply",
      choose: "Choose image",
      reset: "Reset",
      urlPh: "https://…, #1a2332, or data:image/…",
      tooBig: "That image is still too large after compression. Try another file.",
      noCache: "This host does not allow local caching. The URL will be loaded each time and may flash on refresh.",
      badUrl: "Use an http(s) URL, data:image, or #RRGGBB color.",
    };

    function copy() {
      const lang = `${document.documentElement.lang || ""} ${navigator.language || ""}`.toLowerCase();
      return lang.includes("zh") ? ZH : EN;
    }

    function isWallpaperUrl(value) {
      return /^(https?:|data:image\/)/i.test(value);
    }

    function compressWallpaper(file) {
      return new Promise((resolve, reject) => {
        const objectUrl = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
          URL.revokeObjectURL(objectUrl);
          let width = img.naturalWidth || img.width || 1;
          let height = img.naturalHeight || img.height || 1;
          const scale = Math.min(1, MAX_WALL_EDGE / Math.max(width, height));
          width = Math.max(1, Math.round(width * scale));
          height = Math.max(1, Math.round(height * scale));
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("tooBig"));
            return;
          }
          const draw = (w, h) => {
            canvas.width = w;
            canvas.height = h;
            ctx.fillStyle = "#0b1420";
            ctx.fillRect(0, 0, w, h);
            ctx.drawImage(img, 0, 0, w, h);
          };
          draw(width, height);
          let quality = 0.88;
          let data = canvas.toDataURL("image/jpeg", quality);
          while (data.length > MAX_WALLPAPER_CHARS && quality > 0.42) {
            quality -= 0.08;
            data = canvas.toDataURL("image/jpeg", quality);
          }
          if (data.length > MAX_WALLPAPER_CHARS) {
            const shrink = Math.sqrt(MAX_WALLPAPER_CHARS / data.length);
            draw(
              Math.max(640, Math.round(width * shrink)),
              Math.max(360, Math.round(height * shrink)),
            );
            data = canvas.toDataURL("image/jpeg", 0.78);
          }
          if (!data || data.length > MAX_WALLPAPER_CHARS) {
            reject(new Error("tooBig"));
            return;
          }
          resolve(data);
        };
        img.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          reject(new Error("bad"));
        };
        img.src = objectUrl;
      });
    }

    function wallpaperFromRemote(url) {
      return fetch(url).then((res) => {
        if (!res.ok) throw new Error("bad");
        return res.blob();
      }).then((blob) => {
        if (blob.type && !/^image\//i.test(blob.type) && blob.type !== "application/octet-stream") {
          throw new Error("bad");
        }
        return compressWallpaper(blob);
      });
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
        const setInkAuto = () => {
          store.set({ inkAuto: prefs.inkAuto === false });
        };
        const setScrim = (event) => {
          store.set({ scrim: clamp(event.target.value, 0, 100, 25) });
        };
        const setScrimBlur = (event) => {
          store.set({ scrimBlur: clamp(event.target.value, 0, 40, 5) });
        };
        const setSat = (event) => {
          store.set({ sat: clamp(event.target.value, 50, 200, 110) });
        };
        const setContrast = (event) => {
          store.set({ contrast: clamp(event.target.value, 80, 140, 100) });
        };
        const setBright = (event) => {
          store.set({ bright: clamp(event.target.value, 80, 140, 120) });
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
          if (/^data:image\//i.test(url)) {
            if (url.length <= MAX_WALLPAPER_CHARS) {
              store.set({ wallpaper: url });
              setDraft("");
              setError("");
              return;
            }
            fetch(url).then((res) => res.blob()).then(compressWallpaper).then((data) => {
              store.set({ wallpaper: data });
              setDraft("");
              setError("");
            }).catch(() => setError(t.tooBig));
            return;
          }
          setError("");
          wallpaperFromRemote(url).then((data) => {
            store.set({ wallpaper: data });
            setDraft("");
            setError("");
          }).catch(() => {
            store.set({ wallpaper: url });
            setError(t.noCache);
          });
        };
        const setColor = (event) => {
          const color = toColorPref(event.target.value);
          if (!color) return;
          store.set({ wallpaper: color });
          setDraft("");
          setError("");
        };
        const onColorInput = (event) => {
          setColor(event);
        };
        const onFile = (event) => {
          const file = event.target.files && event.target.files[0];
          event.target.value = "";
          if (!file) return;
          setError("");
          compressWallpaper(file).then((data) => {
            store.set({ wallpaper: data });
            setDraft("");
            setError("");
          }).catch(() => setError(t.tooBig));
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

        const heading = (title, hint) => React.createElement("div", { className: "dsh-lg-pref-copy" },
          React.createElement("div", { className: "dsh-lg-pref-heading" }, title),
          hint ? React.createElement("div", { className: "dsh-lg-pref-hint" }, hint) : null,
        );

        const slider = (opts) => [
          React.createElement("div", { className: "dsh-lg-pref-row", key: `${opts.id}-row` },
            React.createElement("div", { className: "dsh-lg-pref-copy" },
              React.createElement("div", { className: "dsh-lg-pref-title" }, opts.title),
              opts.hint ? React.createElement("div", { className: "dsh-lg-pref-hint" }, opts.hint) : null,
            ),
            React.createElement("div", { className: "dsh-lg-pref-meta" }, opts.meta),
          ),
          React.createElement("input", {
            key: `${opts.id}-input`,
            className: "dsh-lg-pref-range",
            type: "range",
            min: opts.min,
            max: opts.max,
            step: 1,
            value: opts.value,
            "aria-label": opts.title,
            disabled: !prefs.enabled || !!opts.disabled,
            onChange: opts.onChange,
          }),
        ];

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
            heading(t.bgGroup, t.bgGroupHint),
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
                onInput: onColorInput,
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
            error ? React.createElement("p", { className: "dsh-lg-pref-error" }, error) : null,
          ),
          React.createElement("div", { className: "dsh-lg-pref-card" },
            heading(t.glassGroup, t.glassGroupHint),
            ...slider({
              id: "opacity",
              title: t.opacityTitle,
              hint: t.opacityHint,
              meta: `${prefs.opacity}%`,
              min: 0,
              max: 100,
              value: prefs.opacity,
              onChange: setOpacity,
            }),
            ...slider({
              id: "blur",
              title: t.blurTitle,
              hint: t.blurHint,
              meta: `${prefs.blur}px`,
              min: 0,
              max: 40,
              value: prefs.blur,
              onChange: setBlur,
            }),
            ...slider({
              id: "sat",
              title: t.satTitle,
              hint: t.satHint,
              meta: `${prefs.sat}%`,
              min: 50,
              max: 200,
              value: prefs.sat,
              onChange: setSat,
            }),
            ...slider({
              id: "contrast",
              title: t.contrastTitle,
              hint: t.contrastHint,
              meta: (prefs.contrast / 100).toFixed(2),
              min: 80,
              max: 140,
              value: prefs.contrast,
              onChange: setContrast,
            }),
            ...slider({
              id: "bright",
              title: t.brightTitle,
              hint: t.brightHint,
              meta: (prefs.bright / 100).toFixed(2),
              min: 80,
              max: 140,
              value: prefs.bright,
              onChange: setBright,
            }),
          ),
          React.createElement("div", { className: "dsh-lg-pref-card" },
            heading(t.refractGroup, t.refractGroupHint),
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
            ...slider({
              id: "refract",
              title: t.refractTitle,
              hint: t.refractHint,
              meta: `${prefs.refract}%`,
              min: 0,
              max: 100,
              value: prefs.refract,
              disabled: prefs.refractOn === false,
              onChange: setRefract,
            }),
          ),
          React.createElement("div", { className: "dsh-lg-pref-card" },
            React.createElement("div", { className: "dsh-lg-pref-row" },
              React.createElement("div", { className: "dsh-lg-pref-copy" },
                React.createElement("div", { className: "dsh-lg-pref-title" }, t.inkAutoTitle),
                React.createElement("div", { className: "dsh-lg-pref-hint" }, t.inkAutoHint),
              ),
              React.createElement("button", {
                type: "button",
                className: "dsh-lg-pref-switch",
                role: "switch",
                "aria-checked": prefs.inkAuto !== false ? "true" : "false",
                "aria-label": t.inkAutoTitle,
                disabled: !prefs.enabled,
                onClick: setInkAuto,
              }),
            ),
          ),
          React.createElement("div", { className: "dsh-lg-pref-card" },
            heading(t.padGroup, t.padGroupHint),
            ...slider({
              id: "scrim",
              title: t.scrimTitle,
              hint: t.scrimHint,
              meta: `${prefs.scrim}%`,
              min: 0,
              max: 100,
              value: prefs.scrim,
              onChange: setScrim,
            }),
            ...slider({
              id: "scrimBlur",
              title: t.scrimBlurTitle,
              hint: t.scrimBlurHint,
              meta: `${prefs.scrimBlur}px`,
              min: 0,
              max: 40,
              value: prefs.scrimBlur,
              onChange: setScrimBlur,
            }),
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
            document.body.style.removeProperty("--lg-sat");
            document.body.style.removeProperty("--lg-contrast");
            document.body.style.removeProperty("--lg-bright");
            document.body.style.removeProperty("--lg-refract");
            document.body.style.removeProperty("--lg-scrim");
            document.body.style.removeProperty("--lg-scrim-blur");
            document.body.style.removeProperty("--lg-bg-color");
            document.body.style.removeProperty("--lg-rim-size");
            document.body.removeAttribute("data-lg-scrim");
            document.body.removeAttribute("data-lg-refract");
            document.body.removeAttribute("data-lg-bg");
            document.body.removeAttribute("data-lg-home");
            document.body.removeAttribute("data-lg-ink-auto");
            document.body.removeAttribute("data-lg-ink");
          }
          clearInk();
          resetWallCanvas();
        };

        const paint = (prefs) => {
          if (!prefs.enabled) {
            teardown();
            return;
          }
          mark(true);
          applyAlpha(prefs.opacity);
          applyBlur(prefs.blur);
          applyTone(prefs.sat, prefs.contrast, prefs.bright);
          applyRefract(prefs.refract, prefs.refractOn);
          applyScrim(prefs.scrim, prefs.scrimBlur);
          applyWallpaper(prefs.wallpaper);
          applyInkAuto(prefs.inkAuto);
          if (stopTokens) stopTokens();
          stopTokens = ctx.theme.overrideTokens(SOURCE, activeTokens(prefs.opacity));
          if (!stopChrome) stopChrome = startChrome();
          else syncRefraction();
          if (isColorWallpaper(prefs.wallpaper) || prefs.inkAuto === false) {
            requestInk(true);
          }
          ensureWallCanvas(prefs).then(() => requestInk(true));
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

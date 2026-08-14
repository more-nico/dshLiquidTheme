# dsh-liquid-glass

DeepSeek Harness Web UI 的 Liquid Glass 主题插件。加载后叠在官方浅色 / 深色 token 之上：深海虎鲸默认壁纸、霜玻璃、圆角折射、高光描边。折射算法来自 [shuding/liquid-glass](https://github.com/shuding/liquid-glass) 的圆角 SDF 置换。不替换 Appearance 里的「浅色 / 深色 / 跟随系统」。

仓库：[gitee.com/more_nico/dshLiquidTheme](https://gitee.com/more_nico/dshLiquidTheme)

## 安装

需要本机已能运行 `dsh web`（当前验证版本 `@deepseek-ai/dsh@0.1.0-rc.6`）。

```bash
dsh plugin --profile web add https://gitee.com/more_nico/dshLiquidTheme.git
```

本地开发：

```bash
dsh plugin --profile web add H:\WorkProj\grok_v46_test\dshLiquidTheme
```

然后重启 Web：

```bash
dsh web
```

打开 http://127.0.0.1:3080/ 。侧栏和会话顶栏应是留缝圆角的悬浮霜玻璃，输入条是玻璃胶囊。

## 卸载

```bash
dsh plugin --profile web remove dsh-liquid-glass
```

重启 `dsh web` 后恢复官方皮肤。

## 设置

打开侧栏 **设置**，左侧会多一页 **Liquid Glass**：

1. **启用 Liquid Glass** — 关掉后立刻恢复官方皮肤；本页还在，可以再打开。不是卸载插件。
2. **玻璃透明度** — 0–100%，同时作用在侧栏、顶栏、输入条、菜单、浮层等所有霜玻璃。
3. **玻璃模糊** — 0–40px，调节所有霜玻璃的 backdrop 模糊。默认 6px。折射打开时会再压低一点，好让边缘弯折看得见。
4. **折射玻璃** — 开关。关掉后所有折射层变成普通霜玻璃；强度数值会保留。
5. **折射强度** — 0–100%，圆角边缘把背后的壁纸 / 对话弯折。默认 30%。
6. **背景图** — 默认是内置 2K 深海虎鲸壁纸；可填 `http(s)` / `data:image` 地址、选一张本地图片，或指定纯色。恢复默认会回到虎鲸图。
7. **内容垫层透明度 / 模糊** — 只垫在用户气泡和 AI 正文上。思考 / 工具 / 搜索折叠时不垫，展开后才垫。起始页没有垫层。默认都是 0。

配置存在当前浏览器的 `localStorage`（键 `dsh-liquid-glass`），刷新后仍在。卸载插件不会自动清这项。

## 行为

- 只改材质，不改布局、slot、工具或模型请求
- 侧栏、会话顶栏、输入条做成 macOS 式悬浮液态玻璃（圆角、留缝、高光边、SDF 折射、`backdrop-filter`）
- 侧栏本身不加 `backdrop-filter` / `filter`，避免把设置弹层锁在栏宽里；折射只画在侧栏 `::before` 上
- 代码块 / diff / 终端保持较实的底
- `prefers-reduced-transparency: reduce` 时关掉模糊，改用实色
- 卸载插件即撤回 token 覆盖和 `data-liquid-glass`

## 兼容

针对 DSH Web 的 `--dsw-*` token 和 AppFrame 三栏结构。CSS Module 的 hash class 故意不绑。

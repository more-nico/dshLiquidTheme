# dsh-liquid-glass

DeepSeek Harness Web UI 的 Liquid Glass 主题插件。加载后叠在官方浅色 / 深色 token 之上：墙纸、霜玻璃、高光描边。不替换 Appearance 里的「浅色 / 深色 / 跟随系统」。

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

打开 http://127.0.0.1:3080/ 。首屏应能看到渐变墙纸和半透明侧栏。

## 卸载

```bash
dsh plugin --profile web remove dsh-liquid-glass
```

重启 `dsh web` 后恢复官方皮肤。

## 行为

- 只改材质，不改布局、slot、工具或模型请求
- 玻璃层按 [lucasromerodb/liquid-glass-effect-macos](https://github.com/lucasromerodb/liquid-glass-effect-macos)（[CodeSandbox nn5q2y](https://codesandbox.io/p/sandbox/nn5q2y)）的三层配方：SVG `feDisplacementMap` 折射 + 浅染色 + 内高光，模糊约 3px
- 代码块 / diff / 终端保持较实的底，避免糊字
- `prefers-reduced-transparency: reduce` 时关掉折射和 blur，改用实色
- 卸载插件即撤回 token 覆盖和 `data-liquid-glass`

## 兼容

针对 DSH Web 的 `--dsw-*` token 和 AppFrame 三栏结构。CSS Module 的 hash class 故意不绑。

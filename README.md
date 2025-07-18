# 猜数字游戏 🎮

一个用 Python 编写的彩色猜数字游戏，使用 `colorama` 库提供丰富的终端色彩效果。

我们用这个项目来学习 git clone 一个 GitHub的项目, 并且安装依赖和运行它.

## 游戏介绍

这是一个简单而有趣的猜数字游戏：
- 程序会随机生成一个 1 到 100 之间的数字
- 你需要猜测这个数字是多少
- 每次猜测后会有提示（太大或太小）
- 猜对后会显示你总共猜了多少次

## 环境要求

- Python 3.13 或更高版本
- uv 包管理器

## 安装和运行

### 1. 安装依赖

使用 `uv sync` 来安装项目依赖：

```bash
uv sync
```

### 2. 运行游戏

使用 `uv run` 来运行项目：

```bash
uv run guess_num.py
```

## 依赖包

- `colorama` - 用于终端彩色输出

## 游戏特色

游戏运行时会显示彩色的边框和提示信息，让游戏体验更加生动有趣！

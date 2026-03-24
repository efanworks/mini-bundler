## mini-bundler

`mini-bundler` 是一个极简 JavaScript 打包工具，专注于 CommonJS 场景。  
它把多个模块（`require` / `module.exports`）打包为一个可直接执行的 bundle，并内置最小运行时（`__my_require__` + 模块缓存）。

## 技术栈

- Node.js：文件读取、路径处理、CLI 执行环境
- Babel AST 工具链：
  - `@babel/parser`：将源码解析为 AST
  - `@babel/traverse`：收集依赖、遍历语法树
  - `@babel/generator`：将转换后的 AST 生成代码
- `commander`：实现命令行参数解析与命令入口

## 这个项目解决了什么问题

- 把分散的 CommonJS 模块合并成单文件，方便运行与分发
- 在浏览器侧模拟 Node 的 `require` 行为（模块查找、执行、导出）
- 通过模块缓存避免重复执行，并支持循环依赖的基础处理
- 以最小实现展示 bundler 核心原理，便于学习 webpack/runtime 思路

## 核心流程

1. 从入口文件开始解析源码
2. 扫描 `require(...)` 构建依赖图
3. 转换模块代码并生成模块工厂函数
4. 注入运行时模板（`require` + `cache`）
5. 输出最终 bundle 文件

## 安装依赖

```bash
npm install
```

## 打包示例项目

```bash
npm run build:example
```

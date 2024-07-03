# one-yige-vue

使用 uni-app 模仿实现 [ONE·一个](https://apps.apple.com/cn/app/one-%E4%B8%80%E4%B8%AA/id539190656)。目前测试过运行到 H5 和 Android App 端，理论上可支持更多平台（详见前端的 [package.json](./frontend/package.json) scripts 部分）。

技术栈：
- 前端：
  - [uni-app](https://uniapp.dcloud.net.cn/)
  - [UnoCSS](https://unocss.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
- 后端：
  - [NestJS](https://nestjs.com/)
  - SQLite 3 (使用 [TypeORM](https://typeorm.io) 操作数据库)
  - [TypeScript](https://www.typescriptlang.org/)

## 运行

首先安装 [Node.js](https://nodejs.org) 运行时，然后使用 `npm i -g pnpm` 命令安装 [pnpm](https://pnpm.io) 包管理器。

在文件夹中直接运行 `pnpm install` 即可安装前后端的依赖。

### 开发

开发模式下，前后端都支持热重载，保存代码会自动触发重载。

进入 `backend` 目录，运行下面的命令启动后端（默认监听 http://localhost:3000）。

```bash
$ pnpm start:dev
```

进入 `frontend` 目录，运行下面的命令，以开发模式运行前端。

> 注意：假如要在 Android 模拟器或者真机中运行，可能需要在 [frontend/src/api/index.ts](./frontend/src/api/index.ts) 中修改 `baseUrl` 中的 IP，改成你的电脑在内网中的 IP 地址。

```bash
# 查看 H5 效果，运行后打开 http://localhost:5173
$ pnpm dev:h5
# 查看 Android App 效果。运行后遵循终端的提示，使用 HBuilder X 打开构建后的文件夹，根据需要选择运行到模拟器或真机。
$ pnpm dev:app-android
```

# 编译

```bash
cd backend
pnpm build
node dist/main.js

cd ../frontend
# 假如要编译 H5 端
pnpm build:h5
# 假如要编译 Android App 端（编译后根据提示在 HBuilder X 中打开产物文件夹，再进行打包等操作）
pnpm build:app-android
```

假如前端构建的是 H5 端，将 [frontend/dist](./frontend/dist) 文件夹中的内容部署服务器上，即可访问。也可以运行 `npx -y serve frontend/dist` 命令在本地查看运行效果。
# 🧭 指南针APP

一个功能完善的Android指南针应用，支持GPS定位、方向传感器、PWA安装等功能！

## ✨ 功能特点

- 🧭 **实时指南针** - 精确的方向指示和角度显示
- 📍 **GPS定位** - 显示当前位置、经纬度和海拔
- 📱 **PWA支持** - 可直接添加到手机桌面
- 🎨 **精美UI** - 深色主题 + 琥珀色罗盘
- ⚡ **高性能** - 流畅的动画效果

## 🚀 快速开始

### 方式一：构建APK（推荐）

查看 [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) 获取完整的APK构建指南。

```bash
# 使用自动化脚本
./deploy-to-github.sh "你的GitHub用户名" "compass-app"
```

### 方式二：本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📁 项目结构

```
/workspace/
├── src/                      # 源代码
│   ├── pages/               # 页面组件
│   ├── components/          # UI组件
│   ├── hooks/               # React Hooks
│   └── utils/               # 工具函数
├── android/                 # Android项目
├── dist/                    # 生产构建
├── .github/workflows/       # GitHub Actions
└── ...
```

## 📋 文档

- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - APK构建完整指南
- [GITHUB_BUILD_GUIDE.md](GITHUB_BUILD_GUIDE.md) - GitHub构建指南
- [project-summary.md](project-summary.md) - 项目总结
- [.trae/documents/](.trae/documents/) - PRD和技术文档

## 📄 License

MIT

# 指南针APP - GitHub Actions 构建指南

## 📦 如何使用 GitHub Actions 构建 APK

### 第一步：准备项目

1. **创建 GitHub 仓库**
   - 访问 https://github.com/new
   - 创建一个新仓库（可以是私有的）

2. **初始化 Git 仓库**
   ```bash
   cd /workspace
   git init
   git add .
   git commit -m "Initial commit - Compass App"
   git branch -M main
   ```

3. **推送到 GitHub**
   ```bash
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git push -u origin main
   ```

### 第二步：触发构建

1. **访问你的 GitHub 仓库**
2. **点击 "Actions" 标签**
3. **在左侧选择 "Build Android APK"**
4. **点击 "Run workflow" 按钮**
5. **选择分支（main）并点击 "Run workflow"**

### 第三步：下载 APK

1. **等待构建完成**（通常需要 5-10 分钟）
2. **在构建结果页面，找到 "Artifacts" 部分**
3. **点击 "compass-app-apk" 下载**
4. **解压 ZIP 文件，你会得到 `app-debug.apk`**

### 第四步：安装到手机

1. **将 APK 文件传输到手机**
2. **在手机上安装**（需要允许"未知来源"应用）
3. **安装完成后，授予权限**
4. **开始使用指南针！**

## 🔧 项目文件说明

### 关键文件位置
- **构建配置**：[`.github/workflows/build-apk.yml`](file:///workspace/.github/workflows/build-apk.yml)
- **Android 项目**：[`android/`](file:///workspace/android/)
- **PWA 应用**：[`dist/`](file:///workspace/dist/)
- **主页面**：[`src/pages/Home.tsx`](file:///workspace/src/pages/Home.tsx)

### 应用权限
- **方向传感器** - 用于指南针
- **GPS定位** - 用于显示位置
- **网络** - 用于加载资源（可选）

## 📱 功能介绍

### 核心功能
- 🧭 **实时指南针** - 精确显示方向
- 📍 **GPS定位** - 显示当前位置
- 📐 **角度显示** - 精确到度数
- 📏 **方向文字** - 显示如"北"、"东"等文字

### 使用提示
- 保持手机水平以获得最佳精度
- 远离磁性干扰（电子设备、金属物体）
- 在户外使用效果最佳

## 🐛 故障排除

### 构建失败
- 检查 GitHub Actions 日志
- 确保所有文件已正确提交
- 尝试重新运行工作流

### 应用无法安装
- 确保手机允许安装未知来源应用
- 尝试清除浏览器缓存
- 使用不同的浏览器

### 指南针不工作
- 确保授予了所有权限
- 尝试重启应用
- 检查手机是否支持方向传感器

## 🎉 下一步

- 可以修改应用图标
- 可以修改应用名称
- 可以添加更多功能（如地图、保存位置等）

祝你使用愉快！

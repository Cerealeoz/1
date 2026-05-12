# 🧭 指南针APP - APK构建完整指南

## 📋 目录
1. [快速开始](#-快速开始)
2. [详细步骤](#-详细步骤)
3. [故障排除](#-故障排除)

---

## 🚀 快速开始

### 方式一：使用自动化脚本（推荐）

```bash
# 运行部署脚本
./deploy-to-github.sh "你的GitHub用户名" "仓库名"

# 示例
./deploy-to-github.sh "myusername" "compass-app"
```

### 方式二：手动部署

按照下面的详细步骤操作。

---

## 📝 详细步骤

### 第一步：准备GitHub仓库

1. **访问 GitHub**：https://github.com
2. **登录你的账号**（如果没有，先注册一个）
3. **创建新仓库**：
   - 点击右上角的 "+" 号
   - 选择 "New repository"
   - 输入仓库名称（例如：`compass-app`）
   - 选择 "Public" 或 "Private"（都可以）
   - **不要**勾选 "Initialize this repository with a README"
   - 点击 "Create repository"

### 第二步：推送到GitHub

#### 如果你有这个脚本：
```bash
./deploy-to-github.sh "你的GitHub用户名" "compass-app"
```

#### 或者手动操作：

```bash
# 1. 进入项目目录
cd /workspace

# 2. 初始化Git（如果还没有）
git init
git branch -M main

# 3. 添加文件
git add .

# 4. 提交
git commit -m "Initial commit - Compass App"

# 5. 添加远程仓库
git remote add origin https://github.com/你的用户名/你的仓库名.git

# 6. 推送到GitHub
git push -u origin main
```

### 第三步：在GitHub上构建APK

1. **访问你的GitHub仓库**
   - 打开 https://github.com/你的用户名/你的仓库名

2. **打开 Actions**
   - 点击页面顶部的 "Actions" 标签

3. **运行构建工作流**
   - 在左侧找到 "Build Android APK"
   - 点击它
   - 点击 "Run workflow" 按钮（在右侧）
   - 选择 "main" 分支
   - 点击绿色的 "Run workflow" 按钮

4. **等待构建完成**
   - 构建通常需要 **5-10分钟**
   - 你可以看到进度条和实时日志

5. **下载APK**
   - 构建完成后，点击工作流运行记录
   - 滚动到底部找到 "Artifacts" 部分
   - 点击 "compass-app-apk" 下载
   - 解压 ZIP 文件，你会得到 `app-debug.apk`

### 第四步：安装到手机

1. **传输APK到手机**
   - 使用USB数据线
   - 或者通过微信/QQ/邮件发送
   - 或者使用云盘分享

2. **在手机上安装**
   - 找到APK文件
   - 点击安装
   - 如果提示"未知来源"，需要在设置中允许

3. **开始使用！**
   - 打开应用
   - 授予方向传感器和位置权限
   - 享受你的指南针APP！

---

## 🔍 故障排除

### 问题1：推送失败
**错误信息**：`remote: Repository not found`

**解决方案**：
1. 确认你的GitHub用户名和仓库名正确
2. 确认仓库已创建
3. 检查Git远程地址是否正确：
   ```bash
   git remote -v
   # 如果不对，更新它
   git remote set-url origin https://github.com/你的用户名/你的仓库名.git
   ```

### 问题2：需要身份验证
**错误信息**：`Authentication failed`

**解决方案**：
1. 使用Personal Access Token（推荐）：
   - 访问 https://github.com/settings/tokens
   - 生成新token（需要repo权限）
   - 推送时使用token作为密码
2. 或者使用SSH密钥认证

### 问题3：Actions构建失败
**解决方案**：
1. 查看Actions中的详细日志
2. 确保所有文件都已正确提交
3. 尝试重新运行工作流
4. 检查 `.github/workflows/build-apk.yml` 文件是否存在

### 问题4：APK安装失败
**解决方案**：
1. 确保手机允许安装未知来源应用
2. 尝试卸载旧版本再安装
3. 检查APK文件是否完整

### 问题5：指南针不工作
**解决方案**：
1. 确保授予了所有权限
2. 将手机水平放置
3. 远离磁性物体（如磁铁、电器）
4. 尝试在户外使用

---

## 📱 应用功能介绍

### 核心功能
- 🧭 **实时指南针** - 精确的方向指示
- 📍 **GPS定位** - 显示当前位置坐标
- 📐 **角度显示** - 精确到度数
- 🌐 **方向文字** - 直观的文字描述

### 使用技巧
- 保持手机水平获得最佳精度
- 在户外使用GPS定位更准确
- 首次使用可能需要校准

---

## 🎯 下一步

- 可以修改应用图标和名称
- 可以添加更多功能（如地图集成）
- 可以构建发布版本的APK（非debug）
- 可以上传到应用商店

---

## 🆘 需要帮助？

如果遇到问题：
1. 查看本文档的故障排除部分
2. 检查GitHub Actions的构建日志
3. 参考 `GITHUB_BUILD_GUIDE.md` 和 `project-summary.md`

祝你使用愉快！🎊

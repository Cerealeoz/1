#!/bin/bash

# 指南针APP - GitHub部署脚本
# 使用方法: ./deploy-to-github.sh "你的用户名" "仓库名"

set -e

echo "🧭 指南针APP - GitHub部署工具"
echo "================================"

# 检查参数
if [ $# -lt 2 ]; then
    echo "使用方法: $0 <GitHub用户名> <仓库名>"
    echo "示例: $0 john-doe compass-app"
    exit 1
fi

GITHUB_USER="$1"
REPO_NAME="$2"
REPO_URL="https://github.com/$GITHUB_USER/$REPO_NAME.git"

echo "📦 准备部署到: $REPO_URL"

# 检查Git是否安装
if ! command -v git &> /dev/null; then
    echo "❌ 错误: Git未安装，请先安装Git"
    exit 1
fi

# 检查是否已初始化Git
if [ ! -d .git ]; then
    echo "🔧 初始化Git仓库..."
    git init
    git branch -M main
else
    echo "✅ Git仓库已存在"
fi

# 检查是否已有远程仓库
if git remote | grep -q "origin"; then
    echo "⚠️  已存在远程仓库，正在更新..."
    git remote set-url origin "$REPO_URL"
else
    echo "🔗 添加远程仓库..."
    git remote add origin "$REPO_URL"
fi

# 添加所有文件
echo "📁 添加文件到Git..."
git add .

# 提交
echo "✍️  提交更改..."
if git commit -m "Initial commit - Compass App" 2>/dev/null; then
    echo "✅ 提交成功"
else
    echo "ℹ️  没有新的更改需要提交"
fi

# 推送到GitHub
echo "🚀 推送到GitHub..."
echo "请在浏览器中完成身份验证"
git push -u origin main || {
    echo ""
    echo "❌ 推送失败！"
    echo "请按以下步骤操作："
    echo "1. 访问 https://github.com/new 创建新仓库 '$REPO_NAME'"
    echo "2. 确保仓库是公开的或私有的（根据你的需要）"
    echo "3. 创建完成后，再次运行此脚本"
    echo ""
    echo "或者手动执行："
    echo "   git push -u origin main"
    exit 1
}

echo ""
echo "✅ 部署成功！"
echo ""
echo "📋 接下来的步骤："
echo "1. 访问你的仓库: $REPO_URL"
echo "2. 点击 'Actions' 标签"
echo "3. 选择 'Build Android APK' 工作流"
echo "4. 点击 'Run workflow' 按钮"
echo "5. 等待5-10分钟，下载生成的APK"
echo ""
echo "详细说明请查看 GITHUB_BUILD_GUIDE.md"
echo ""

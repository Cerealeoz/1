#!/bin/bash

# 安装Android SDK
if [ ! -d "$HOME/android-sdk" ]; then
  echo "正在安装Android SDK..."
  mkdir -p $HOME/android-sdk
  cd $HOME/android-sdk
  
  # 下载命令行工具
  wget -q https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
  unzip -q commandlinetools-linux-11076708_latest.zip
  mkdir -p cmdline-tools/latest
  mv cmdline-tools/* cmdline-tools/latest/ 2>/dev/null || true
  
  # 设置环境变量
  export ANDROID_HOME=$HOME/android-sdk
  export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools
  
  # 安装必要的SDK组件
  yes | sdkmanager --licenses
  sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"
fi

# 设置环境变量
export ANDROID_HOME=$HOME/android-sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools

# 返回项目目录
cd /workspace

# 构建APK
cd android
./gradlew assembleDebug

# 复制APK到输出目录
mkdir -p /workspace/output
cp app/build/outputs/apk/debug/app-debug.apk /workspace/output/指南针APP.apk

echo "APK构建完成！"
echo "文件位置: /workspace/output/指南针APP.apk"

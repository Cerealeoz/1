# 指南针APP技术架构文档

## 1. 架构设计

```
┌─────────────────────────────────────────┐
│           用户界面层 (UI)                │
│  React Components + Tailwind CSS        │
│  - Compass罗盘组件                      │
│  - DirectionDisplay方向显示组件         │
│  - CoordinatesPanel坐标面板组件          │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         状态管理层 (State)               │
│  React Hooks (useState, useEffect)      │
│  - 方向状态管理                          │
│  - 坐标状态管理                          │
│  - 校准状态管理                          │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│          硬件API层 (API)                 │
│  - DeviceOrientation API                │
│  - Geolocation API                      │
│  - Screen Orientation API               │
└─────────────────────────────────────────┘
```

## 2. 技术栈

### 前端框架
- **React**: 18.2.0 - 现代化UI框架
- **Tailwind CSS**: 3.4.0 - 原子化CSS方案
- **Vite**: 5.0.0 - 快速构建工具
- **TypeScript**: 5.3.0 - 类型安全

### 外部依赖
- `react-icons`: 4.12.0 - 图标库
- `lucide-react`: 0.294.0 - 现代图标

### 开发工具
- ESLint: 代码规范检查
- Prettier: 代码格式化

## 3. 组件结构

```
src/
├── components/
│   ├── Compass/
│   │   ├── Compass.tsx          # 罗盘主组件
│   │   │   ├── CompassCircle    # 罗盘圆圈
│   │   │   ├── CompassNeedle    # 指南针指针
│   │   │   ├── CompassMarks     # 刻度标记
│   │   │   └── DirectionLabels  # 方向标签
│   │   └── Compass.css
│   │
│   ├── DirectionDisplay/
│   │   ├── DirectionDisplay.tsx  # 方向文字显示
│   │   └── AngleIndicator.tsx    # 角度指示器
│   │
│   └── CoordinatesPanel/
│       ├── CoordinatesPanel.tsx  # 坐标面板
│       └── LocationCard.tsx      # 位置卡片
│
├── hooks/
│   ├── useCompass.ts             # 指南针方向hook
│   ├── useGeolocation.ts        # GPS定位hook
│   └── useDeviceOrientation.ts   # 设备方向hook
│
├── utils/
│   ├── compassUtils.ts           # 指南针工具函数
│   └── geoUtils.ts               # 地理工具函数
│
├── App.tsx                       # 主应用
├── main.tsx                      # 入口文件
└── index.css                     # 全局样式
```

## 4. 核心功能实现

### 4.1 方向检测
```typescript
// 使用DeviceOrientation API
interface Orientation {
  alpha: number;  // 绕Z轴旋转 (0-360)
  beta: number;   // 绕X轴旋转 (-180-180)
  gamma: number;  // 绕Y轴旋转 (-90-90)
}

// 磁北方向计算
const calculateHeading = (alpha: number, beta: number, gamma: number) => {
  // 根据设备方向计算实际北方角度
  return (360 - alpha + beta) % 360;
};
```

### 4.2 方向名称映射
```typescript
const directions = [
  { min: 337.5, max: 360, name: '北' },
  { min: 292.5, max: 337.5, name: '西北' },
  { min: 247.5, max: 292.5, name: '西' },
  { min: 202.5, max: 247.5, name: '西南' },
  { min: 157.5, max: 202.5, name: '南' },
  { min: 112.5, max: 157.5, name: '东南' },
  { min: 67.5, max: 112.5, name: '东' },
  { min: 22.5, max: 67.5, name: '东北' },
  { min: 0, max: 22.5, name: '北' },
];
```

### 4.3 地理定位
```typescript
// 使用Geolocation API
interface Coordinates {
  latitude: number;   // 纬度
  longitude: number;  // 经度
  altitude: number;   // 海拔
  accuracy: number;   // 精度
}

// 定时更新位置
navigator.geolocation.watchPosition(
  (position) => {
    setCoordinates({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      altitude: position.coords.altitude || 0,
      accuracy: position.coords.accuracy,
    });
  },
  handleError,
  { enableHighAccuracy: true }
);
```

## 5. 样式设计

### 5.1 颜色系统
```css
:root {
  --color-primary: #1a365d;      /* 深蓝色 */
  --color-accent: #f59e0b;       /* 琥珀金色 */
  --color-north: #ef4444;        /* 红色-北方 */
  --color-text: #1e293b;         /* 深灰色 */
  --color-bg-light: #e2e8f0;     /* 浅灰蓝 */
  --color-bg-dark: #0f172a;      /* 深色背景 */
}
```

### 5.2 响应式断点
```css
/* 手机优先设计 */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
```

### 5.3 动画效果
```css
/* 罗盘旋转动画 */
.compass-needle {
  transition: transform 0.1s ease-out;
}

/* 渐变背景动画 */
.background-gradient {
  animation: gradient-shift 10s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

## 6. PWA配置

### 6.1 manifest.json
```json
{
  "name": "指南针APP",
  "short_name": "指南针",
  "description": "简洁实用的指南针应用",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a365d",
  "theme_color": "#f59e0b",
  "orientation": "portrait"
}
```

### 6.2 Service Worker
- 缓存静态资源
- 离线支持
- 后台同步

## 7. 权限请求

### 7.1 设备方向权限 (iOS 13+)
```typescript
if (typeof DeviceOrientationEvent.requestPermission === 'function') {
  const permission = await DeviceOrientationEvent.requestPermission();
  if (permission === 'granted') {
    // 启用方向监听
  }
}
```

### 7.2 地理位置权限
```typescript
navigator.geolocation.requestPermission?.() || 
navigator.permissions.query({ name: 'geolocation' });
```

## 8. 性能优化

### 8.1 代码分割
- 使用React.lazy()延迟加载组件
- 按需加载地图组件

### 8.2 渲染优化
- 使用React.memo()优化组件
- 避免不必要的重渲染
- CSS动画代替JS动画

### 8.3 资源优化
- 图片懒加载
- SVG图标代替PNG
- CSS压缩和Tree-shaking

## 9. 错误处理

### 9.1 方向传感器不可用
```typescript
if (!window.DeviceOrientationEvent) {
  setError('您的设备不支持方向传感器');
}
```

### 9.2 权限被拒绝
```typescript
if (error.code === error.PERMISSION_DENIED) {
  setError('请允许访问方向传感器以使用指南针');
}
```

### 9.3 GPS不可用
```typescript
if (!navigator.geolocation) {
  setGpsAvailable(false);
}
```

## 10. 浏览器兼容性

| 功能 | Chrome | Safari | Firefox | Edge |
|------|--------|--------|---------|------|
| DeviceOrientation | ✅ | ✅* | ✅ | ✅ |
| Geolocation | ✅ | ✅ | ✅ | ✅ |
| PWA | ✅ | ✅ | ✅ | ✅ |

*iOS需要用户授权

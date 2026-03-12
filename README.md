# AI Key 管理工具

一个简洁高效的AI服务API密钥管理工具，支持添加、删除、复制密钥，并一键跳转到各服务的官方Key管理页面。

## 功能特性

✨ **多服务支持** - 支持12个主流AI服务的密钥管理
- OpenAI、Anthropic、Google AI、Azure OpenAI
- Cohere、Hugging Face、Replicate、Stability AI
- Midjourney、百度千帆、阿里云通义、腾讯混元

🔐 **安全存储** - 所有密钥存储在浏览器本地，不上传到任何服务器

📋 **便捷操作** - 一键复制密钥，快速跳转到官方管理页面

🎨 **美观界面** - 现代化设计，响应式布局，支持深色主题

## 使用方法

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm build
```

### 预览生产构建

```bash
npm run preview
```

## 操作说明

1. **添加密钥**：点击右上角"添加密钥"按钮，选择服务并输入密钥
2. **复制密钥**：点击密钥旁边的"复制"按钮
3. **删除密钥**：点击密钥右侧的垃圾桶图标
4. **跳转管理页**：点击服务卡片上的"管理页面"按钮，直接跳转到该服务的官方Key管理页面

## 数据安全

- 所有数据存储在浏览器的 localStorage 中
- 不会上传到任何服务器
- 密钥以掩码形式显示，只有复制时才显示完整密钥
- 清除浏览器缓存会删除所有数据

## 技术栈

- React 18
- Vite
- Tailwind CSS
- Lucide React Icons

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## License

MIT

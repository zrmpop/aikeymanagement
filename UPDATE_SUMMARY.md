# 功能更新总结

## 更新时间
2026-03-17

## 本次更新内容

### 1. 新增三个 AI 服务支持
在 AI_SERVICES 配置中添加了以下三个新服务：

- **MiniMax** (🎬)
  - 密钥管理页面: https://api.minimax.chat/user-center/basic-information/interface-key
  - API 基础 URL: https://api.minimax.chat/v1
  - 颜色主题: 粉色到玫瑰色渐变
  - 描述: MiniMax AI模型

- **Bocha** (🌐)
  - 密钥管理页面: https://bochaai.com
  - API 基础 URL: https://api.bochaai.com/v1
  - 颜色主题: 青色到蓝绿色渐变
  - 描述: Bocha AI服务

- **Gemini** (💎)
  - 密钥管理页面: https://console.cloud.google.com/apis/credentials
  - API 基础 URL: https://generativelanguage.googleapis.com/v1beta
  - 颜色主题: 紫色到蓝色渐变
  - 描述: Google Gemini模型

### 2. 实现密钥导入功能
新增从 JSON 文件批量导入密钥的功能：

- **导入按钮位置**: 页面顶部的快捷操作区，位于"导出 CSV"按钮旁边
- **按钮样式**: 琥珀色主题，带有上传图标
- **支持格式**: JSON 文件
- **导入逻辑**:
  - 自动识别服务名称（支持中英文名称）
  - 自动匹配服务配置
  - 保留原有密钥数据（服务名称、密钥名称、密钥值、备注、添加时间、base_url）
  - 如果服务不存在，会显示为"未知服务"
  - 导入后显示成功/失败统计

### 3. 导入文件格式
```json
[
  {
    "服务名称": "服务名称",
    "密钥名称": "密钥名称",
    "密钥值": "API密钥值",
    "备注": "备注信息",
    "添加时间": "添加时间",
    "base_url": "基础URL"
  }
]
```

### 4. 使用方法
1. 点击页面顶部的"导入密钥"按钮
2. 选择包含密钥的 JSON 文件
3. 系统自动解析并导入密钥
4. 导入成功后会显示通知

### 5. 代码变更
- 文件: `src/App.jsx`
- 变更内容:
  - 导入 `useRef` 和 `Upload` 图标
  - 添加 `fileInputRef` 引用
  - 新增 `handleImportFromJSON` 函数处理文件导入
  - 新增 `triggerImport` 函数触发文件选择
  - 在界面中添加导入按钮和隐藏的文件输入框
  - 在 AI_SERVICES 数组中添加三个新服务配置

### 6. GitHub 提交
- 仓库: https://github.com/zrmpop/aikeymanagement.git
- 提交信息: "feat: 添加 MiniMax、Bocha、Gemini 三个新服务支持"
- 提交 ID: 22296e8

### 7. 测试文件
创建了测试文件 `test_import.json`，包含三个新服务的测试密钥数据，用于验证导入功能。

## 注意事项
- 密钥数据存储在 localStorage 中，不会提交到 GitHub
- 测试文件 `test_import.json` 未提交到版本控制
- 导入时会检查密钥值是否为空，空值不会导入
- 支持批量导入，可以一次性导入多个密钥

import React, { useState, useEffect, useRef } from 'react'
import { Plus, Trash2, ExternalLink, Copy, CheckCircle2, XCircle, Search, Filter, ChevronDown, ChevronUp, Download, Upload } from 'lucide-react'

// 示例密钥数据（仅用于演示，实际使用时请通过界面添加自己的密钥）
const EXAMPLE_KEYS = [
  {
    serviceId: 'openai',
    keyName: 'OpenAI API Key (示例)',
    keyValue: 'sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    note: '请替换为真实的API密钥'
  },
  {
    serviceId: 'google',
    keyName: 'Google AI Studio Key (示例)',
    keyValue: 'AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    note: '请替换为真实的API密钥'
  }
]

// 预设的AI服务配置
const AI_SERVICES = [
  {
    id: 'openai',
    name: 'OpenAI',
    icon: '🤖',
    keyManagementUrl: 'https://platform.openai.com/api-keys',
    baseUrl: 'https://api.openai.com/v1',
    color: 'from-green-500 to-emerald-600',
    description: 'GPT-4、GPT-3.5等模型'
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    icon: '🧠',
    keyManagementUrl: 'https://console.anthropic.com/settings/keys',
    baseUrl: 'https://api.anthropic.com/v1',
    color: 'from-orange-500 to-red-600',
    description: 'Claude系列模型'
  },
  {
    id: 'google',
    name: 'Google AI',
    icon: '🔍',
    keyManagementUrl: 'https://makersuite.google.com/app/apikey',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    color: 'from-blue-500 to-cyan-600',
    description: 'Gemini、PaLM等模型'
  },
  {
    id: 'azure',
    name: 'Azure OpenAI',
    icon: '☁️',
    keyManagementUrl: 'https://portal.azure.com/#view/Microsoft_Azure_ProjectOxford/CognitiveServicesHub/~/OpenAI',
    baseUrl: 'https://your-resource.openai.azure.com',
    color: 'from-blue-600 to-indigo-600',
    description: 'Azure托管的OpenAI服务'
  },
  {
    id: 'cohere',
    name: 'Cohere',
    icon: '💬',
    keyManagementUrl: 'https://dashboard.cohere.ai/api-keys',
    baseUrl: 'https://api.cohere.ai/v1',
    color: 'from-purple-500 to-pink-600',
    description: '文本生成和理解模型'
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    icon: '🤗',
    keyManagementUrl: 'https://huggingface.co/settings/tokens',
    baseUrl: 'https://api-inference.huggingface.co',
    color: 'from-yellow-500 to-orange-600',
    description: '开源模型和API'
  },
  {
    id: 'replicate',
    name: 'Replicate',
    icon: '🎨',
    keyManagementUrl: 'https://replicate.com/account/api-tokens',
    baseUrl: 'https://api.replicate.com/v1',
    color: 'from-pink-500 to-rose-600',
    description: '运行开源机器学习模型'
  },
  {
    id: 'stability',
    name: 'Stability AI',
    icon: '🖼️',
    keyManagementUrl: 'https://platform.stability.ai/account/keys',
    baseUrl: 'https://api.stability.ai/v1',
    color: 'from-violet-500 to-purple-600',
    description: 'Stable Diffusion等图像模型'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    icon: '🎭',
    keyManagementUrl: 'https://www.midjourney.com/account',
    baseUrl: 'https://api.mjourney.com',
    color: 'from-indigo-500 to-blue-600',
    description: 'AI图像生成'
  },
  {
    id: 'baidu',
    name: '百度千帆',
    icon: '🐼',
    keyManagementUrl: 'https://console.bce.baidu.com/qianfan/ais/console/applicationConsole/application',
    baseUrl: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1',
    color: 'from-blue-400 to-blue-600',
    description: '文心一言等中文模型'
  },
  {
    id: 'alibaba',
    name: '阿里云通义',
    icon: '🌟',
    keyManagementUrl: 'https://dashscope.console.aliyun.com/apiKey',
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    color: 'from-orange-400 to-red-500',
    description: '通义千问等模型'
  },
  {
    id: 'tencent',
    name: '腾讯混元',
    icon: '🚀',
    keyManagementUrl: 'https://console.cloud.tencent.com/hunyuan/apikey',
    baseUrl: 'https://hunyuan.tencentcloudapi.com',
    color: 'from-blue-500 to-green-600',
    description: '混元大模型'
  },
  {
    id: 'tencent_ti',
    name: '腾讯云TI',
    icon: '💠',
    keyManagementUrl: 'https://console.cloud.tencent.com/ti/apikey',
    baseUrl: 'https://ti.tencentcloudapi.com',
    color: 'from-cyan-500 to-blue-600',
    description: '腾讯云TI平台'
  },
  {
    id: 'zhipu',
    name: '智谱AI',
    icon: '🎯',
    keyManagementUrl: 'https://bigmodel.cn/usercenter/proj-mgmt/apikeys',
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    color: 'from-red-500 to-pink-600',
    description: 'GLM系列模型'
  },
  {
    id: 'moonshot',
    name: '月之暗面',
    icon: '🌙',
    keyManagementUrl: 'https://platform.moonshot.cn/console/api-keys',
    baseUrl: 'https://api.moonshot.cn/v1',
    color: 'from-purple-600 to-indigo-600',
    description: 'KIMI系列模型'
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    icon: '🔬',
    keyManagementUrl: 'https://platform.deepseek.com/api_keys',
    baseUrl: 'https://api.deepseek.com/v1',
    color: 'from-emerald-500 to-teal-600',
    description: '深度求索AI模型'
  },
  {
    id: 'siliconflow',
    name: 'SiliconFlow',
    icon: '⚡',
    keyManagementUrl: 'https://cloud.siliconflow.cn/account/ak',
    baseUrl: 'https://api.siliconflow.cn/v1',
    color: 'from-amber-500 to-orange-600',
    description: '硅基流动AI平台'
  },
  {
    id: 'volcengine_ark',
    name: '火山方舟',
    icon: '🌋',
    keyManagementUrl: 'https://console.volcengine.com/ark/region:ark+cn-beijing/apikey',
    baseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
    color: 'from-red-600 to-orange-600',
    description: '字节跳动大模型平台'
  },
  {
    id: 'feishu',
    name: '飞书',
    icon: '📱',
    keyManagementUrl: 'https://open.feishu.cn/app',
    baseUrl: 'https://open.feishu.cn/open-apis',
    color: 'from-blue-500 to-indigo-500',
    description: '飞书开放平台'
  },
  {
    id: 'minimax',
    name: 'MiniMax',
    icon: '🎬',
    keyManagementUrl: 'https://api.minimax.chat/user-center/basic-information/interface-key',
    baseUrl: 'https://api.minimax.chat/v1',
    color: 'from-pink-500 to-rose-600',
    description: 'MiniMax AI模型'
  },
  {
    id: 'bocha',
    name: 'Bocha',
    icon: '🌐',
    keyManagementUrl: 'https://bochaai.com',
    baseUrl: 'https://api.bochaai.com/v1',
    color: 'from-teal-500 to-cyan-600',
    description: 'Bocha AI服务'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    icon: '💎',
    keyManagementUrl: 'https://console.cloud.google.com/apis/credentials',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    color: 'from-purple-500 to-blue-600',
    description: 'Google Gemini模型'
  },
  // ── 国际平台 ──
  {
    id: 'mistral',
    name: 'Mistral AI',
    icon: '🌪️',
    keyManagementUrl: 'https://console.mistral.ai/api-keys/',
    baseUrl: 'https://api.mistral.ai/v1',
    color: 'from-orange-500 to-amber-600',
    description: 'Mistral 系列开源模型'
  },
  {
    id: 'groq',
    name: 'Groq',
    icon: '⚡',
    keyManagementUrl: 'https://console.groq.com/keys',
    baseUrl: 'https://api.groq.com/openai/v1',
    color: 'from-lime-500 to-green-600',
    description: '超高速推理平台'
  },
  {
    id: 'together',
    name: 'Together AI',
    icon: '🤝',
    keyManagementUrl: 'https://api.together.xyz/settings/api-keys',
    baseUrl: 'https://api.together.xyz/v1',
    color: 'from-sky-500 to-blue-600',
    description: '开源模型云端推理'
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    icon: '🔎',
    keyManagementUrl: 'https://www.perplexity.ai/settings/api',
    baseUrl: 'https://api.perplexity.ai',
    color: 'from-teal-500 to-cyan-600',
    description: 'Sonar 搜索增强模型'
  },
  {
    id: 'xai',
    name: 'xAI (Grok)',
    icon: '𝕏',
    keyManagementUrl: 'https://console.x.ai/',
    baseUrl: 'https://api.x.ai/v1',
    color: 'from-slate-600 to-zinc-800',
    description: 'Grok 系列模型'
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    icon: '🔀',
    keyManagementUrl: 'https://openrouter.ai/keys',
    baseUrl: 'https://openrouter.ai/api/v1',
    color: 'from-violet-500 to-purple-700',
    description: '统一路由多家模型'
  },
  {
    id: 'fireworks',
    name: 'Fireworks AI',
    icon: '🎆',
    keyManagementUrl: 'https://app.fireworks.ai/users/settings/access-tokens',
    baseUrl: 'https://api.fireworks.ai/inference/v1',
    color: 'from-red-500 to-orange-600',
    description: '快速开源模型推理'
  },
  {
    id: 'novita',
    name: 'Novita AI',
    icon: '🌸',
    keyManagementUrl: 'https://novita.ai/settings#key-management',
    baseUrl: 'https://api.novita.ai/v3/openai',
    color: 'from-pink-400 to-rose-500',
    description: '低价开源模型 API'
  },
  {
    id: 'cerebras',
    name: 'Cerebras',
    icon: '🧩',
    keyManagementUrl: 'https://cloud.cerebras.ai/platform/settings/api-keys',
    baseUrl: 'https://api.cerebras.ai/v1',
    color: 'from-blue-600 to-indigo-700',
    description: 'Cerebras 超快推理'
  },
  // ── 国内平台 ──
  {
    id: 'iflytek',
    name: '讯飞星火',
    icon: '✨',
    keyManagementUrl: 'https://console.xfyun.cn/services/cbm',
    baseUrl: 'https://spark-api-open.xf-yun.com/v1',
    color: 'from-blue-500 to-sky-600',
    description: '讯飞星火大模型'
  },
  {
    id: 'baichuan',
    name: '百川AI',
    icon: '🏔️',
    keyManagementUrl: 'https://platform.baichuan-ai.com/console/apikey',
    baseUrl: 'https://api.baichuan-ai.com/v1',
    color: 'from-emerald-500 to-green-700',
    description: '百川系列大模型'
  },
  {
    id: '01ai',
    name: '零一万物',
    icon: '0️⃣',
    keyManagementUrl: 'https://platform.lingyiwanwu.com/apikeys',
    baseUrl: 'https://api.lingyiwanwu.com/v1',
    color: 'from-gray-600 to-slate-700',
    description: 'Yi 系列大模型'
  },
  {
    id: 'stepfun',
    name: '阶跃星辰',
    icon: '🪐',
    keyManagementUrl: 'https://platform.stepfun.com/interface-key',
    baseUrl: 'https://api.stepfun.com/v1',
    color: 'from-indigo-500 to-violet-600',
    description: 'Step 系列大模型'
  },
  {
    id: 'sensenova',
    name: '商汤日日新',
    icon: '🏢',
    keyManagementUrl: 'https://console.sensecore.cn/iam',
    baseUrl: 'https://api.sensenova.cn/v1/llm',
    color: 'from-red-600 to-rose-700',
    description: '商汤 SenseNova 模型'
  },
  {
    id: 'hunyuan',
    name: '混元大模型',
    icon: '🌀',
    keyManagementUrl: 'https://console.cloud.tencent.com/hunyuan/apikey',
    baseUrl: 'https://api.hunyuan.cloud.tencent.com/v1',
    color: 'from-cyan-500 to-blue-600',
    description: '腾讯混元（OpenAI 兼容）'
  },
  {
    id: 'doubao',
    name: '豆包',
    icon: '🫘',
    keyManagementUrl: 'https://console.volcengine.com/ark/region:ark+cn-beijing/apikey',
    baseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
    color: 'from-green-500 to-teal-600',
    description: '字节豆包大模型'
  },
  {
    id: 'cloudflare_ai',
    name: 'Cloudflare AI',
    icon: '☁️',
    keyManagementUrl: 'https://dash.cloudflare.com/profile/api-tokens',
    baseUrl: 'https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1',
    color: 'from-orange-400 to-yellow-500',
    description: 'Cloudflare Workers AI'
  }
]

function App() {
  const [apiKeys, setApiKeys] = useState(() => {
    const saved = localStorage.getItem('aikeys')
    if (saved) {
      return JSON.parse(saved)
    }
    // 首次使用，显示示例数据
    return []
  })
  const [showAddModal, setShowAddModal] = useState(false)
  const [newKey, setNewKey] = useState({
    serviceId: '',
    keyName: '',
    keyValue: '',
    note: ''
  })
  const [copiedKey, setCopiedKey] = useState(null)
  const [notification, setNotification] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterService, setFilterService] = useState('all')
  const [expandedServices, setExpandedServices] = useState(new Set())
  const [viewMode, setViewMode] = useState('grid') // grid | list
  const fileInputRef = useRef(null)

  // 保存到localStorage
  useEffect(() => {
    localStorage.setItem('aikeys', JSON.stringify(apiKeys))
  }, [apiKeys])

  const handleAddKey = () => {
    if (!newKey.serviceId || !newKey.keyValue) {
      setNotification({ type: 'error', message: '请选择服务并输入API密钥' })
      setTimeout(() => setNotification(null), 3000)
      return
    }

    // 去重检查：相同的 keyValue 视为重复
    const isDuplicate = apiKeys.some(k => k.keyValue === newKey.keyValue)
    if (isDuplicate) {
      setNotification({ type: 'error', message: '该密钥已存在，已自动跳过' })
      setTimeout(() => setNotification(null), 3000)
      setNewKey({ serviceId: '', keyName: '', keyValue: '', note: '' })
      setShowAddModal(false)
      return
    }

    const service = AI_SERVICES.find(s => s.id === newKey.serviceId)
    const keyEntry = {
      id: Date.now(),
      serviceId: newKey.serviceId,
      serviceName: service.name,
      serviceIcon: service.icon,
      serviceUrl: service.keyManagementUrl,
      baseUrl: service.baseUrl,
      keyName: newKey.keyName || `${service.name} Key ${apiKeys.filter(k => k.serviceId === newKey.serviceId).length + 1}`,
      keyValue: newKey.keyValue,
      note: newKey.note,
      createdAt: new Date().toLocaleDateString('zh-CN')
    }

    setApiKeys([...apiKeys, keyEntry])
    setNewKey({ serviceId: '', keyName: '', keyValue: '', note: '' })
    setShowAddModal(false)
    setNotification({ type: 'success', message: 'API密钥添加成功' })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleDeleteKey = (id) => {
    setApiKeys(apiKeys.filter(key => key.id !== id))
    setNotification({ type: 'success', message: 'API密钥已删除' })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleCopyKey = (keyValue, id) => {
    navigator.clipboard.writeText(keyValue)
    setCopiedKey(id)
    setNotification({ type: 'success', message: 'API密钥已复制到剪贴板' })
    setTimeout(() => setCopiedKey(null), 2000)
    setTimeout(() => setNotification(null), 3000)
  }

  const maskKey = (key) => {
    if (key.length <= 8) return '••••••••'
    return key.substring(0, 4) + '•'.repeat(Math.min(key.length - 8, 20)) + key.substring(key.length - 4)
  }

  // 导出密钥为 JSON
  const exportToJSON = () => {
    const data = apiKeys.map(key => ({
      服务名称: key.serviceName,
      密钥名称: key.keyName,
      密钥值: key.keyValue,
      备注: key.note,
      添加时间: key.createdAt,
      base_url: key.baseUrl || ''
    }))

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `aikeys_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setNotification({ type: 'success', message: 'JSON 文件导出成功' })
    setTimeout(() => setNotification(null), 3000)
  }

  // 导出密钥为 CSV
  const exportToCSV = () => {
    const headers = ['服务名称', '密钥名称', '密钥值', '备注', '添加时间', 'base_url']
    const rows = apiKeys.map(key => [
      key.serviceName,
      key.keyName,
      key.keyValue,
      key.note,
      key.createdAt,
      key.baseUrl || ''
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n')

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `aikeys_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setNotification({ type: 'success', message: 'CSV 文件导出成功' })
    setTimeout(() => setNotification(null), 3000)
  }

  // 导入密钥从 JSON 文件
  const handleImportFromJSON = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result)
        
        if (!Array.isArray(importedData)) {
          setNotification({ type: 'error', message: '文件格式错误：应为数组' })
          setTimeout(() => setNotification(null), 3000)
          return
        }

        let successCount = 0
        let skipCount = 0
        let errorCount = 0
        const newKeys = []

        // 已存在的 keyValue 集合，用于本批次内部去重
        const existingKeyValues = new Set(apiKeys.map(k => k.keyValue))

        importedData.forEach(item => {
          if (!item.密钥值) {
            errorCount++
            return
          }

          // 去重：已存在（localStorage 或本批次内）则跳过
          if (existingKeyValues.has(item.密钥值)) {
            skipCount++
            return
          }
          existingKeyValues.add(item.密钥值)

          // 查找对应的服务
          const service = AI_SERVICES.find(s => s.name === item.服务名称 || s.id === item.serviceId)

          const keyEntry = {
            id: Date.now() + Math.random(),
            serviceId: service ? service.id : 'unknown',
            serviceName: service ? service.name : item.服务名称 || '未知服务',
            serviceIcon: service ? service.icon : '🔑',
            serviceUrl: service ? service.keyManagementUrl : '',
            baseUrl: item.base_url || item.baseUrl || (service ? service.baseUrl : ''),
            keyName: item.密钥名称 || '导入的密钥',
            keyValue: item.密钥值,
            note: item.备注 || '',
            createdAt: item.添加时间 || new Date().toLocaleDateString('zh-CN')
          }

          newKeys.push(keyEntry)
          successCount++
        })

        setApiKeys(prev => [...prev, ...newKeys])

        const parts = []
        if (successCount > 0) parts.push(`成功导入 ${successCount} 个`)
        if (skipCount > 0) parts.push(`跳过重复 ${skipCount} 个`)
        if (errorCount > 0) parts.push(`无效 ${errorCount} 个`)
        setNotification({ type: successCount > 0 ? 'success' : 'error', message: parts.join('，') })
        setTimeout(() => setNotification(null), 4000)
      } catch (error) {
        setNotification({ type: 'error', message: '文件解析失败，请检查文件格式' })
        setTimeout(() => setNotification(null), 3000)
      }
    }

    reader.readAsText(file)
    event.target.value = '' // 重置 input，允许重复导入同一文件
  }

  // 触发文件选择对话框
  const triggerImport = () => {
    fileInputRef.current?.click()
  }

  const toggleServiceExpansion = (serviceId) => {
    const newExpanded = new Set(expandedServices)
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId)
    } else {
      newExpanded.add(serviceId)
    }
    setExpandedServices(newExpanded)
  }

  // 过滤和搜索
  const filteredKeys = apiKeys.filter(key => {
    const matchesSearch = key.keyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         key.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterService === 'all' || key.serviceId === filterService
    return matchesSearch && matchesFilter
  })

  const groupedKeys = filteredKeys.reduce((acc, key) => {
    if (!acc[key.serviceId]) {
      acc[key.serviceId] = []
    }
    acc[key.serviceId].push(key)
    return acc
  }, {})

  const servicesWithKeys = AI_SERVICES.filter(service => groupedKeys[service.id] && groupedKeys[service.id].length > 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col gap-6">
            {/* Title Section */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <span className="text-2xl">🔑</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                    AI Key 管理工具
                  </h1>
                  <p className="text-slate-400 mt-1 text-sm">安全、便捷地管理您的所有AI服务API密钥</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transform hover:scale-105"
              >
                <Plus size={20} />
                添加密钥
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setExpandedServices(new Set(AI_SERVICES.map(s => s.id)))}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm transition-all border border-slate-700"
              >
                展开全部
              </button>
              <button
                onClick={() => setExpandedServices(new Set())}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm transition-all border border-slate-700"
              >
                收起全部
              </button>
              <div className="h-6 w-px bg-slate-700"></div>
              <button
                onClick={exportToJSON}
                className="flex items-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 px-4 py-2 rounded-lg text-sm transition-all border border-emerald-500/30"
              >
                <Download size={16} />
                导出 JSON
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 rounded-lg text-sm transition-all border border-blue-500/30"
              >
                <Download size={16} />
                导出 CSV
              </button>
              <button
                onClick={triggerImport}
                className="flex items-center gap-2 bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 px-4 py-2 rounded-lg text-sm transition-all border border-amber-500/30"
              >
                <Upload size={16} />
                导入密钥
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImportFromJSON}
                accept=".json"
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-28 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl animate-slide-in ${
          notification.type === 'success' ? 'bg-emerald-500/95' : 'bg-red-500/95'
        } text-white backdrop-blur-sm border border-white/10`}>
          {notification.type === 'success' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索密钥名称或服务..."
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
              />
            </div>
            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
              <select
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl pl-11 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm appearance-none min-w-[180px]"
              >
                <option value="all">全部服务</option>
                {AI_SERVICES.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.icon} {service.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl p-5 border border-slate-700/50 hover:border-slate-600/50 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <ExternalLink className="text-blue-400" size={20} />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">支持服务</p>
                <p className="text-2xl font-bold text-white mt-0.5">{AI_SERVICES.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl p-5 border border-slate-700/50 hover:border-slate-600/50 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                <Plus className="text-emerald-400" size={20} />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">已添加密钥</p>
                <p className="text-2xl font-bold text-white mt-0.5">{apiKeys.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl p-5 border border-slate-700/50 hover:border-slate-600/50 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <span className="text-lg">🔐</span>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">安全存储</p>
                <p className="text-lg font-bold text-white mt-0.5">本地加密</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl p-5 border border-slate-700/50 hover:border-slate-600/50 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-amber-500/10 rounded-xl flex items-center justify-center">
                <span className="text-lg">⚡</span>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">快速访问</p>
                <p className="text-lg font-bold text-white mt-0.5">一键复制</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        {servicesWithKeys.length === 0 ? (
          <div className="bg-slate-800/30 backdrop-blur-lg rounded-2xl border border-slate-700/50 p-16 text-center">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🔑</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">暂无API密钥</h3>
            <p className="text-slate-400 mb-8">点击右上角"添加密钥"按钮开始添加您的第一个密钥</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
            >
              <Plus size={20} />
              添加密钥
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {servicesWithKeys.map(service => {
              const serviceKeys = groupedKeys[service.id]
              const isExpanded = expandedServices.has(service.id)

              return (
                <div key={service.id} className="bg-slate-800/30 backdrop-blur-lg rounded-2xl border border-slate-700/50 overflow-hidden hover:border-slate-600/50 transition-all">
                  {/* Service Header */}
                  <div
                    onClick={() => toggleServiceExpansion(service.id)}
                    className={`bg-gradient-to-r ${service.color} p-6 flex items-center justify-between cursor-pointer hover:opacity-90 transition-all`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <span className="text-2xl">{service.icon}</span>
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-white">{service.name}</h2>
                        <p className="text-white/70 text-sm mt-0.5">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-white/20 text-white px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
                        {serviceKeys.length} 个密钥
                      </span>
                      <a
                        href={service.keyManagementUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-slate-900 px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-sm"
                      >
                        <ExternalLink size={14} />
                        管理页面
                      </a>
                      <button className="text-white/80 hover:text-white transition-all p-1.5 hover:bg-white/10 rounded-lg">
                        {isExpanded ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                      </button>
                    </div>
                  </div>

                  {/* Keys List */}
                  {isExpanded && (
                    <div className="p-5 bg-slate-900/30">
                      <div className="space-y-3">
                        {serviceKeys.map(key => (
                          <div key={key.id} className="bg-slate-800/50 rounded-xl p-5 hover:bg-slate-800/70 transition-all border border-slate-700/50">
                            <div className="flex items-start justify-between gap-6">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                                  <h3 className="font-semibold text-white text-base">{key.keyName}</h3>
                                  {key.note && (
                                    <span className="text-xs bg-slate-700/50 text-slate-300 px-2.5 py-1 rounded-md border border-slate-600/50">
                                      {key.note}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2.5 flex-wrap">
                                  <code className="bg-slate-900/50 text-emerald-400 px-4 py-2 rounded-lg text-sm font-mono max-w-md overflow-hidden text-ellipsis border border-slate-700/50">
                                    {maskKey(key.keyValue)}
                                  </code>
                                  <button
                                    onClick={() => handleCopyKey(key.keyValue, key.id)}
                                    className={`flex items-center gap-1.5 transition-all text-sm px-4 py-2 rounded-lg ${
                                      copiedKey === key.id 
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                                        : 'bg-slate-700/50 text-slate-400 hover:text-blue-400 hover:bg-slate-700 border border-slate-600/50'
                                    }`}
                                  >
                                    {copiedKey === key.id ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                                    {copiedKey === key.id ? '已复制' : '复制'}
                                  </button>
                                </div>
                                <p className="text-slate-500 text-xs mt-3 flex items-center gap-1">
                                  <span>添加于 {key.createdAt}</span>
                                </p>
                              </div>
                              <button
                                onClick={() => handleDeleteKey(key.id)}
                                className="flex items-center gap-1.5 text-slate-400 hover:text-red-400 transition-all p-2.5 hover:bg-red-500/10 rounded-lg border border-transparent hover:border-red-500/20"
                                title="删除密钥"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Add Key Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => {
          setShowAddModal(false)
          setNewKey({ serviceId: '', keyName: '', keyValue: '', note: '' })
        }}>
          <div className="bg-slate-900 rounded-2xl max-w-lg w-full shadow-2xl border border-slate-700/50" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">添加API密钥</h2>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setNewKey({ serviceId: '', keyName: '', keyValue: '', note: '' })
                }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2.5">
                  选择AI服务
                </label>
                <select
                  value={newKey.serviceId}
                  onChange={(e) => setNewKey({ ...newKey, serviceId: e.target.value })}
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                >
                  <option value="">请选择服务</option>
                  {AI_SERVICES.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.icon} {service.name} - {service.description}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2.5">
                  密钥名称（可选）
                </label>
                <input
                  type="text"
                  value={newKey.keyName}
                  onChange={(e) => setNewKey({ ...newKey, keyName: e.target.value })}
                  placeholder="例如：生产环境密钥"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2.5">
                  API密钥 <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  value={newKey.keyValue}
                  onChange={(e) => setNewKey({ ...newKey, keyValue: e.target.value })}
                  placeholder="输入您的API密钥"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2.5">
                  备注（可选）
                </label>
                <textarea
                  value={newKey.note}
                  onChange={(e) => setNewKey({ ...newKey, note: e.target.value })}
                  placeholder="添加备注信息..."
                  rows="3"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                />
              </div>
            </div>
            <div className="p-6 border-t border-slate-700/50 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setNewKey({ serviceId: '', keyName: '', keyValue: '', note: '' })
                }}
                className="px-6 py-2.5 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAddKey}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/20"
              >
                添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

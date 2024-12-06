import { defineConfig } from 'vitepress'
import { zhCN, enUS } from './locales'

export default defineConfig({
  title: "我的组件库",
  description: "基于 Vue 3 的组件库",
  lang: 'zh-CN',
  lastUpdated: true,
  
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/' },
      { text: '指南', link: '/guide/' }
    ],
    
    sidebar: {
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: '介绍', link: '/components/' },
            { text: '按钮', link: '/components/button' },
            { text: '输入框', link: '/components/input' },
            { text: '时间选择器', link: '/components/time-picker' }
          ]
        }
      ],
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/' },
            { text: '安装', link: '/guide/installation' },
            { text: '使用', link: '/guide/usage' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/your-repo' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Your Name'
    },

    search: {
      provider: 'local'
    }
  }
}) 
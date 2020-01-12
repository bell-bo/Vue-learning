module.exports = {
  base: '/Vue-learning/',
  title: 'Vue Learning',
  description: 'vue.js源码学习总结',
  head: [
    ['link', { rel: 'icon', href: `https://github.githubassets.com/favicon.ico` }]
  ],
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    sidebar: [{
      title: 'vue源码分析',
      collapsable: false,
      children: [
        {
          title:"响应式原理",
          collapsable:true,
          children:[
            ['reactive/', '原理概述&流程分析'],
            ['reactive/Observer',"双向绑定代码分析"]
          ]
        },
        ['lifecycle/', '生命周期'],
        ['virtualDOM/', '虚拟 DOM 与 diff'],
        ['complie/', '模板编译'],
        ['globalAPI/', '全局API'],
        ['buildInComponents/', '内置组件'],
        ['other/', '其他'],
      ]
    }],
    sidebarDepth:0,
    repo: 'https://github.com/bell-bo/Vue-learning#readme',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: "在 GitHub 上编辑此页",
    lastUpdated: "上次更新",
  },
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      return {
        resolve: {
          alias: {
            '@public': './static'
          }
        }
      }
    }
  },
  plugins: ['@vuepress/back-to-top', '@vuepress/nprogress']
}
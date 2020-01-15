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
      title: '初始化实例',
      collapsable: false,
      children: [
        ['instance/', '原理概述&流程分析'],
        ['instance/defineEvent', '自定义事件处理'],
        ['instance/implementEvent', '实现Vue事件机制'],
      ]
    },{
      title: '响应式原理',
      collapsable: false,
      children: [
        ['reactive/Observer',"双向绑定代码分析"]
      ]
    },{
      title: '生命周期',
      collapsable: false,
      children: [
        // ['reactive/Observer',"xxx"]
      ]
    },{
      title: '虚拟 DOM 与 diff',
      collapsable: false,
      children: [
        // ['virtualDOM/', 'xxx'],
      ]
    },{
      title: '模板编译',
      collapsable: false,
      children: [
        // ['complie/', 'xxx']
      ]
    },{
      title: '全局API',
      collapsable: false,
      children: [
        // ['globalAPI/', 'xxx'],
      ]
    },{
      title: '内置组件',
      collapsable: false,
      children: [
        // ['buildInComponents/', 'xxx']
      ]
    },{
      title: '其他',
      collapsable: false,
      children: [
        // ['other/', 'xxx'],
      ]
    }],
    sidebarDepth:0,
    repo: 'https://github.com/bell-bo/Vue-learning',
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
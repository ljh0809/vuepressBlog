module.exports = {
  port:8848,
  title: '顾虑深深',
  description: '要酷，要优秀，要成为别人的可望不可及',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    nav:[ // 导航栏配置
      {text: 'node与Vue详解', link: '/vue/' },
      {text: 'react详解', link: '/react/'},
      {text: '面试题', link: '/interview/'},
      {text: '面向百度', link: 'https://www.baidu.com/'}         
    ],
    sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 2, // 侧边栏显示2级
  }
};
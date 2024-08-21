import { defineConfig } from 'vitepress'

export const en = defineConfig({
  lang: 'en',
  description: 'Vite & Vue powered static site generator.',

  themeConfig: {
    outline: false,
    nav: [
      { text: 'Home', link: '/en' },
      // { text: 'Examples', link: '/markdown-examples' }
    ],
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You'
    }
  }
})

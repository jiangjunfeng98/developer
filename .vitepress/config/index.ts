import { defineConfig } from 'vitepress'
import { en } from './en.ts'
import { zh } from './zh.ts'


export default defineConfig({
  outDir: '../dist',
  rewrites: {
    'en/:rest*': ':rest*'
  },
  cleanUrls: true,
  metaChunk: true,
  locales: {
    root: { label: 'English', ...en },
    zh: { label: '简体中文', ...zh }
  }
})

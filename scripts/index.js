import { getChinese } from './apis/chinese'

const basePatch = './components/data';

const getPath = (lang) => {
  return `${basePatch}/${lang}.json`
}
const init = async () => {
  const chineseData = await getChinese();
  Bun.write(getPath('zh'), JSON.stringify(chineseData))
}

init();

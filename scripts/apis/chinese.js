import { cloneDeep } from 'lodash-es'
import dayjs from 'dayjs'
import { getGithubContents } from '../utils'


export const getChinese = async () => {

  const result = await getGithubContents('1c7', 'chinese-independent-developer', 'README-Programmer-Edition.md')

  const chineseData = { country: 'zh', title: '中国独立开发者项目列表', time: dayjs().format('YYYY-MM-DD HH:mm'), list: [] }
  let canRead = false;
  const itemData = {
    // 作者介绍
    submitter: {},
    project: []
  }
  result.split('\n').forEach((item) => {
    if (!canRead) {
      if (item.startsWith('### ')) {
        canRead = true
      }
    }
    if (canRead) {
      // if (item.startsWith('### ')) {
      //   // 将上一次解析数据存入json中，并重置数据
      //   json.list.push(cloneDeep(itemData));
      //   itemData.submitter = {}
      //   itemData.project = []
      //   // 解析当前数据
      //   const time = dayjs(item.match(/\d+/)).format('YYYY-MM-DD');
      //   itemData.time = time
      // }
      // 仅需解析作者和应用信息
      if (item.startsWith('#### ')) {
        if (itemData.project.length > 0) {
          chineseData.list.push(cloneDeep(itemData));
          itemData.submitter = {}
          itemData.project = []
        }
        itemData.submitter = getAuthor(item)
      } else if (item.startsWith('* :')) {
        const pro = getProjectInfo(item)
        if (pro) {
          itemData.project.push(pro)
        }
      }
    }
  })
  // 将最后一条数据存入
  if (itemData.project.length > 0) {
    chineseData.list.push(itemData);
  }
  const projects = [];
  chineseData.list.forEach(item => {
    item.project.forEach(pro => {
      projects.push(pro)
    })
  })
  return chineseData;
}

/**
 * 解析提交者和链接信息
 * @param {*} markdownText 
 * @returns 
 */
const getAuthor = (markdownText) => {
  let submitter = '';
  const links = [];
  try {
    let nameTxt = ''
    let linksStr = '';
    if (markdownText.includes(' - ')) {
      nameTxt = markdownText.split(' - ')[0]
      linksStr = markdownText.split(' - ')[1]
    } else {
      nameTxt = markdownText.split(' [')[0]
      linksStr = markdownText.replace(nameTxt, '')
    }
    nameTxt = nameTxt.trim();
    // 正则表达式匹配提交者信息和链接信息
    const entryRegex = /^#{1,6}\s*(.*?)\s*$/gm;

    let match = entryRegex.exec(nameTxt);
    // match[1] 是提交者信息，match[2] 是链接信息字符串
    submitter = match[1].trim();

    // 正则表达式匹配链接
    const linkRegex = /\[([^\]]+)\]\((http[s]?:\/\/[^)]+)\)/g;
    let linkMatch;

    while ((linkMatch = linkRegex.exec(linksStr)) !== null) {
      links.push({ name: linkMatch[1], url: linkMatch[2] });
    }
  } catch (e) {
    console.log(markdownText);
    throw e
  }
  return { name: submitter, links };
}
/**
 * 解析项目信息
 * @param {*} markdownText 
 */
const getProjectInfo = (markdownText) => {
  // 正则表达式匹配项目信息
  const projectRegex = /(:\w+:)\s*\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)\s*(.+)/;

  const match = projectRegex.exec(markdownText.trim());

  if (match) {
    // 状态
    const status = match[1];
    // 项目名
    const projectName = match[2];
    // 项目链接
    const projectUrl = match[3];
    // 描述
    const description = (match[4].trim() || '').replace(/^[:：\s]+/, '');
    // 删除包含“更多介绍”的链接
    const finalDescription = description.replace(/\[更多介绍\]\(https?:\/\/[^\s)]+/g, '');
    // 根据状态标识转换为文本状态
    const statusText = {
      ':clock8:': 'clock',
      ':white_check_mark:': 'white_check_mark',
      ':x:': 'x'
    }[status];
    return { status: statusText, name: projectName, url: projectUrl, description: finalDescription }
  }
}


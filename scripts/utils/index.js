/**
 * 获取Github文件内容
 * @param {*} owner 所属者
 * @param {*} repo 项目名
 * @param {*} path 文件路径
 * @returns 
 */
export const getGithubContents = async (owner, repo, path) => {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    headers: {
      "access_token": process.env.TOKEN,
      'Accept': 'application/vnd.github+json'
    }
  });
  if (response.status != 200) throw new Error('获取数据失败')
  const data = await response.json();
  const buffer = Buffer.from(data.content, 'base64');
  const decodedString = buffer.toString('utf-8');
  return decodedString;
}
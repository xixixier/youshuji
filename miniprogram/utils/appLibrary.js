/**
 * appLibrary.js — 有数记 · 高订应用数据库与自动匹配系统
 * 用于根据用户输入，自动匹配官方品牌色、分类标签、标准预设价格以及字首徽章。
 */

const APP_LIBRARY = [
  {
    keyword: 'netflix',
    name: 'Netflix',
    category: '影音娱乐',
    defaultPrice: 35,
    brandColor: '#E50914',
    initialChar: 'N'
  },
  {
    keyword: 'spotify',
    name: 'Spotify',
    category: '影音娱乐',
    defaultPrice: 15,
    brandColor: '#1DB954',
    initialChar: 'S'
  },
  {
    keyword: 'icloud',
    name: 'iCloud+',
    category: '实用工具',
    defaultPrice: 6,
    brandColor: '#007AFF',
    initialChar: 'iC'
  },
  {
    keyword: 'notion',
    name: 'Notion',
    category: '学习办公',
    defaultPrice: 35,
    brandColor: '#000000',
    initialChar: 'N'
  },
  {
    keyword: 'github',
    name: 'GitHub Copilot',
    category: '实用工具',
    defaultPrice: 70,
    brandColor: '#24292E',
    initialChar: 'GH'
  },
  {
    keyword: 'chatgpt',
    name: 'ChatGPT Plus',
    category: '学习办公',
    defaultPrice: 145,
    brandColor: '#10A37F',
    initialChar: 'GP'
  },
  {
    keyword: 'youtube',
    name: 'YouTube Premium',
    category: '影音娱乐',
    defaultPrice: 28,
    brandColor: '#FF0000',
    initialChar: 'YT'
  },
  {
    keyword: 'disney',
    name: 'Disney+',
    category: '影音娱乐',
    defaultPrice: 30,
    brandColor: '#113CCF',
    initialChar: 'D+'
  },
  {
    keyword: 'office',
    name: 'Microsoft 365',
    category: '学习办公',
    defaultPrice: 398,
    brandColor: '#D83B01',
    initialChar: 'M'
  },
  {
    keyword: 'adobe',
    name: 'Adobe Creative Cloud',
    category: '实用工具',
    defaultPrice: 228,
    brandColor: '#FF0000',
    initialChar: 'Cc'
  },
  {
    keyword: 'playstation',
    name: 'PlayStation Plus',
    category: '游戏',
    defaultPrice: 428,
    brandColor: '#003087',
    initialChar: 'PS'
  },
  {
    keyword: 'switch',
    name: 'Nintendo Switch Online',
    category: '游戏',
    defaultPrice: 155,
    brandColor: '#E60012',
    initialChar: 'NS'
  },
  {
    keyword: 'apple music',
    name: 'Apple Music',
    category: '影音娱乐',
    defaultPrice: 10,
    brandColor: '#FA243C',
    initialChar: 'AM'
  }
];

/**
 * 根据用户输入的名称，模糊匹配对应的官方服务
 * @param {string} inputName 用户输入的名称 
 * @returns {object|null} 匹配到的品牌配置项
 */
function matchApp(inputName) {
  if (!inputName) return null;
  const normalized = inputName.trim().toLowerCase();
  
  // 查找关键字包含匹配
  const matched = APP_LIBRARY.find(item => 
    normalized.includes(item.keyword) || item.keyword.includes(normalized)
  );
  
  return matched || null;
}

module.exports = {
  APP_LIBRARY,
  matchApp
};

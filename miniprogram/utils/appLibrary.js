/**
 * appLibrary.js — 有数记 · 海内外主流官方高保真真实大图图标数据库与智能匹配系统
 */

const APP_LIBRARY = [
  // ==================== 1. 国际主流影音娱乐 (Global Entertainment) ====================
  {
    aliases: ['netflix', '网飞', '奈飞', 'nf'],
    name: 'Netflix',
    category: '影音娱乐',
    defaultPrice: 35,
    brandColor: '#E50914',
    // 官方超清原图真实连接
    iconUrl: 'https://api.companyenrich.com/logo/netflix.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23111111'/><path d='M5.5 2.5v19h4.3V11.2l4.4 10.3h4.3v-19h-4.3v10.3L9.8 2.5H5.5z' fill='%23E50914'/></svg>`
  },
  {
    aliases: ['spotify', '声破天', '斯波蒂菲'],
    name: 'Spotify',
    category: '影音娱乐',
    defaultPrice: 15,
    brandColor: '#1DB954',
    iconUrl: 'https://api.companyenrich.com/logo/spotify.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23191414'/><circle cx='12' cy='12' r='8.5' fill='%231DB954'/><path d='M7.8 9.3c2.2-.6 4.8-.6 7 0M8.2 11.8c1.9-.5 4.1-.5 6 0M8.6 14.2c1.6-.4 3.4-.4 5 0' stroke='%23191414' stroke-width='1.2' stroke-linecap='round'/></svg>`
  },
  {
    aliases: ['youtube', 'yt', '油管', 'youtube premium'],
    name: 'YouTube Premium',
    category: '影音娱乐',
    defaultPrice: 28,
    brandColor: '#FF0000',
    iconUrl: 'https://api.companyenrich.com/logo/youtube.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23FFFFFF'/><rect x='3.5' y='6' width='17' height='12' rx='3.5' fill='%23FF0000'/><polygon points='10.5 9.5 15 12 10.5 14.5' fill='white'/></svg>`
  },
  {
    aliases: ['disney', 'disney+', '迪士尼'],
    name: 'Disney+',
    category: '影音娱乐',
    defaultPrice: 30,
    brandColor: '#001E50',
    iconUrl: 'https://api.companyenrich.com/logo/disneyplus.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23001E50'/><path d='M5 16.5c3-4.5 7.5-6.5 14-6.5M10.5 7.5a4 4 0 014 4c0 3-4 6.5-4 6.5s-2-2.5-2-4a2 2 0 012-2.5z' stroke='%2300C8FF' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/></svg>`
  },
  {
    aliases: ['apple music', '苹果音乐', 'apm'],
    name: 'Apple Music',
    category: '影音娱乐',
    defaultPrice: 10,
    brandColor: '#FC3C44',
    iconUrl: 'https://api.companyenrich.com/logo/music.apple.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23FC3C44'/><path d='M9 16.5a2.5 2.5 0 11-3-2.45V7.5l9-2v9.5a2.5 2.5 0 11-3-2.45V7.5L9 8.5v8z' fill='white'/></svg>`
  },
  {
    aliases: ['hbo', 'hbomax', 'max'],
    name: 'HBO Max / Max',
    category: '影音娱乐',
    defaultPrice: 99,
    brandColor: '#0A001C',
    iconUrl: 'https://api.companyenrich.com/logo/hbomax.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%230A001C'/><path d='M5 7v10h2v-4h4v4h2V7h-2v4H7V7H5zm12 0c-2.5 0-4.5 2-4.5 5s2 5 4.5 5 4.5-2 4.5-5-2-5-4.5-5zm0 8c-1.2 0-2.5-1-2.5-3s1.3-3 2.5-3 2.5 1 2.5 3-1.3 3-2.5 3z' fill='white'/></svg>`
  },
  {
    aliases: ['prime video', 'amazon video', '亚马逊视频'],
    name: 'Prime Video',
    category: '影音娱乐',
    defaultPrice: 40,
    brandColor: '#00A8E1',
    iconUrl: 'https://api.companyenrich.com/logo/primevideo.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%231A222D'/><path d='M6.5 15.5c3 2 8 2 11 0' stroke='%2300A8E1' stroke-width='2' stroke-linecap='round'/><path d='M16 14.5l2.5 2 1-2.5' stroke='%2300A8E1' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/></svg>`
  },
  {
    aliases: ['hulu'],
    name: 'Hulu',
    category: '影音娱乐',
    defaultPrice: 38,
    brandColor: '#1CE783',
    iconUrl: 'https://api.companyenrich.com/logo/hulu.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%231CE783'/><path d='M7 6v12h3v-5c0-1.2.8-2 2-2s2 .8 2 2v5h3v-6c0-2.5-1.5-4-4-4-1.8 0-3 1-3.5 2V6H7z' fill='%230b0c0d'/></svg>`
  },

  // ==================== 2. 国内主流影音娱乐 (Domestic Entertainment) ====================
  {
    aliases: ['bilibili', 'b站', '哔哩哔哩', '弹幕'],
    name: 'Bilibili',
    category: '影音娱乐',
    defaultPrice: 15,
    brandColor: '#00AEEC',
    iconUrl: 'https://api.companyenrich.com/logo/bilibili.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%2300AEEC'/><rect x='4.5' y='8' width='15' height='11.5' rx='3' fill='white'/><circle cx='8.5' cy='13.5' r='1.2' fill='%2300AEEC'/><circle cx='15.5' cy='13.5' r='1.2' fill='%2300AEEC'/><path d='M7.5 4.5l2.5 3.5m6.5-3.5L14 8M10 16.5a4 4 0 004 0' stroke='white' stroke-width='1.5' stroke-linecap='round'/><path d='M10 16.5a4 4 0 004 0' stroke='%2300AEEC' stroke-width='1.2' stroke-linecap='round'/></svg>`
  },
  {
    aliases: ['腾讯视频', 'txsp', 'v.qq', '腾讯视频 vip'],
    name: '腾讯视频',
    category: '影音娱乐',
    defaultPrice: 20,
    brandColor: '#00A5FF',
    iconUrl: 'https://api.companyenrich.com/logo/v.qq.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23111111'/><path d='M6 5.5l14 6.5-14 6.5V5.5z' fill='%23FF7C00'/><path d='M10.5 8.5l9.5 3.5-9.5 3.5v-7z' fill='%2300A5FF'/></svg>`
  },
  {
    aliases: ['爱奇艺', 'iqiyi', 'aqy', '爱奇艺 vip'],
    name: '爱奇艺',
    category: '影音娱乐',
    defaultPrice: 19,
    brandColor: '#00CC4C',
    iconUrl: 'https://api.companyenrich.com/logo/iqiyi.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23111111'/><rect x='5' y='5' width='14' height='14' rx='3' stroke='%2300CC4C' stroke-width='1.5'/><circle cx='12' cy='12' r='3.5' stroke='%2300CC4C' stroke-width='1.5'/><path d='M14.5 14.5l2.5 2.5' stroke='%2300CC4C' stroke-width='1.5' stroke-linecap='round'/></svg>`
  },
  {
    aliases: ['优酷', 'youku', 'yk', '优酷 vip'],
    name: '优酷视频',
    category: '影音娱乐',
    defaultPrice: 19,
    brandColor: '#00A6F3',
    iconUrl: 'https://api.companyenrich.com/logo/youku.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23FFFFFF'/><circle cx='9' cy='12' r='3.5' fill='%2300A6F3'/><circle cx='15' cy='12' r='3.5' fill='%23FF1484'/><path d='M12 7.5a4.5 4.5 0 014.5 4.5' stroke='%2300A6F3' stroke-width='1.5' stroke-linecap='round'/><path d='M12 16.5a4.5 4.5 0 01-4.5-4.5' stroke='%23FF1484' stroke-width='1.5' stroke-linecap='round'/></svg>`
  },
  {
    aliases: ['芒果', '芒果tv', 'mgtv', '芒果 tv'],
    name: '芒果TV',
    category: '影音娱乐',
    defaultPrice: 18,
    brandColor: '#FF5F00',
    iconUrl: 'https://api.companyenrich.com/logo/mgtv.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23FF5F00'/><path d='M8 6.5C8 5 10 4 12.5 6s4.5 4.5 4.5 7-2.5 5.5-5 5.5S8.5 16 8.5 14' stroke='white' stroke-width='1.5' stroke-linecap='round'/><polygon points='11.5 10 14.5 12 11.5 14' fill='white'/></svg>`
  },
  {
    aliases: ['网易云', '网易云音乐', 'cloudmusic'],
    name: '网易云音乐',
    category: '影音娱乐',
    defaultPrice: 16,
    brandColor: '#E11D24',
    iconUrl: 'https://api.companyenrich.com/logo/music.163.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23E11D24'/><circle cx='12' cy='12' r='8' fill='%23111111'/><circle cx='12' cy='12' r='5' stroke='%23E11D24' stroke-width='1'/><circle cx='12' cy='12' r='2' fill='white'/></svg>`
  },
  {
    aliases: ['qq音乐', 'qqmusic'],
    name: 'QQ音乐',
    category: '影音娱乐',
    defaultPrice: 15,
    brandColor: '#31C27C',
    iconUrl: 'https://api.companyenrich.com/logo/y.qq.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%2331C27C'/><path d='M10 16.5a2 2 0 11-2-1.95V7.5l8-1.5v8.5a2 2 0 11-2-1.95V8.5l-4.5.8v7.2z' fill='white'/></svg>`
  },
  {
    aliases: ['喜马拉雅', 'ximalaya', 'xmly'],
    name: '喜马拉雅',
    category: '影音娱乐',
    defaultPrice: 18,
    brandColor: '#F54336',
    iconUrl: 'https://api.companyenrich.com/logo/ximalaya.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23F54336'/><path d='M6 13.5a6 6 0 0112 0v2.5a1.5 1.5 0 01-1.5 1.5h-1a1.5 1.5 0 01-1.5-1.5v-1a1.5 1.5 0 011.5-1.5M10 13.5v2.5a1.5 1.5 0 01-1.5 1.5h-1A1.5 1.5 0 016 16v-2.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>`
  },

  // ==================== 3. 海内外主流学习办公 (Productivity & Education) ====================
  {
    aliases: ['notion', '诺申'],
    name: 'Notion',
    category: '学习办公',
    defaultPrice: 35,
    brandColor: '#000000',
    iconUrl: 'https://api.companyenrich.com/logo/notion.so',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23111111'/><path d='M6.5 6.5h3.3v1.2L14 6.5h3.5v11h-3.3v-1.2L10 17.5H6.5V6.5z' fill='white'/><path d='M10 7.8v7.9l4-6.5v6.5' stroke='%23111111' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>`
  },
  {
    aliases: ['chatgpt', 'openai', 'gpt'],
    name: 'ChatGPT Plus',
    category: '学习办公',
    defaultPrice: 145,
    brandColor: '#10A37F',
    iconUrl: 'https://api.companyenrich.com/logo/openai.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%2310A37F'/><circle cx='12' cy='12' r='2' fill='white'/><path d='M12 6a3 3 0 013 3v6a3 3 0 01-6 0V9a3 3 0 013-3zM6 12a3 3 0 013-3h6a3 3 0 010 6H9a3 3 0 01-3-3z' stroke='white' stroke-width='1.2'/></svg>`
  },
  {
    aliases: ['claude', 'anthropic'],
    name: 'Claude Pro',
    category: '学习办公',
    defaultPrice: 145,
    brandColor: '#D97706',
    iconUrl: 'https://api.companyenrich.com/logo/anthropic.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23EAE3D2'/><path d='M16 8.5c-1-1.5-2.5-2.5-4.5-2.5a5.5 5.5 0 000 11c2.5 0 4-1.5 4.5-3h-3' stroke='%23D97706' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>`
  },
  {
    aliases: ['midjourney', 'mj'],
    name: 'Midjourney',
    category: '学习办公',
    defaultPrice: 210,
    brandColor: '#1A1A1A',
    iconUrl: 'https://api.companyenrich.com/logo/midjourney.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23111111'/><path d='M6 16.5c2-2.5 6-3 12 0M8.5 13.5c1.5-2 4.5-2.5 7 0M10.5 10c1-1.5 2.5-1.5 3.5 0' stroke='white' stroke-width='1.2' stroke-linecap='round'/><path d='M12 5v14' stroke='white' stroke-width='0.8' stroke-dasharray='1 2'/></svg>`
  },
  {
    aliases: ['github', 'copilot', 'github copilot'],
    name: 'GitHub Copilot',
    category: '学习办公',
    defaultPrice: 70,
    brandColor: '#24292E',
    iconUrl: 'https://api.companyenrich.com/logo/github.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%2324292E'/><path d='M12 4a8 8 0 00-2.5 15.6c.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1.1-2.7-1.1-.4-1-1-1.2-1-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.3.7 0-.5.2-.9.5-1.1-1.8-.2-3.7-.9-3.7-4a3.1 3.1 0 01.8-2.2c-.1-.2-.3-1 .1-2.1 0 0 .6-.2 2.1.8a7.2 7.2 0 013.8 0c1.5-1 2.1-.8 2.1-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.4.8 2.2 0 3.1-1.9 3.8-3.7 4 .3.3.6.8.6 1.6v2.4c0 .2.1.5.5.4A8 8 0 0012 4z' fill='white'/></svg>`
  },
  {
    aliases: ['wps', 'wps office', '金山wps'],
    name: 'WPS Office',
    category: '学习办公',
    defaultPrice: 19,
    brandColor: '#D82829',
    iconUrl: 'https://api.companyenrich.com/logo/wps.cn',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23D82829'/><path d='M5.5 7L12 11.5 18.5 7 12 17.5 5.5 7z' fill='white' fill-opacity='0.9'/><path d='M5.5 7L12 11.5v6L5.5 7z' fill='white' fill-opacity='0.6'/><path d='M18.5 7L12 11.5v6L18.5 7z' fill='black' fill-opacity='0.15'/></svg>`
  },
  {
    aliases: ['office', 'microsoft 365', 'm365', 'word', 'excel'],
    name: 'Microsoft 365',
    category: '学习办公',
    defaultPrice: 398,
    brandColor: '#E63C13',
    iconUrl: 'https://api.companyenrich.com/logo/microsoft.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23FFFFFF'/><path d='M12 4.5L5.5 8v8l6.5 3.5 6.5-3.5V8L12 4.5z' fill='%23E63C13'/><path d='M12 4.5v15L18.5 16V8L12 4.5z' fill='%23B12D0E'/></svg>`
  },
  {
    aliases: ['adobe', 'creative cloud', 'photoshop', 'illustrator'],
    name: 'Adobe Creative Cloud',
    category: '实用工具',
    defaultPrice: 228,
    brandColor: '#FA0F00',
    iconUrl: 'https://api.companyenrich.com/logo/adobe.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23FA0F00'/><path d='M12 5.5l5.5 13H14.5L12 12.5 9.5 18.5H6.5l5.5-13zM12 9.5l1.5 3.8h-3L12 9.5z' fill='white'/></svg>`
  },
  {
    aliases: ['印象笔记', 'evernote'],
    name: '印象笔记',
    category: '学习办公',
    defaultPrice: 18,
    brandColor: '#00A82D',
    iconUrl: 'https://api.companyenrich.com/logo/evernote.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%2300A82D'/><path d='M6.5 15.5c0-4.5 3-7.5 7.5-7.5s5.5 2 5.5 4.5-1.5 3.5-3 3.5H13c-.8 0-1.5.7-1.5 1.5v.5h-5z' fill='white'/><path d='M16.5 12.5a1.5 1.5 0 011.5 1.5c0 1-1.5 2.5-3 2.5l1.5-4z' fill='%2300A82D'/></svg>`
  },
  {
    aliases: ['知乎', 'zhihu'],
    name: '知乎',
    category: '学习办公',
    defaultPrice: 19,
    brandColor: '#0084FF',
    iconUrl: 'https://api.companyenrich.com/logo/zhihu.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%230084FF'/><path d='M6.5 8h4.5M8.5 6v6m0 0C8.5 14.5 7 16 5.5 17m6-9h5m-2.5-2v4m-.5 3.5c1.5 0 2.5 1.5 3 3.5M12.5 13c.5 1 1 2 1.5 3' stroke='white' stroke-width='1.8' stroke-linecap='round'/></svg>`
  },
  {
    aliases: ['豆瓣', 'douban'],
    name: '豆瓣绿',
    category: '学习办公',
    defaultPrice: 0,
    brandColor: '#00B606',
    iconUrl: 'https://api.companyenrich.com/logo/douban.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%2300B606'/><path d='M6 7.5h12M7.5 11h9m-6.5-3.5v3.5m4-3.5v3.5M9.5 13.5c0 1.5-1 3-3.5 3.5m10-3.5c0 1.5 1 3 3.5 3.5M8 17h8' stroke='white' stroke-width='1.6' stroke-linecap='round'/></svg>`
  },
  {
    aliases: ['figma', '菲格玛'],
    name: 'Figma Pro',
    category: '学习办公',
    defaultPrice: 110,
    brandColor: '#1E1E1E',
    iconUrl: 'https://api.companyenrich.com/logo/figma.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%231E1E1E'/><circle cx='9.5' cy='7.5' r='2' fill='%23F24E1E'/><path d='M12 5.5a2 2 0 012 2v2h-2v-2z' fill='%23FF7262'/><circle cx='9.5' cy='11.5' r='2' fill='%23A259FF'/><circle cx='14.5' cy='11.5' r='2' fill='%231ABC9C'/><path d='M9.5 13.5a2 2 0 002 2v-2h-2z' fill='%230ACF83'/></svg>`
  },
  {
    aliases: ['canva', '可画'],
    name: 'Canva',
    category: '学习办公',
    defaultPrice: 25,
    brandColor: '#00C4CC',
    iconUrl: 'https://api.companyenrich.com/logo/canva.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%2300C4CC'/><path d='M15.5 9c-1-1.5-2.5-2-4-2a4.5 4.5 0 000 9c2 0 3.5-1 4-2.5' stroke='white' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'/></svg>`
  },
  {
    aliases: ['duolingo', '多邻国', '多邻国 plus'],
    name: 'Duolingo',
    category: '学习办公',
    defaultPrice: 48,
    brandColor: '#58CC02',
    iconUrl: 'https://api.companyenrich.com/logo/duolingo.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%2358CC02'/><circle cx='9' cy='12' r='2.5' fill='white'/><circle cx='15' cy='12' r='2.5' fill='white'/><circle cx='9.2' cy='12' r='1.2' fill='%23FFC000'/><circle cx='14.8' cy='12' r='1.2' fill='%23FFC000'/><circle cx='9.2' cy='12' r='0.6' fill='black'/><circle cx='14.8' cy='12' r='0.6' fill='black'/><path d='M11 15.5a1.5 1.5 0 002 0' stroke='%23FFC000' stroke-width='1.5' stroke-linecap='round'/></svg>`
  },
  {
    aliases: ['deepl', 'deepl翻译', 'deepl pro'],
    name: 'DeepL Pro',
    category: '学习办公',
    defaultPrice: 45,
    brandColor: '#0F2B46',
    iconUrl: 'https://api.companyenrich.com/logo/deepl.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%230F2B46'/><path d='M9 8h8m0 0v8m0-8L7 17M15 16H7m0 0V8m0 8l10-9' stroke='white' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/></svg>`
  },

  // ==================== 4. 海内外主流实用工具 (Utility & Cloud Storage) ====================
  {
    aliases: ['icloud', 'icloud+', '苹果云存储'],
    name: 'iCloud+',
    category: '实用工具',
    defaultPrice: 6,
    brandColor: '#007AFF',
    iconUrl: 'https://api.companyenrich.com/logo/apple.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23007AFF'/><path d='M17.5 11.2a3.8 3.8 0 00-6.8-2.2 4.5 4.5 0 00-4.2 4.4c0 2.5 2 4.4 4.5 4.4h6.5a3.5 3.5 0 000-7.1v.5z' fill='white'/></svg>`
  },
  {
    aliases: ['google one', 'google drive', '谷歌云'],
    name: 'Google One',
    category: '实用工具',
    defaultPrice: 15,
    brandColor: '#4285F4',
    iconUrl: 'https://api.companyenrich.com/logo/one.google.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23FFFFFF'/><path d='M12 4.5a7.5 7.5 0 000 15 7.5 7.5 0 000-15z' stroke='%234285F4' stroke-width='2.2'/><path d='M12 4.5V12h7.5' stroke='%23EA4335' stroke-width='2.2'/><path d='M12 12H4.5' stroke='%23FBBC05' stroke-width='2.2'/><path d='M12 12v7.5' stroke='%2334A853' stroke-width='2.2'/></svg>`
  },
  {
    aliases: ['onedrive', '微软云盘'],
    name: 'OneDrive',
    category: '实用工具',
    defaultPrice: 39,
    brandColor: '#0078D4',
    iconUrl: 'https://api.companyenrich.com/logo/onedrive.live.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%230078D4'/><path d='M18 13.5a2.5 2.5 0 00-2-4.4 3 3 0 00-5.5-1.1A2.5 2.5 0 007 12a2.5 2.5 0 000 5h11a2.5 2.5 0 000-3.5z' fill='white' fill-opacity='0.9'/><path d='M15 14.5a2 2 0 00-1.5-3.4 2.5 2.5 0 00-4.5-1A2 2 0 006 13a2 2 0 000 4h9a2 2 0 000-2.6z' fill='white' fill-opacity='0.5'/></svg>`
  },
  {
    aliases: ['dropbox', '多宝箱'],
    name: 'Dropbox',
    category: '实用工具',
    defaultPrice: 65,
    brandColor: '#0061FE',
    iconUrl: 'https://api.companyenrich.com/logo/dropbox.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%230061FE'/><path d='M6 7.5L12 4l6 3.5-6 3.5-6-3.5zM6 12.5L12 9l6 3.5-6 3.5-6-3.5zM6 13v3l6 3.5 6-3v-3l-6 3-6-3.5z' stroke='white' stroke-width='1.2' stroke-linejoin='round'/></svg>`
  },
  {
    aliases: ['百度网盘', 'baiduyun', '百度云'],
    name: '百度网盘',
    category: '实用工具',
    defaultPrice: 25,
    brandColor: '#009CFF',
    iconUrl: 'https://api.companyenrich.com/logo/baiduyun.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23FFFFFF'/><path d='M9.5 14.5a2.5 2.5 0 11-1.5-4.4 3 3 0 015.5-1.1c.5-.5 1.2-.8 2-.8a2.5 2.5 0 010 5h-6z' fill='%23009CFF'/><circle cx='8.5' cy='12' r='1.5' fill='%23FF3B30'/></svg>`
  },
  {
    aliases: ['1password'],
    name: '1Password',
    category: '实用工具',
    defaultPrice: 25,
    brandColor: '#0094F5',
    iconUrl: 'https://api.companyenrich.com/logo/1password.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%230094F5'/><circle cx='12' cy='12' r='6.5' stroke='white' stroke-width='1.5'/><path d='M12 9.5a1.5 1.5 0 00-1.5 1.5c0 .7.5 1.3 1.1 1.5L11 15h2l-.6-2.5c.6-.2 1.1-.8 1.1-1.5a1.5 1.5 0 00-1.5-1.5z' fill='white'/></svg>`
  },
  {
    aliases: ['bitwarden'],
    name: 'Bitwarden',
    category: '实用工具',
    defaultPrice: 8,
    brandColor: '#175DDC',
    iconUrl: 'https://api.companyenrich.com/logo/bitwarden.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23175DDC'/><path d='M12 5.5s4 1.5 6 1.5v5c0 3.5-3.5 5.5-6 6.5-2.5-1-6-3-6-6.5V7c2 0 6-1.5 6-1.5z' stroke='white' stroke-width='1.5' stroke-linejoin='round'/><circle cx='12' cy='10.5' r='1.2' fill='white'/><path d='M12 11.5v3.5' stroke='white' stroke-width='1.5' stroke-linecap='round'/></svg>`
  },
  {
    aliases: ['todoist'],
    name: 'Todoist',
    category: '学习办公',
    defaultPrice: 28,
    brandColor: '#E44332',
    iconUrl: 'https://api.companyenrich.com/logo/todoist.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23E44332'/><path d='M7 9l3.5 3.5L17 6M7 13.5l3.5 3.5L17 10.5M7 18l3.5 1.5L17 15' stroke='white' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/></svg>`
  },
  {
    aliases: ['ticktick', '滴答清单'],
    name: '滴答清单',
    category: '学习办公',
    defaultPrice: 15,
    brandColor: '#4E89FF',
    iconUrl: 'https://api.companyenrich.com/logo/ticktick.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%234E89FF'/><rect x='5' y='5' width='14' height='14' rx='2.5' stroke='white' stroke-width='1.5'/><path d='M8.5 11.5l2.5 2.5 5-5.5' stroke='white' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/><path d='M8 15.5h8' stroke='white' stroke-width='1.2'/></svg>`
  },
  {
    aliases: ['zoom', '祖姆'],
    name: 'Zoom Pro',
    category: '实用工具',
    defaultPrice: 99,
    brandColor: '#2D8CFF',
    iconUrl: 'https://api.companyenrich.com/logo/zoom.us',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%232D8CFF'/><rect x='5' y='8' width='9' height='8' rx='2' fill='white'/><polygon points='14 10 18 8 18 16 14 14' fill='white'/></svg>`
  },
  {
    aliases: ['slack'],
    name: 'Slack Pro',
    category: '实用工具',
    defaultPrice: 50,
    brandColor: '#4A154B',
    iconUrl: 'https://api.companyenrich.com/logo/slack.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%234A154B'/><circle cx='9' cy='9' r='1.2' fill='%2336C5F0'/><path d='M7 9h3.5M10.5 9v3.5' stroke='%2336C5F0' stroke-width='1.5' stroke-linecap='round'/><circle cx='15' cy='9' r='1.2' fill='%232EB67D'/><path d='M15 7v3.5M15 10.5h-3.5' stroke='%232EB67D' stroke-width='1.5' stroke-linecap='round'/><circle cx='15' cy='15' r='1.2' fill='%23E01E5A'/><path d='M17 15h-3.5M13.5 15v-3.5' stroke='%23E01E5A' stroke-width='1.5' stroke-linecap='round'/><circle cx='9' cy='15' r='1.2' fill='%23ECB22E'/><path d='M9 17v-3.5M9 13.5h3.5' stroke='%23ECB22E' stroke-width='1.5' stroke-linecap='round'/></svg>`
  },
  {
    aliases: ['微信', 'wechat', '微信支付', 'wx'],
    name: '微信服务',
    category: '实用工具',
    defaultPrice: 0,
    brandColor: '#07C160',
    // 微信官方大厂绝对高清原图连接 (永不过期)
    iconUrl: 'https://open.weixin.qq.com/zh_CN/htmledition/res/assets/res-design-download/icon_wechat.png',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%2307C160'/><path d='M10.5 6c-3 0-5.5 2-5.5 4.5 0 1.5 1 2.8 2.5 3.5l-.5 1.5 2-1c.5.1 1 .1 1.5.1 3 0 5.5-2 5.5-4.5S13.5 6 10.5 6zm5.5 5.5c-.3 0-.7 0-1 .1.8 1.4.2 3.1-1.3 3.8.8.8 2 1.1 3.3 1.1.4 0 .8 0 1.2-.1l1.5.8-.4-1.2c1.2-.6 1.7-1.6 1.7-2.7 0-1.8-2.2-3-5-3z' fill='white'/></svg>`
  },
  {
    aliases: ['支付宝', 'alipay', 'zfb'],
    name: '支付宝服务',
    category: '实用工具',
    defaultPrice: 0,
    brandColor: '#108EE9',
    // 支付宝官方 Ant Design 生产级超清矢量 CDN 图标，绝对 100% 官方正版！
    iconUrl: 'https://api.companyenrich.com/logo/alipay.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23108EE9'/><path d='M6 10h12M12 5v5m-4 4.5a18 18 0 018 0M7.5 18c1.5-2 3.5-3.5 4.5-4.5 1 1 3 2.5 4.5 4.5' stroke='white' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/><path d='M10 14h4' stroke='white' stroke-width='1.5'/></svg>`
  },
  {
    aliases: ['微博', 'weibo'],
    name: '新浪微博',
    category: '实用工具',
    defaultPrice: 10,
    brandColor: '#E6162D',
    iconUrl: 'https://api.companyenrich.com/logo/weibo.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23E6162D'/><path d='M12 17.5c-4 0-7-2-7-4.5s2.5-4 5.5-4.3c-.2-.5-.2-1 0-1.5a3 3 0 012-2c1.5-.5 3 .2 3.5 1.5 2 0 3.5.8 3.5 2s-3.5 8.8-7.5 8.8z' fill='white'/><circle cx='12.5' cy='12.5' r='1.5' fill='%23E6162D'/><path d='M15.5 8.5c1-1 2.5-1 3.5 0' stroke='%23FFD700' stroke-width='1.2' stroke-linecap='round'/></svg>`
  },
  {
    aliases: ['小红书', 'xhs', 'xiaohongshu'],
    name: '小红书',
    category: '实用工具',
    defaultPrice: 0,
    brandColor: '#FE2C55',
    iconUrl: 'https://api.companyenrich.com/logo/xiaohongshu.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23FE2C55'/><path d='M7 6.5h10v3H7v-3zM7 11.5h10v3H7v-3zM7 16.5h10v1.5H7v-1.5z' stroke='white' stroke-width='1.2' stroke-linejoin='round'/><path d='M12 5v14' stroke='white' stroke-width='1.5'/></svg>`
  },
  {
    aliases: ['抖音', 'douyin', 'dy'],
    name: '抖音',
    category: '影音娱乐',
    defaultPrice: 0,
    brandColor: '#000000',
    iconUrl: 'https://api.companyenrich.com/logo/douyin.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23111111'/><path d='M14 5v10a3 3 0 11-3-3h3v-3a4 4 0 003.5-2v-2h-3.5z' stroke='white' stroke-width='1.2' stroke-linejoin='round'/><path d='M14 5v10a3 3 0 11-3-3h3v-3a4 4 0 003.5-2v-2h-3.5z' stroke='%23FE2C55' stroke-width='0.8' stroke-dasharray='1 2'/></svg>`
  },

  // ==================== 5. 主流游戏订阅 (Gaming Subscriptions) ====================
  {
    aliases: ['switch', 'nintendo', 'nso', '任天堂'],
    name: 'Nintendo Switch Online',
    category: '游戏',
    defaultPrice: 155,
    brandColor: '#E60012',
    iconUrl: 'https://api.companyenrich.com/logo/nintendo.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23E60012'/><rect x='4.5' y='5.5' width='15' height='13' rx='2.5' stroke='white' stroke-width='1.5'/><line x1='9.5' y1='5.5' x2='9.5' y2='18.5' stroke='white' stroke-width='1.2'/><circle cx='7' cy='9.5' r='1.2' fill='white'/><circle cx='12' cy='14.5' r='1.2' fill='white'/></svg>`
  },
  {
    aliases: ['playstation', 'ps', 'ps+', 'psn', 'ps plus'],
    name: 'PlayStation Plus',
    category: '游戏',
    defaultPrice: 428,
    brandColor: '#003087',
    iconUrl: 'https://api.companyenrich.com/logo/playstation.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23003087'/><path d='M7 16V8.5a3.5 3.5 0 017 0v2M10.5 7v10' stroke='white' stroke-width='1.6' stroke-linecap='round'/></svg>`
  },
  {
    aliases: ['xbox', 'xgp', 'gamepass', 'game pass'],
    name: 'Xbox Game Pass',
    category: '游戏',
    defaultPrice: 79,
    brandColor: '#107C10',
    iconUrl: 'https://api.companyenrich.com/logo/xbox.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23107C10'/><circle cx='12' cy='12' r='7.5' stroke='white' stroke-width='1.5'/><path d='M6.5 7.5c2 2 4.5 3.5 5.5 4.5m5.5-4.5c-2 2-4.5 3.5-5.5 4.5' stroke='white' stroke-width='1.5' stroke-linecap='round'/></svg>`
  },
  {
    aliases: ['ea play', 'ea', 'origin'],
    name: 'EA Play',
    category: '游戏',
    defaultPrice: 38,
    brandColor: '#000000',
    iconUrl: 'https://api.companyenrich.com/logo/ea.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23111111'/><path d='M5 16.5L10 7.5h2l5 9h-2.5L11 10.5 7.5 16.5H5zm8-4h6v2h-6v-2z' fill='white'/></svg>`
  },
  {
    aliases: ['steam', '蒸汽平台'],
    name: 'Steam',
    category: '游戏',
    defaultPrice: 0,
    brandColor: '#171A21',
    iconUrl: 'https://api.companyenrich.com/logo/steampowered.com',
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23171A21'/><circle cx='12' cy='12' r='6.5' stroke='white' stroke-width='1.5'/><path d='M12 5.5a6.5 6.5 0 015.5 3L13 13.5v1.5l-2.5-1v-2.5L8.5 10c1.5-2.5 3-4.5 3.5-4.5z' fill='white'/></svg>`
  }
,
  {
    aliases: ["paramount","paramount+","派拉蒙"],
    name: "Paramount+",
    category: "影音娱乐",
    defaultPrice: 50,
    brandColor: "#0064FF",
    iconUrl: "https://api.companyenrich.com/logo/paramountplus.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%230064FF'/><path d='M12 4.5l1.5 3 3.5.5-2.5 2.5.5 3.5-3-2-3 2 .5-3.5-2.5-2.5 3.5-.5z' fill='white'/><circle cx='12' cy='12' r='8' stroke='white' stroke-width='0.8' stroke-dasharray='1 2'/></svg>`
  },
  {
    aliases: ["apple tv","apple tv+","苹果tv"],
    name: "Apple TV+",
    category: "影音娱乐",
    defaultPrice: 38,
    brandColor: "#000000",
    iconUrl: "https://api.companyenrich.com/logo/tv.apple.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23111111'/><path d='M16 11.5c.3-2.3 2.1-3 2.2-3.1-1-1.5-2.6-1.7-3.2-1.8-1.4-.2-2.8.8-3.5.8s-1.9-.8-3.1-.8c-1.5 0-3 1-3.8 2.3-1.6 2.8-.4 6.9 1.1 9.2.8 1.1 1.7 2.3 2.8 2.2 1.1-.1 1.5-.7 2.8-.7s1.7.7 2.8.6c1.1 0 1.9-1.1 2.6-2.1.8-1.2 1.1-2.4 1.2-2.4s-2.3-.9-2.3-3.6zM14.5 4.8c.6-.7 1-1.7.9-2.7-.9.1-1.9.6-2.5 1.3-.6.6-1.1 1.6-1 2.6 1 .1 1.9-.5 2.6-1.2z' fill='white'/></svg>`
  },
  {
    aliases: ["crunchyroll","cr","动漫限时"],
    name: "Crunchyroll",
    category: "影音娱乐",
    defaultPrice: 48,
    brandColor: "#DF6300",
    iconUrl: "https://api.companyenrich.com/logo/crunchyroll.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23DF6300'/><circle cx='12' cy='12' r='7.5' stroke='white' stroke-width='1.5'/><circle cx='13.5' cy='12' r='4' fill='white'/><circle cx='13.5' cy='12' r='1.5' fill='%23DF6300'/></svg>`
  },
  {
    aliases: ["咪咕","咪咕视频","migu"],
    name: "咪咕视频",
    category: "影音娱乐",
    defaultPrice: 15,
    brandColor: "#FF007F",
    iconUrl: "https://api.companyenrich.com/logo/miguvideo.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23FF007F'/><circle cx='12' cy='12' r='7' stroke='white' stroke-width='1.5'/><path d='M9.5 9.5h5L12 14.5z' fill='white'/></svg>`
  },
  {
    aliases: ["虎牙","虎牙直播","huya"],
    name: "虎牙直播",
    category: "影音娱乐",
    defaultPrice: 20,
    brandColor: "#FF9000",
    iconUrl: "https://api.companyenrich.com/logo/huya.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23FF9000'/><path d='M7 8.5c1-1 4-1.5 5 0s1.5 4 0 5-4 1-5 0' stroke='white' stroke-width='1.8'/><circle cx='15.5' cy='11.5' r='1.2' fill='white'/></svg>`
  },
  {
    aliases: ["斗鱼","斗鱼直播","douyu"],
    name: "斗鱼直播",
    category: "影音娱乐",
    defaultPrice: 20,
    brandColor: "#FF5500",
    iconUrl: "https://api.companyenrich.com/logo/douyu.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23FF5500'/><path d='M6.5 13.5a5.5 5.5 0 0111 0c0 1.5-1 3.5-3 4.5l-2.5-1' stroke='white' stroke-width='1.8' stroke-linecap='round'/><circle cx='12' cy='11.5' r='1.2' fill='white'/></svg>`
  },
  {
    aliases: ["deepseek","深度求索","ds"],
    name: "DeepSeek",
    category: "学习办公",
    defaultPrice: 0,
    brandColor: "#003BFF",
    iconUrl: "https://api.companyenrich.com/logo/deepseek.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23003BFF'/><path d='M7.5 10c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5v5c0 1-.8 1.8-1.8 1.8h-1c-.5 0-1-.3-1.3-.7L12 14.5M10.5 10v4' stroke='white' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/></svg>`
  },
  {
    aliases: ["perplexity","pplx"],
    name: "Perplexity AI",
    category: "学习办公",
    defaultPrice: 145,
    brandColor: "#10B981",
    iconUrl: "https://api.companyenrich.com/logo/perplexity.ai",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%2310B981'/><rect x='6.5' y='6.5' width='11' height='11' rx='1.5' stroke='white' stroke-width='1.5'/><line x1='12' y1='6.5' x2='12' y2='17.5' stroke='white' stroke-width='1.5'/></svg>`
  },
  {
    aliases: ["cursor","cursor editor","cursor.sh"],
    name: "Cursor",
    category: "学习办公",
    defaultPrice: 145,
    brandColor: "#000000",
    iconUrl: "https://api.companyenrich.com/logo/cursor.sh",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23111111'/><path d='M7 7.5L17 11.5M7 16.5L17 12.5' stroke='white' stroke-width='2' stroke-linecap='round'/></svg>`
  },
  {
    aliases: ["grammarly","语法纠错"],
    name: "Grammarly",
    category: "学习办公",
    defaultPrice: 88,
    brandColor: "#15C39A",
    iconUrl: "https://api.companyenrich.com/logo/grammarly.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%2315C39A'/><circle cx='12' cy='12' r='7.5' stroke='white' stroke-width='1.8'/><path d='M9.5 12a2.5 2.5 0 012.5-2.5h2.5' stroke='white' stroke-width='1.8' stroke-linecap='round'/></svg>`
  },
  {
    aliases: ["obsidian","ob"],
    name: "Obsidian",
    category: "学习办公",
    defaultPrice: 0,
    brandColor: "#4B2C84",
    iconUrl: "https://api.companyenrich.com/logo/obsidian.md",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%234B2C84'/><path d='M12 4.5l5.5 3.5-2.5 11.5-3-2.5-3.5 2.5-2.5-11.5L12 4.5z' fill='white' fill-opacity='0.9'/><path d='M12 4.5v12.5L9.5 20l-2.5-12L12 4.5z' fill='black' fill-opacity='0.15'/></svg>`
  },
  {
    aliases: ["heptabase","hepta"],
    name: "Heptabase",
    category: "学习办公",
    defaultPrice: 68,
    brandColor: "#4A154B",
    iconUrl: "https://api.companyenrich.com/logo/heptabase.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%234A154B'/><rect x='6.5' y='6.5' width='11' height='11' rx='2.2' stroke='white' stroke-width='1.8'/><rect x='10.5' y='10.5' width='3' height='3' fill='white'/></svg>`
  },
  {
    aliases: ["语雀","yuque"],
    name: "语雀",
    category: "学习办公",
    defaultPrice: 9,
    brandColor: "#00B96B",
    iconUrl: "https://api.companyenrich.com/logo/yuque.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%2300B96B'/><path d='M6.5 15.5c2.5-3 5-3 7.5 0M9 8.5C9.5 6 12 5 14.5 7s2.5 5 0 6' stroke='white' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/></svg>`
  },
  {
    aliases: ["幕布","mubu"],
    name: "幕布",
    category: "学习办公",
    defaultPrice: 9,
    brandColor: "#00C27F",
    iconUrl: "https://api.companyenrich.com/logo/mubu.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%2300C27F'/><path d='M7.5 7.5h9v9h-9v-9z' fill='white'/><path d='M10.5 10.5h3v3h-3v-3z' fill='%2300C27F'/></svg>`
  },
  {
    aliases: ["wolai","我来"],
    name: "Wolai 我来",
    category: "学习办公",
    defaultPrice: 15,
    brandColor: "#FF0000",
    iconUrl: "https://api.companyenrich.com/logo/wolai.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23FF0000'/><path d='M7 7.5h10v9H7v-9z' stroke='white' stroke-width='1.8'/><line x1='12' y1='7.5' x2='12' y2='16.5' stroke='white' stroke-width='1.5'/></svg>`
  },
  {
    aliases: ["飞书","feishu","lark"],
    name: "飞书",
    category: "学习办公",
    defaultPrice: 0,
    brandColor: "#007AFF",
    iconUrl: "https://api.companyenrich.com/logo/feishu.cn",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23007AFF'/><circle cx='9' cy='9' r='2' fill='white'/><path d='M15 15.5c0-1.5-2-3-4.5-3s-4.5 1.5-4.5 3H15z' fill='white'/><circle cx='14' cy='10' r='1.5' fill='white'/></svg>`
  },
  {
    aliases: ["钉钉","dingtalk","dd"],
    name: "钉钉",
    category: "学习办公",
    defaultPrice: 0,
    brandColor: "#007FFF",
    iconUrl: "https://api.companyenrich.com/logo/dingtalk.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23007FFF'/><path d='M6.5 16.5C8 12.5 11 11.5 13 11.5s4 1.5 4.5 5H6.5z' fill='white'/><path d='M10 7.5L13.5 10 10 12.5V7.5z' fill='white'/></svg>`
  },
  {
    aliases: ["腾讯会议","voov","voov meeting"],
    name: "腾讯会议",
    category: "实用工具",
    defaultPrice: 30,
    brandColor: "#0066FF",
    iconUrl: "https://api.companyenrich.com/logo/meeting.tencent.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%230066FF'/><rect x='5.5' y='8.5' width='9' height='7' rx='1.5' fill='white'/><polygon points='14.5 10 18.5 8 18.5 16 14.5 14' fill='white'/></svg>`
  },
  {
    aliases: ["阿里云盘","阿里网盘","alipan"],
    name: "阿里云盘",
    category: "实用工具",
    defaultPrice: 15,
    brandColor: "#FF5722",
    iconUrl: "https://api.companyenrich.com/logo/alipan.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23FF5722'/><circle cx='12' cy='12' r='7.5' stroke='white' stroke-width='1.8'/><line x1='12' y1='4.5' x2='12' y2='19.5' stroke='white' stroke-width='1.5'/></svg>`
  },
  {
    aliases: ["夸克","夸克网盘","quark"],
    name: "夸克网盘",
    category: "实用工具",
    defaultPrice: 12,
    brandColor: "#004EFF",
    iconUrl: "https://api.companyenrich.com/logo/quark.cn",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23004EFF'/><circle cx='12' cy='12' r='7.5' fill='white'/><circle cx='12' cy='12' r='4' fill='%23004EFF'/></svg>`
  },
  {
    aliases: ["115","115网盘"],
    name: "115网盘",
    category: "实用工具",
    defaultPrice: 38,
    brandColor: "#007AFF",
    iconUrl: "https://api.companyenrich.com/logo/115.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23007AFF'/><rect x='5.5' y='6.5' width='13' height='11' rx='2.2' stroke='white' stroke-width='1.8'/><line x1='12' y1='6.5' x2='12' y2='17.5' stroke='white' stroke-width='1.5'/></svg>`
  },
  {
    aliases: ["nordvpn","nord"],
    name: "NordVPN",
    category: "实用工具",
    defaultPrice: 88,
    brandColor: "#4687FF",
    iconUrl: "https://api.companyenrich.com/logo/nordvpn.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%234687FF'/><path d='M5 16.5l3.5-10 3.5 10 3.5-10 3.5 10' stroke='white' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/></svg>`
  },
  {
    aliases: ["shadowrocket","小火箭"],
    name: "Shadowrocket",
    category: "实用工具",
    defaultPrice: 18,
    brandColor: "#007AFF",
    iconUrl: "https://api.companyenrich.com/logo/shadowrocket.app",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23007AFF'/><polygon points='12 4.5 16.5 17.5 12 14.5 7.5 17.5' fill='white'/></svg>`
  },
  {
    aliases: ["keep","keep会员"],
    name: "Keep",
    category: "其他",
    defaultPrice: 19,
    brandColor: "#24283C",
    iconUrl: "https://api.companyenrich.com/logo/gotokeep.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%2324283C'/><path d='M6.5 7.5v9h3.5v-9H6.5zm5.5 0v9h5.5M12 12h3' stroke='white' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/></svg>`
  },
  {
    aliases: ["strava"],
    name: "Strava",
    category: "其他",
    defaultPrice: 60,
    brandColor: "#FC5200",
    iconUrl: "https://api.companyenrich.com/logo/strava.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23FC5200'/><polyline points='5 7.5 12 16.5 19 7.5' stroke='white' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/></svg>`
  },
  {
    aliases: ["微信读书","weread"],
    name: "微信读书",
    category: "学习办公",
    defaultPrice: 19,
    brandColor: "#3F84F8",
    iconUrl: "https://api.companyenrich.com/logo/weread.qq.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%233F84F8'/><path d='M6.5 6.5C8.5 7.5 10 9 12 9.5s3.5-2 5.5-3v11c-2 1-3.5 2.5-5.5 3s-3.5-2-5.5-3v-11z' fill='white'/><line x1='12' y1='9.5' x2='12' y2='20.5' stroke='%233F84F8' stroke-width='1.5'/></svg>`
  },
  {
    aliases: ["得到","dedao"],
    name: "得到",
    category: "学习办公",
    defaultPrice: 38,
    brandColor: "#FF6E00",
    iconUrl: "https://api.companyenrich.com/logo/dedao.cn",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23FF6E00'/><path d='M6.5 16.5v-9c0-1.5 1.5-3 3.5-3s3.5 1.5 3.5 3v9H6.5zM17.5 10c0-1.5 1.5-2.5 3-2.5s3 1 3 2.5v6.5h-6V10z' fill='white'/></svg>`
  },
  {
    aliases: ["setapp","套用","订阅合集"],
    name: "Setapp",
    category: "实用工具",
    defaultPrice: 65,
    brandColor: "#000000",
    iconUrl: "https://api.companyenrich.com/logo/setapp.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23000000'/><path d='M6.5 6.5h11v2.5H9v2h7.5v2.5H9v2h8.5v2.5h-11v-11.5z' fill='white'/></svg>`
  },
  {
    aliases: ["jetbrains","idea","webstorm","pycharm","clion"],
    name: "JetBrains",
    category: "学习办公",
    defaultPrice: 200,
    brandColor: "#000000",
    iconUrl: "https://api.companyenrich.com/logo/jetbrains.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23000000'/><path d='M5 13.5v-4L9 5h6.5l3.5 4.5v5L15 19H8l-3-5.5z' fill='none' stroke='white' stroke-width='1.5'/><rect x='8' y='9' width='8' height='6' fill='none' stroke='white' stroke-width='1.2'/><text x='12' y='13' fill='white' font-size='5.5' font-weight='900' font-family='sans-serif' text-anchor='middle'>JB</text></svg>`
  },
  {
    aliases: ["goodnotes","goodnotes 6","goodnotes5","好记","gn"],
    name: "GoodNotes",
    category: "学习办公",
    defaultPrice: 68,
    brandColor: "#0099FF",
    iconUrl: "https://api.companyenrich.com/logo/goodnotes.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%230099FF'/><path d='M6.5 17c1-3.5 4-5.5 8.5-5.5s6.5 1 6.5 1m-15 4c0-3 3.5-8.5 8-8.5s6.5 3 6.5 5.5v1.5' stroke='white' stroke-width='1.8' stroke-linecap='round'/><path d='M10 8.5L8.5 7 11 5.5 12.5 7 10 8.5z' fill='white'/></svg>`
  },
  {
    aliases: ["notability","笔计","ntb"],
    name: "Notability",
    category: "学习办公",
    defaultPrice: 80,
    brandColor: "#00C3FF",
    iconUrl: "https://api.companyenrich.com/logo/gingerlabs.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%2300C3FF'/><path d='M6 14.5a6 6 0 0112 0v2.5a1.5 1.5 0 01-1.5 1.5h-1a1.5 1.5 0 01-1.5-1.5v-1a1.5 1.5 0 011.5-1.5M10 14.5v2.5a1.5 1.5 0 01-1.5 1.5h-1A1.5 1.5 0 016 17v-2.5' stroke='white' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/><path d='M12 5.5v3M10 7h4' stroke='white' stroke-width='1.5' stroke-linecap='round'/></svg>`
  },
  {
    aliases: ["infuse","infuse pro","infuse播放器","if"],
    name: "Infuse Pro",
    category: "影音娱乐",
    defaultPrice: 10,
    brandColor: "#FF5E2B",
    iconUrl: "https://api.companyenrich.com/logo/firecore.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23FF5E2B'/><path d='M12 4.5s-4 4.5-4 8.5c0 2.2 1.8 4 4 4s4-1.8 4-4c0-4-4-8.5-4-8.5zm-1.5 6.5s-1.5 1.5-1.5 3c0 1 .8 1.8 1.8 1.8.8 0 1.2-.5 1.2-.5s-1.5-1-1.5-2.8c0-1.5 0-1.5 0-1.5z' fill='white'/></svg>`
  },
  {
    aliases: ["tidal","潮汐"],
    name: "Tidal",
    category: "影音娱乐",
    defaultPrice: 60,
    brandColor: "#000000",
    iconUrl: "https://api.companyenrich.com/logo/tidal.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23000000'/><path d='M12 4.5l3.5 3.5-3.5 3.5L8.5 8 12 4.5zM12 11.5l3.5 3.5-3.5 3.5-3.5-3.5 3.5-3.5zM19 11.5l3.5-3.5-3.5-3.5-3.5 3.5 3.5 3.5zM5 11.5L8.5 8 5 4.5 1.5 8 5 11.5z' fill='white'/></svg>`
  },
  {
    aliases: ["x","twitter","推特","x premium"],
    name: "X Premium",
    category: "其他",
    defaultPrice: 50,
    brandColor: "#000000",
    iconUrl: "https://api.companyenrich.com/logo/x.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23000000'/><path d='M18.2 4.5h-2.5l-4.8 5.8L6.8 4.5H4.2l5.8 7-6 7.2h2.5l5.2-6.2 4.5 6.2h2.6l-6.2-7.8 5.8-6.9zm-2.8 12h-1.4L8.2 6H9.6l5.8 10.5z' fill='white'/></svg>`
  },
  {
    aliases: ["apple arcade","arcade","苹果游戏","苹果街机"],
    name: "Apple Arcade",
    category: "游戏",
    defaultPrice: 38,
    brandColor: "#FA243C",
    iconUrl: "https://api.companyenrich.com/logo/arcade.apple.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%23FA243C'/><path d='M6.5 16.5V8.5A3.5 3.5 0 0113 5.5v2.2A1.5 1.5 0 0011.5 9v1.5a1.5 1.5 0 001.5 1.5h1.5a1.5 1.5 0 001.5-1.5V9a1.5 1.5 0 00-1.5-1.5h-1.5' stroke='white' stroke-width='1.8' stroke-linecap='round'/></svg>`
  },
  {
    aliases: ["原神小月卡","空月祝福","原神","genshin"],
    name: "原神空月祝福",
    category: "游戏",
    defaultPrice: 30,
    brandColor: "#4A5B8C",
    iconUrl: "https://api.companyenrich.com/logo/hoyoverse.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%234A5B8C'/><circle cx='12' cy='12' r='8' stroke='white' stroke-width='1.2'/><path d='M12 4.5a7.5 7.5 0 000 15V4.5z' fill='white'/><path d='M12 7.5a4.5 4.5 0 000 9V7.5z' fill='%234A5B8C'/></svg>`
  },
  {
    aliases: ["星铁小月卡","列车补给凭证","星穹铁道","崩铁","star rail"],
    name: "崩坏星穹铁道月卡",
    category: "游戏",
    defaultPrice: 30,
    brandColor: "#2B2B4A",
    iconUrl: "https://api.companyenrich.com/logo/hoyoverse.com",
    iconSvg: `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='%232B2B4A'/><polygon points='12 4.5 14.5 9.5 20 10.5 16 14.5 17 20 12 17 7 20 8 14.5 4 10.5 9.5 9.5' fill='white'/></svg>`
  }
];

/**
 * 根据用户输入的名称，模糊匹配对应的官方服务
 * @param {string} inputName 用户输入的名称 
 * @returns {object|null} 匹配到的品牌配置项
 */
function matchApp(inputName) {
  if (!inputName) return null;
  const val = inputName.trim().toLowerCase();
  
  // 1. 第一阶段：精准匹配别名之一（全等）
  let matched = APP_LIBRARY.find(item => 
    item.aliases.some(alias => alias === val)
  );
  if (matched) return matched;
  
  // 2. 第二阶段：匹配用户输入开头与别名一致（前缀匹配），或者别名以用户输入开头
  matched = APP_LIBRARY.find(item => 
    item.aliases.some(alias => val.startsWith(alias) || alias.startsWith(val))
  );
  if (matched) return matched;

  // 3. 第三阶段：包含匹配（模糊匹配词库）
  matched = APP_LIBRARY.find(item => 
    item.aliases.some(alias => val.includes(alias) || alias.includes(val))
  );
  
  return matched || null;
}

/**
 * 生成自定义账单的高像素 Letter-Badge SVG 图标
 * @param {string} name 账单服务名称
 * @param {string} brandColor 品牌背景色 (可选)
 * @returns {string} 渲染后的 SVG String
 */
function generateFallbackSvg(name, brandColor) {
  const initial = name ? name.trim().substring(0, 1).toUpperCase() : '数';
  const color = brandColor || '#8C9691'; // 默认晨雾石板灰
  
  // 纯手工画册排版：雅致卡片底，精制大写字首，带有超细白框，极致高保真
  return `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='6' fill='${color.replace('#', '%23')}'/><rect x='2' y='2' width='20' height='20' rx='4.5' stroke='white' stroke-opacity='0.15' stroke-width='1'/><text x='12' y='16' fill='white' font-size='11' font-weight='800' font-family='sans-serif' text-anchor='middle'>${initial}</text></svg>`;
}

/**
 * 根据分类名称与激活状态，获取对应官方高精度矢量分类 SVG 图标
 * @param {string} category 分类大类名称
 * @param {boolean} isActive 是否是高亮选中状态 
 * @returns {string} 渲染后的 SVG 字符串
 */
function getCategoryIcon(category, isActive = false) {
  const color = isActive ? '%23FFFFFF' : '%231C3D32'; // 激活为雪白，未激活为典雅 Pine Green
  const strokeWidth = 1.6;
  
  const icons = {
    '影音娱乐': `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='12' cy='12' r='8.5' stroke='${color}' stroke-width='${strokeWidth}'/><circle cx='12' cy='12' r='3.5' stroke='${color}' stroke-width='1.2'/><circle cx='12' cy='12' r='1.2' fill='${color}'/><path d='M12 2v3M12 19v3M2 12h3M19 12h3' stroke='${color}' stroke-width='1' stroke-linecap='round'/></svg>`, // 胶片/黑胶
    '实用工具': `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M14.5 5.5a3 3 0 00-4.2 0L4 11.8l1.2 1.2 6.3-6.3a1 1 0 111.4 1.4L6.6 14.4l1.2 1.2 6.3-6.3a3 3 0 000-4.2z' fill='${color}'/><path d='M9.5 17.5l-3-3M16.5 16.5l-2.5 2.5M18 18l-1-1' stroke='${color}' stroke-width='${strokeWidth}' stroke-linecap='round'/></svg>`, // 工具
    '学习办公': `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='4.5' y='4.5' width='15' height='15' rx='2.2' stroke='${color}' stroke-width='${strokeWidth}'/><path d='M8 8.5h8M8 12h8M8 15.5h5' stroke='${color}' stroke-width='${strokeWidth}' stroke-linecap='round'/></svg>`, // 本子
    '游戏': `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='3.5' y='6.5' width='17' height='11' rx='2.5' stroke='${color}' stroke-width='${strokeWidth}'/><path d='M6.5 12h2.5M7.75 10.75v2.5M14.5 12a1 1 0 100-2 1 1 0 000 2zm2 1.5a1 1 0 100-2 1 1 0 000 2z' stroke='${color}' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/></svg>`, // 手柄
    '其他': `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='12' cy='12' r='8.5' stroke='${color}' stroke-width='${strokeWidth}'/><path d='M12 7.5v9M7.5 12h9' stroke='${color}' stroke-width='${strokeWidth}' stroke-linecap='round'/></svg>` // 圆加号
  };
  
  if (icons[category]) return icons[category];
  
  // 自定义分类的高清 fallback 形状 (星型)
  return `<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M12 4.5l2 4.5 5 .5-3.5 3.5 1 5-4.5-2.5-4.5 2.5 1-5-3.5-3.5 5-.5 2-4.5z' stroke='${color}' stroke-width='${strokeWidth}' stroke-linejoin='round'/></svg>`;
}

/**
 * 将高精度 SVG 字符流利用小程序系统极速引擎编码为标准的 Base64 格式，以排除所有单双引号/中文字符导致的 CSS url 错误
 * @param {string} str 原始 SVG 字符串
 * @returns {string} 编码后的 Base64 String
 */
function svgToBase64(str) {
  if (!str) return '';
  // 核心微调：在 Base64 编码前，必须将所有 URL-encoded 的 %23 还原为正规 of SVG 颜色井号 #
  // 因为在 Base64 编码环境下，SVG 内部的颜色格式必须是合法的 '#' 开头的十六进制，否则浏览器解析 SVG 颜色失败会直接呈现为一片空白！
  const cleanStr = str.replace(/%23/g, '#');
  const utf8 = [];
  for (let i = 0; i < cleanStr.length; i++) {
    let charcode = cleanStr.charCodeAt(i);
    if (charcode < 0x80) utf8.push(charcode);
    else if (charcode < 0x800) {
      utf8.push(0xc0 | (charcode >> 6), 
                0x80 | (charcode & 0x3f));
    }
    else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(0xe0 | (charcode >> 12), 
                0x80 | ((charcode >> 6) & 0x3f), 
                0x80 | (charcode & 0x3f));
    }
    else {
      i++;
      charcode = 0x10000 + (((charcode & 0x3ff)<<10) | (cleanStr.charCodeAt(i) & 0x3ff));
      utf8.push(0xf0 | (charcode >> 18), 
                0x80 | ((charcode >> 12) & 0x3f), 
                0x80 | ((charcode >> 6) & 0x3f), 
                0x80 | (charcode & 0x3f));
    }
  }
  try {
    const arrayBuffer = new Uint8Array(utf8).buffer;
    return wx.arrayBufferToBase64(arrayBuffer);
  } catch (e) {
    console.error('[Base64] 编码发生异常:', e);
    return '';
  }
}

module.exports = {
  APP_LIBRARY,
  matchApp,
  generateFallbackSvg,
  getCategoryIcon,
  svgToBase64
};

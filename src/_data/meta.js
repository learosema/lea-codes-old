module.exports = {
  url: process.env.URL || 'http://localhost:8080',
  siteName:
    'Lea codes and shares her thoughts, struggles and learnings on her journey.',
  siteDescription:
    'Lea codes and shares her thoughts, struggles and learnings on her journey.',
  siteType: 'Person',
  locale: 'en_EN',
  lang: 'en',
  author: 'Lea Rosema',
  authorEmail: 'lea@lea.codes',
  authorWebsite: 'https://lea.codes',
  themeColor: '#DD4462',
  themeBgColor: '#F3F3F3',
  meta_data: {
    opengraph_default: '/assets/images/opengraph-default.jpg',
    mastodonProfile: 'https://chaos.social/@learosema',
  },
  pagination: {
    itemsPerPage: 20,
  },
  menu: {
    closedText: 'Menu',
  },
};

module.exports = {
  url: process.env.URL || 'http://localhost:8080',
  siteName: 'Lea codes',
  siteDescription: "Lea's Blog on web development",
  siteType: 'Person',
  locale: 'en_EN',
  lang: 'en',
  author: 'Lea Rosema',
  authorEmail: 'lea@lea.codes',
  authorWebsite: 'https://lea.codes',
  themeColor: '#DD4462',
  themeBgColor: '#F3F3F3',
  dateFormat: 'DD.MM.YYYY',
  meta_data: {
    opengraph_default: '/assets/images/opengraph-default.jpg',
    mastodonProfile: 'https://lea.lgbt/@lea',
  },
  pagination: {
    itemsPerPage: 20,
  },
};

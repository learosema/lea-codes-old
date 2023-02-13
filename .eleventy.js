const syntaxHighlightPlugin = require('@11ty/eleventy-plugin-syntaxhighlight');
const rssPlugin = require('@11ty/eleventy-plugin-rss');
const { EleventyRenderPlugin } = require('@11ty/eleventy');

const esbuildPlugin = require('./config/plugins/esbuild');
const postCSSPlugin = require('./config/plugins/postcss');
const htmlTransformPlugin = require('./config/plugins/html-transform');
const {
  formatdate,
  isodate,
  limit,
  minify,
  where,
  splitlines,
  slugify,
} = require('./config/filters/index');

// module import events
const { svgToJpeg } = require('./config/events/index.js');

module.exports = (eleventyConfig) => {
  // custom watch targets
  eleventyConfig.addWatchTarget('./src/assets');

  // plugins
  eleventyConfig.addPlugin(syntaxHighlightPlugin);
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(esbuildPlugin);
  eleventyConfig.addPlugin(postCSSPlugin);
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(htmlTransformPlugin);

  // filters
  eleventyConfig.addFilter('formatdate', formatdate);
  eleventyConfig.addFilter('isodate', isodate);
  eleventyConfig.addFilter('limit', limit);
  eleventyConfig.addFilter('minify', minify);
  eleventyConfig.addFilter('where', where);
  eleventyConfig.addFilter('splitlines', splitlines);
  eleventyConfig.addFilter('slugify', slugify);
  eleventyConfig.addFilter('keys', Object.keys);
  eleventyConfig.addFilter('values', Object.values);
  eleventyConfig.addFilter('entries', Object.entries);

  // short codes
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`); // current year, stephanie eckles
  eleventyConfig.addShortcode('packageVersion', () => `v${packageVersion}`);

  // passthrough copy
  // same path
  ['src/assets/fonts/', 'src/assets/images/'].forEach((path) =>
    eleventyConfig.addPassthroughCopy(path)
  );

  // social icons to root directory
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/*': '/',
  });

  eleventyConfig.addPassthroughCopy({
    'src/assets/css/global.css': 'src/_includes/global.css',
  });

  // build events
  eleventyConfig.on('afterBuild', svgToJpeg);

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  eleventyConfig.setUseGitIgnore(false);

  return {
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      output: 'dist',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts',
    },
  };
};

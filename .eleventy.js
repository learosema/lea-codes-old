const syntaxHighlightPlugin = require('@11ty/eleventy-plugin-syntaxhighlight');

const rssPlugin = require('@11ty/eleventy-plugin-rss');
const { EleventyRenderPlugin } = require('@11ty/eleventy');

const esbuildPlugin = require('./config/plugins/esbuild');
const lightningCSSPlugin = require('./config/plugins/lightning-css');
const htmlTransformPlugin = require('./config/plugins/html-transform');
const imagePlugin = require('./config/plugins/image');

const { filterPlugin } = require('./config/filters/index');

// module import events
const { svgToJpeg } = require('./config/events/index.js');

module.exports = (eleventyConfig) => {
  // custom watch targets
  eleventyConfig.addWatchTarget('./src/assets');

  // plugins
  eleventyConfig.addPlugin(syntaxHighlightPlugin);
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(esbuildPlugin);
  eleventyConfig.addPlugin(lightningCSSPlugin);
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(htmlTransformPlugin);
  eleventyConfig.addPlugin(imagePlugin);

  // filters
  eleventyConfig.addPlugin(filterPlugin);

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

const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');

const htmlMinTransform = require('./eleventy/html-min-transform');
const filterGlslMinify = require('./eleventy/filter-glslminify');

module.exports = (config) => {
  config.addPlugin(pluginSyntaxHighlight);
  config.addPlugin(pluginRss, {
    posthtmlRenderOptions: {},
  });
  config.addTransform('htmlmin', htmlMinTransform);

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  // Custom filters
  config.addFilter('glslminify', filterGlslMinify);

  return {
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'public',
    },
  };
};

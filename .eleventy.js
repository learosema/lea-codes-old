const htmlMinTransform = require('./eleventy/html-min-transform');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = (config) => {
  config.addPlugin(syntaxHighlight);
  config.addTransform('htmlmin', htmlMinTransform);

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  // Custom filters
  config.addFilter('glslminify', function mini(str) {
    // this trims whitespaces, strips comments, removes newlines
    return str
      .replace(/\/\*(.|[\n\t])*\*\//g, '')
      .split('\n')
      .map((line) => {
        const trimmed = line
          .trim()
          .replace(/\s*(\W)\s*/g, '$1')
          .replace(/\/\/.*$/, '');
        // directives like #define need a newline
        return trimmed.startsWith('#') ? trimmed + '\n' : trimmed;
      })
      .filter((line) => !line.startsWith('//'))
      .join('');
  });

  return {
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'public',
    },
  };
};

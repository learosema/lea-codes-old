const { createCanvas } = require('canvas');
const { writeFileSync } = require('fs');
class OgImages {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      pagination: {
        size: 1,
        data: 'collections.all',
        alias: 'post',
      },
      permalink(data) {
        return `/images/og/${this.slug(data.post.data.title)}.png`;
      },
    };
  }

  render(data) {
    const mycanvas = createCanvas(500, 500);
    const ctx = mycanvas.getContext('2d');
    ctx.font = '12px "sans"';
    ctx.fillText(data.post.data.title, 250, 10);
    const buf = mycanvas.toBuffer('image/png', { compressionLevel: 9 });
    return buf;
  }
}

module.exports = OgImages;

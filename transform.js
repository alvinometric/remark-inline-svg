const fs = require('fs/promises');
const { optimize } = require('svgo');

const svgoPlugins = [
  {
    name: 'preset-default',
    params: {
      overrides: {
        // disable plugins
        removeTitle: false,
        removeDesc: false,
      },
    },
  },
  'removeXMLNS',
  'removeDimensions',
];

const inlineSVG = async (node, options) => {
  const { alt, url } = node;

  const image = await fs.readFile(url, 'utf-8');
  const result = await optimize(image, { plugins: svgoPlugins });

  let { data: html } = result;

  if (options.replace) {
    Object.entries(options.replace).forEach(([str, replacement]) => {
      const re = new RegExp(str, 'g');

      if (!!html === false) {
        console.log(`[remark-inline-svg]: problem optimizing ${url}`);
      }
      html = html.replace(re, replacement);
    });
  }

  const [, svgAttrs] = html.match(/<svg (.*?)>/);

  html = html.replace(svgAttrs, `${svgAttrs} role="img" aria-hidden="true"`);

  const className = options.className || 'markdown-inline-svg';

  node.type = 'html';
  node.value = `<figure class="${className}">
  ${html}
</figure>`;
};

module.exports = inlineSVG;

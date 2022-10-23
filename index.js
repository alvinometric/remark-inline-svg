const fs = require("fs/promises");
const path = require("path");
const { optimize } = require("svgo");
const visit = require("unist-util-visit");

const svgoPlugins = [
  {
    name: "preset-default",
    params: {
      overrides: {
        // disable plugins
        removeTitle: false,
        removeDesc: false,
      },
    },
  },
  "removeXMLNS",
  "removeDimensions",
  "sortAttrs",
];

const inlineSVG = async (node, options) => {
  const { title, url } = node;

  const image = await fs.readFile(url, "utf-8");
  const result = await optimize(image, { plugins: svgoPlugins });

  let { data: html } = result;

  if (options.replace) {
    Object.entries(options.replace).forEach(([str, replacement]) => {
      const re = new RegExp(str, "g");

      if (!!html === false) {
        console.log(`[remark-inline-svg]: problem optimizing ${url}`);
      }
      html = html.replace(re, replacement);
    });
  }

  const [, svgAttrs] = html.match(/<svg (.*?)>/);

  html = html.replace(svgAttrs, `${svgAttrs} role="img" aria-hidden="true"`);

  node.type = "html";
  node.value = `<figure class="markdown-inline-svg">
  ${html.trim()}
  ${title ? `<figcaption>${title}</figcaption>` : ""}
</figure>`;
};

module.exports = (options = {}) => {
  const suffix = options.suffix || ".inline.svg";

  return async (tree, file) => {
    const svgs = [];

    const markdownFileDir = path.dirname(file.history[0]);

    visit(tree, "image", (node) => {
      const { url } = node;

      if (url.endsWith(suffix)) {
        node.url = path.resolve("./", markdownFileDir, url);
        svgs.push(node);
      }
    });

    const promises = svgs.map(async (node) => {
      return await inlineSVG(node, options);
    });

    await Promise.all(promises);

    return tree;
  };
};

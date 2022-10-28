const path = require('path');
const visit = require('unist-util-visit');
const transform = require('./transform');

module.exports = (options = {}) => {
  const suffix = options.suffix || '.inline.svg';

  return async (tree, file) => {
    const svgs = [];

    const markdownFileDir = path.dirname(file.history[0]);

    visit(tree, 'image', (node) => {
      const { url } = node;

      if (url.endsWith(suffix)) {
        node.url = path.resolve('./', markdownFileDir, url);
        svgs.push(node);
      }
    });

    if (svgs.length > 0) {
      const promises = svgs.map(async (node) => {
        return await transform(node, options);
      });

      await Promise.all(promises);
    }

    return tree;
  };
};

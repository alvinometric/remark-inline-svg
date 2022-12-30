import { dirname, resolve } from 'node:path';
import { visit } from 'unist-util-visit';
import transform from './transform.js';

export default (options = {}) => {
  const suffix = options.suffix || '.inline.svg';

  return async (tree, file) => {
    const svgs = [];

    const markdownFileDir = dirname(file.history[0]);

    visit(tree, 'image', (node) => {
      const { url } = node;

      if (url.endsWith(suffix)) {
        node.url = resolve('./', markdownFileDir, url);
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

export { transform }

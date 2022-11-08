const { test } = require('uvu');
const assert = require('uvu/assert');
const remark = require('remark');
const inlineSVG = require('../');
const { readSync } = require('to-vfile');

const markdown = readSync('./test/doc.md');

const kitchenSink = `# Hello

This is a test markdown document.

<figure class="custom-wrapper">
  <svg viewBox="0 0 250 250" role="img" aria-hidden="true"><circle cx="125" cy="125" r="100" fill="currentColor" fill-opacity=".5"/></svg>
</figure>

Cheers
`;

test('Kitchen Sink', async () => {
  const file = await remark()
    .use(inlineSVG, {
      className: 'custom-wrapper',
      suffix: '.svg',
      replace: {
        '#BA5B5B': 'currentColor',
      },
    })
    .process(markdown);

  assert.is(file.toString(), kitchenSink);
});

test.run();

const { test } = require('uvu');
const assert = require('uvu/assert');
const remark = require('remark');
const inlineSVG = require('../');
const { readSync } = require('to-vfile');

const markdown = readSync('./test/doc.md');

const customClass = `# Hello

This is a test markdown document.

<figure class="custom-wrapper">
  <svg fill="none" viewBox="0 0 250 250" role="img" aria-hidden="true"><circle cx="125" cy="125" r="100" fill="#BA5B5B"/></svg>
</figure>

Cheers
`;

test('custom wrapper class', async () => {
  const file = await remark().use(inlineSVG, { className: 'custom-wrapper' }).process(markdown);

  assert.is(file.toString(), customClass);
});

test.run();
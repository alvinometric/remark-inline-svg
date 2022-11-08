const { test } = require('uvu');
const assert = require('uvu/assert');
const remark = require('remark');
const inlineSVG = require('../');
const { readSync } = require('to-vfile');

const markdown = readSync('./test/doc.md');

const noArgument = `# Hello

This is a test markdown document.

<figure class="markdown-inline-svg">
  <svg viewBox="0 0 250 250" role="img" aria-hidden="true"><circle cx="125" cy="125" r="100" fill="#BA5B5B" fill-opacity=".5"/></svg>
</figure>

Cheers
`;

test('no argument', async () => {
  const file = await remark().use(inlineSVG).process(markdown);

  assert.is(file.toString(), noArgument);
});

test('no argument, nested file', async () => {
  const file = await remark().use(inlineSVG).process(markdown);

  assert.is(file.toString(), noArgument);
});

test.run();

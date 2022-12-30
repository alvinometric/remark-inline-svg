import { test } from 'uvu';
import { is } from 'uvu/assert';
import { remark } from 'remark';
import inlineSVG from '../index.js';
import { readSync } from 'to-vfile';

const markdown = readSync('./test/doc.md');

const customClass = `# Hello

This is a test markdown document.

<figure class="custom-wrapper">
  <svg viewBox="0 0 250 250" role="img" aria-hidden="true"><circle cx="125" cy="125" r="100" fill="#BA5B5B" fill-opacity=".5"/></svg>
</figure>

Cheers
`;

test('custom wrapper class', async () => {
  const file = await remark().use(inlineSVG, { className: 'custom-wrapper' }).process(markdown);

  is(file.toString(), customClass);
});

test.run();

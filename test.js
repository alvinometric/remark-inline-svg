const test = require("tape");
const remark = require("remark");
const inlineSVG = require(".");
const { readSync } = require("to-vfile");

const markdown = readSync("./test/doc.md");

const noArgument = `
# Hello

This is a test markdown document.

<figure class="markdown-inline-svg">
  <svg fill="none" viewBox="0 0 250 250" role="img" aria-hidden="true"><circle cx="125" cy="125" r="100" fill="#BA5B5B"/></svg>
</figure>

Cheers
`;

test("no argument", async (t) => {
  t.doesNotThrow(() => {
    remark().use(inlineSVG).freeze();
  }, "should not throw if not passed options");

  const file = await remark().use(inlineSVG).process(markdown);

  t.equal(String(file).trim(), noArgument.trim());

  t.end();
});

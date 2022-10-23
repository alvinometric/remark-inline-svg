const test = require("tape");
const remark = require("remark");
const inlineSVG = require(".");
const { readSync } = require("to-vfile");

const file = readSync("./test/doc.md");
// const file = readSync("./lat.md");

remark()
  .use(inlineSVG, {
    suffix: ".inline.svg",
    replace: {
      "#5f3dc4": "var(--highlight)",
      "#5F3DC4": "var(--highlight)",
      "#000": "currentColor",
      Helvetica: "Virgil",
    },
  })
  .process(file, function (err, file) {
    if (err) throw err;
    console.log(String(file));
  });

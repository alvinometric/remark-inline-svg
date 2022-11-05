# remark-inline-svg

Plugin that inlines SVG images from markdown and optimises them with [SVGO](https://github.com/svg/svgo).

- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
  - [Suffix](#suffix)
  - [Replace](#replace)
  - [className](#classname)
- [SVGO configuration](#svgo-configuration)

## Installation

Install with [npm](https://www.npmjs.com/):

```sh
npm install remark-inline-svg
```

## Usage

Say we have the following file `example.md`:

```markdown
# Hello

This is a test markdown document.

![Inline SVG](circle.inline.svg)

Cheers
```

And our module `example.js` looks as follows:

```js
const test = require("tape");
const remark = require("remark");
const inlineSVG = require("remark-inline-svg");
const { readSync } = require("to-vfile");

const file = readSync("./example.md");

remark()
  .use(inlineSVG)
  .process(file, function (err, file) {
    if (err) throw err;
    console.log(String(file));
  });
```

Now running `node example.js` yields:

```markdown
# Hello

This is a test markdown document.

<figure class="markdown-inline-svg">
  <svg fill="none" viewBox="0 0 250 250" role="img" aria-hidden="true"><circle cx="125" cy="125" r="100" fill="#BA5B5B"/></svg>
</figure>

Cheers
```

## Options

| Key                       | Default value         | Description                                                |
| ------------------------- | --------------------- | ---------------------------------------------------------- |
| [`suffix`](#suffix)       | `".inline.svg"`       | The plugin only processes SVG files ending with this value |
| [`replace`](#replace)     | `undefined`           | Lets you replace strings within the SVG file               |
| [`className`](#className) | `markdown-inline-svg` | class of the wrapper element                               |

### Suffix

This plugin will ignore SVG files if they don't have the specified suffix, set to `.inline.svg` by default. This is to minimise disruption to your workflow.

### Replace

Array of strings to replace with other strings

### className

The inlined SVG is wrapped in a `<figure>` element, and given a class of `markdown-inline-svg` to let you apply some custom styles. You can change that class by modifiying the value of the `className` option.

```html
<!-- You can change this class name 👇 -->
<figure class="markdown-inline-svg">
  <svg fill="none" viewBox="0 0 250 250" role="img" aria-hidden="true">
    <circle cx="125" cy="125" r="100" fill="#BA5B5B" />
  </svg>
</figure>
```

## SVGO configuration

The SVGO configuration is as follows:

```js
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
```

TODO:

- [ ] Add test case for `replace` option
- [ ] Add test case for `class` option
- [ ] Support titles

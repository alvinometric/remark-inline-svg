# remark-inline-svg

Plugin that inlines SVG images from markdown and optimises them with svgo

## Options

| Key                     | Default value         | Description                                                     |
| ----------------------- | --------------------- | --------------------------------------------------------------- |
| [`suffix`](#extensions) | `".inline.svg"`       | Only the SVG files containing the suffix here will be processed |
| [`replace`](#replace)   | `undefined`           | Lets you replace strings within the SVG file                    |
| [`class`](#class)       | `markdown-inline-svg` | class of the wrapper element                                    |

### Suffix

This plugin will ignore SVG files if they don't have the specified suffix, set to `.inline.svg` by default. This is to minimise disruption to your workflow.

### Replace

Array of strings to replace with other strings

TODO:

- [ ] Add test case for `replace` option
- [ ] Add test case for `class` option

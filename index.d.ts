export interface RemarkInlineSvgOptions {
  /** File suffix of images to inline. Defaults to `.inline.svg`. */
  suffix?: string;
  /** Class name on the wrapping `<figure>`. Defaults to `markdown-inline-svg`. */
  className?: string;
  /** Map of regex source strings to replacements, applied to the optimised SVG markup. */
  replace?: Record<string, string>;
}

declare function remarkInlineSvg(
  options?: RemarkInlineSvgOptions
): (tree: any, file: any) => Promise<any>;

export declare function transform(
  node: any,
  options: RemarkInlineSvgOptions
): Promise<void>;

export default remarkInlineSvg;

// Same as Tailwind's "font-mono"
export const FONT_FAMILY_MONO =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

export const getCSSVariable = (name: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

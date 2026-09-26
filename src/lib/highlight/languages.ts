import type {Language, Rule} from './highlight';

/*----------------------
|  Helpers
-----------------------*/
const words = (list: string[]): RegExp =>
  new RegExp(`(?<![\\w$.])(?:${list.join('|')})(?![\\w$])`, 'y');

/** Returns the last non-whitespace character before the given index */
const previousChar = (source: string, index: number): string | undefined => {
  for (let i = index - 1; i >= 0; i--) {
    const char = source[i] as string;
    if (!/\s/.test(char)) return char;
  }

  return undefined;
};

/** Returns the part of the line before the given index */
const linePrefix = (source: string, index: number): string =>
  source.slice(source.lastIndexOf('\n', index - 1) + 1, index);

const isAtWordStart = (source: string, index: number): boolean =>
  index === 0 || /\s/.test(source[index - 1] as string);

/*----------------------
|  TypeScript / JavaScript (+ JSX)
-----------------------*/
const scriptKeywords = [
  'abstract',
  'as',
  'async',
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'declare',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'finally',
  'for',
  'from',
  'function',
  'if',
  'implements',
  'import',
  'in',
  'instanceof',
  'interface',
  'keyof',
  'let',
  'new',
  'of',
  'private',
  'protected',
  'public',
  'readonly',
  'return',
  'satisfies',
  'static',
  'super',
  'switch',
  'this',
  'throw',
  'try',
  'type',
  'typeof',
  'var',
  'void',
  'while',
  'yield',
];

const scriptLiterals = [
  'true',
  'false',
  'null',
  'undefined',
  'NaN',
  'Infinity',
];

const scriptRulesBefore: Rule[] = [
  {type: 'comment', pattern: /\/\/[^\n]*|\/\*[\s\S]*?\*\//y},
  {
    type: 'string',
    pattern: /`(?:\\[\s\S]|[^\\`])*`|"(?:\\.|[^\\"\n])*"|'(?:\\.|[^\\'\n])*'/y,
  },
];

const scriptRulesAfter: Rule[] = [
  {type: 'keyword', pattern: words(scriptKeywords)},
  {type: 'literal', pattern: words(scriptLiterals)},
  {
    type: 'number',
    pattern:
      /(?:0[xX][\da-fA-F_]+|\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?)(?![\w$])/y,
  },
  {type: 'function', pattern: /[A-Za-z_$][\w$]*(?=\s*\()/y},
  {type: 'type', pattern: /[A-Z][\w$]*/y},
  {type: null, pattern: /[A-Za-z_$][\w$]*/y}, // Consume identifiers as a whole
];

const jsxRules: Rule[] = [
  {
    // "<Canvas", "</Canvas", "<mesh". Skips generics like "Promise<void>"
    pattern: /(<\/?)([A-Za-z][\w.]*)/y,
    groups: [null, 'tag'],
    test: (source, index) =>
      source[index + 1] === '/' ||
      !/[\w$)\]]/.test(previousChar(source, index) ?? ''),
  },
  {type: 'attribute', pattern: /[A-Za-z_][\w-]*(?==[{"'])/y},
];

const typescript: Language = {
  name: 'ts',
  label: 'TS',
  rules: [...scriptRulesBefore, ...scriptRulesAfter],
};

const tsx: Language = {
  name: 'tsx',
  label: 'TSX',
  rules: [...scriptRulesBefore, ...jsxRules, ...scriptRulesAfter],
};

const javascript: Language = {...typescript, name: 'js', label: 'JS'};
const jsx: Language = {...tsx, name: 'jsx', label: 'JSX'};

/*----------------------
|  Bash
-----------------------*/
const bashKeywords = [
  'if',
  'then',
  'else',
  'elif',
  'fi',
  'for',
  'in',
  'do',
  'done',
  'while',
  'case',
  'esac',
  'function',
  'return',
  'set',
  'export',
  'source',
  'local',
];

const bash: Language = {
  name: 'bash',
  label: 'Bash',
  rules: [
    {type: 'comment', pattern: /#[^\n]*/y, test: isAtWordStart},
    {type: 'string', pattern: /"(?:\\[\s\S]|[^\\"])*"|'[^']*'/y},
    {type: 'variable', pattern: /\$(?:\{[^}]*\}|\w+|[@#?$!*-])/y},
    {type: 'attribute', pattern: /--?[A-Za-z][\w-]*/y, test: isAtWordStart},
    {
      type: 'keyword',
      pattern: words(bashKeywords),
      test: isAtWordStart,
    },
    {type: 'variable', pattern: /[A-Za-z_]\w*(?==)/y, test: isAtWordStart},
    {
      // Command name at the start of a line or after "|", "&&", ";", "("
      type: 'function',
      pattern: /[A-Za-z_][\w.-]*/y,
      test: (source, index) =>
        /^\s*$/.test(linePrefix(source, index)) ||
        /[|&;(]\s*$/.test(linePrefix(source, index)),
    },
    {type: null, pattern: /[\w./:@-]+/y}, // Consume words as a whole
  ],
};

/*----------------------
|  YAML
-----------------------*/
const yamlValueType = (value: string) => {
  if (/^(?:true|false|null|~)$/.test(value)) return 'literal';
  if (/^-?\d+(?:\.\d+)?$/.test(value)) return 'number';
  return 'string';
};

const yaml: Language = {
  name: 'yaml',
  label: 'YAML',
  rules: [
    {type: 'comment', pattern: /#[^\n]*/y, test: isAtWordStart},
    {
      // "key: value" (value is optional)
      pattern: /([A-Za-z_][\w.-]*)(:)(?:([ \t]+)([^\n#]*[^\s#]))?(?=\s|$)/y,
      groups: ['property', null, null, yamlValueType],
      test: (source, index) => /^\s*(?:-\s+)?$/.test(linePrefix(source, index)),
    },
    {type: 'string', pattern: /"(?:\\.|[^\\"\n])*"|'[^'\n]*'/y},
  ],
};

/*----------------------
|  Plain text
-----------------------*/
const plaintext: Language = {name: 'plaintext', label: 'Text', rules: []};

/*----------------------
|  Registry
-----------------------*/
const languages: Record<string, Language> = {
  ts: typescript,
  typescript,
  tsx,
  js: javascript,
  javascript,
  jsx,
  bash,
  sh: bash,
  shell: bash,
  zsh: bash,
  yaml,
  yml: yaml,
  plaintext,
  text: plaintext,
  txt: plaintext,
};

export const getLanguage = (name: string | undefined): Language =>
  (name && languages[name.toLowerCase()]) || plaintext;

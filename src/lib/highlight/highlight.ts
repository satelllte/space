/**
 * Minimal, dependency-free syntax highlighter.
 *
 * Each language is described as an ordered list of rules. At every position
 * of the source, the first rule that matches wins. Characters not matched by
 * any rule are emitted as plain text. It's intentionally naive (no real
 * parsing), but good enough for short snippets in articles.
 */

export type TokenType =
  | 'comment'
  | 'string'
  | 'keyword'
  | 'literal'
  | 'number'
  | 'function'
  | 'type'
  | 'tag'
  | 'attribute'
  | 'property'
  | 'variable';

export type Token = {
  type: TokenType | null; // "null" means plain text
  value: string;
};

type GroupType = TokenType | null | ((value: string) => TokenType | null);

export type Rule = {
  /** Must have the sticky ("y") flag */
  pattern: RegExp;
  /** Token type of the whole match. Ignored if "groups" is set */
  type?: TokenType | null;
  /** Token types for each capture group (the groups must cover the whole match) */
  groups?: GroupType[];
  /** Extra check, whether the rule applies at the given position */
  test?: (source: string, index: number) => boolean;
};

export type Language = {
  name: string;
  label: string;
  rules: Rule[];
};

export function tokenize(source: string, language: Language): Token[] {
  const tokens: Token[] = [];

  const push = (type: TokenType | null, value: string) => {
    if (!value) return;
    const last = tokens.at(-1);
    if (last && last.type === type) {
      last.value += value;
      return;
    }
    tokens.push({type, value});
  };

  let index = 0;
  while (index < source.length) {
    const matched = matchRule(source, index, language.rules);
    if (!matched) {
      push(null, source[index] as string);
      index += 1;
      continue;
    }

    const {rule, match} = matched;
    if (rule.groups) {
      rule.groups.forEach((group, i) => {
        const value = match[i + 1];
        if (value === undefined) return;
        push(typeof group === 'function' ? group(value) : group, value);
      });
    } else {
      push(rule.type ?? null, match[0]);
    }

    index += match[0].length;
  }

  return tokens;
}

function matchRule(
  source: string,
  index: number,
  rules: Rule[],
): {rule: Rule; match: RegExpExecArray} | undefined {
  for (const rule of rules) {
    rule.pattern.lastIndex = index;
    const match = rule.pattern.exec(source);
    if (!match || match[0].length === 0) continue;
    if (rule.test && !rule.test(source, index)) continue;
    return {rule, match};
  }

  return undefined;
}

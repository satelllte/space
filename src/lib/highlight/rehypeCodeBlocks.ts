import type {Element, ElementContent, Root} from 'hast';
import {tokenize} from './highlight';
import {getLanguage} from './languages';

/**
 * Rehype plugin, which turns every fenced code block into a highlighted one:
 *
 * ```tsx title="Scene.tsx"
 * ...
 * ```
 *
 * Output:
 *
 * <figure class="code-block" data-language="tsx">
 *   <figcaption class="code-block-title">Scene.tsx</figcaption>
 *   <div class="code-block-toolbar">
 *     <span class="code-block-language">TSX</span>
 *     <button class="code-block-copy" type="button" hidden data-copy-code>Copy</button>
 *   </div>
 *   <pre class="code-block-pre" tabindex="0"><code>...</code></pre>
 * </figure>
 */
export function rehypeCodeBlocks() {
  return (tree: Root) => {
    transform(tree);
  };
}

function transform(parent: Root | Element): void {
  parent.children.forEach((child, index) => {
    if (child.type !== 'element') return;

    const code = getCode(child);
    if (code) {
      parent.children[index] = createCodeBlock(code);
      return;
    }

    transform(child);
  });
}

/** Returns "code" element if the given one is "pre > code" */
function getCode(element: Element): Element | undefined {
  if (element.tagName !== 'pre') return undefined;
  const [code, ...rest] = element.children;
  if (!code || rest.length > 0) return undefined;
  if (code.type !== 'element' || code.tagName !== 'code') return undefined;
  return code;
}

function createCodeBlock(code: Element): Element {
  const languageName = getLanguageName(code);
  const language = getLanguage(languageName);
  const title = getTitle(code);
  const source = getText(code).replace(/\n$/, '');

  const tokens = tokenize(source, language).map<ElementContent>((token) =>
    token.type
      ? span({className: ['tk', `tk-${token.type}`]}, [text(token.value)])
      : text(token.value),
  );

  return element(
    'figure',
    {className: ['code-block'], dataLanguage: language.name},
    [
      ...(title
        ? [
            element('figcaption', {className: ['code-block-title']}, [
              text(title),
            ]),
          ]
        : []),
      element('div', {className: ['code-block-toolbar']}, [
        span({className: ['code-block-language']}, [text(language.label)]),
        element(
          'button',
          {
            className: ['code-block-copy'],
            type: 'button',
            hidden: true,
            dataCopyCode: true,
            ariaLabel: `Copy ${title ?? language.label} code`,
          },
          [text('Copy')],
        ),
      ]),
      element('pre', {className: ['code-block-pre'], tabIndex: 0}, [
        element('code', {}, tokens),
      ]),
    ],
  );
}

function getLanguageName(code: Element): string | undefined {
  const {className} = code.properties;
  if (!Array.isArray(className)) return undefined;
  for (const name of className) {
    if (typeof name === 'string' && name.startsWith('language-')) {
      return name.slice('language-'.length);
    }
  }

  return undefined;
}

/** Parses `title="..."` from the code block meta string */
function getTitle(code: Element): string | undefined {
  const {metastring} = code.properties;
  if (typeof metastring !== 'string') return undefined;
  return /title="([^"]*)"/.exec(metastring)?.[1];
}

function getText(node: ElementContent): string {
  if (node.type === 'text') return node.value;
  if (node.type !== 'element') return '';
  return node.children.map(getText).join('');
}

const element = (
  tagName: string,
  properties: Element['properties'],
  children: ElementContent[],
): Element => ({type: 'element', tagName, properties, children});

const span = (properties: Element['properties'], children: ElementContent[]) =>
  element('span', properties, children);

const text = (value: string): ElementContent => ({type: 'text', value});

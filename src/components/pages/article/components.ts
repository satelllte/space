import {MDXCallout} from '../../ui/mdx/MDXCallout';
import {MDXCode, MDXCodeBlock} from '../../ui/mdx/MDXCode';
import {MDXFigure} from '../../ui/mdx/MDXFigure';
import {MDXFileTree} from '../../ui/mdx/MDXFileTree';
import {MDXHeadingH2, MDXHeadingH3} from '../../ui/mdx/MDXHeading';
import {MDXLink} from '../../ui/mdx/MDXLink';
import {
  MDXListItem,
  MDXListOrdered,
  MDXListUnordered,
} from '../../ui/mdx/MDXList';
import {MDXParagraph} from '../../ui/mdx/MDXParagraph';
import {MDXThematicBreak} from '../../ui/mdx/MDXThematicBreak';

export const components = {
  a: MDXLink,
  code: MDXCode,
  pre: MDXCodeBlock,
  p: MDXParagraph,
  h2: MDXHeadingH2,
  h3: MDXHeadingH3,
  ul: MDXListUnordered,
  ol: MDXListOrdered,
  li: MDXListItem,
  hr: MDXThematicBreak,
  Callout: MDXCallout,
  FileTree: MDXFileTree,
  Figure: MDXFigure,
};

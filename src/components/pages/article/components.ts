import {MDXParagraph} from '../../ui/mdx/MDXParagraph';
import {
  MDXListUnordered,
  MDXListOrdered,
  MDXListItem,
} from '../../ui/mdx/MDXList';
import {MDXLink} from '../../ui/mdx/MDXLink';
import {MDXHeadingH2, MDXHeadingH3} from '../../ui/mdx/MDXHeading';
import {MDXThematicBreak} from '../../ui/mdx/MDXThematicBreak';
import {MDXCode, MDXCodeBlock} from '../../ui/mdx/MDXCode';
import {MDXCallout} from '../../ui/mdx/MDXCallout';
import {MDXFileTree} from '../../ui/mdx/MDXFileTree';
import {MDXFigure} from '../../ui/mdx/MDXFigure';

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

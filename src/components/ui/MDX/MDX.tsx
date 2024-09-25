import {forwardRef} from 'react';

type H1Ref = React.ElementRef<'h1'>;
type H1Props = React.ComponentProps<'h1'>;

type MDXHeading1Ref = H1Ref;
type MDXHeading1Props = Omit<H1Props, 'className'>;

export const MDXHeading1 = forwardRef<MDXHeading1Ref, MDXHeading1Props>(
  (props, forwardedRef) => {
    return (
      <h1 ref={forwardedRef} className='text-3xl text-gray-12' {...props} />
    );
  },
);

type H2Ref = React.ElementRef<'h2'>;
type H2Props = React.ComponentProps<'h2'>;

type MDXHeading2Ref = H2Ref;
type MDXHeading2Props = Omit<H2Props, 'className'>;

export const MDXHeading2 = forwardRef<MDXHeading2Ref, MDXHeading2Props>(
  (props, forwardedRef) => {
    return (
      <h2 ref={forwardedRef} className='text-2xl text-gray-12' {...props} />
    );
  },
);

type PRef = React.ElementRef<'p'>;
type PProps = React.ComponentProps<'p'>;

type MDXParagraphRef = PRef;
type MDXParagraphProps = Omit<PProps, 'className'>;

export const MDXParagraph = forwardRef<MDXParagraphRef, MDXParagraphProps>(
  (props, forwardedRef) => {
    return (
      <p
        ref={forwardedRef}
        className='my-4 text-base text-gray-11'
        {...props}
      />
    );
  },
);

type PreRef = React.ElementRef<'pre'>;
type PreProps = React.ComponentProps<'pre'>;

type MDXPreRef = PreRef;
type MDXPreProps = Omit<PreProps, 'className'>;

export const MDXPre = forwardRef<MDXPreRef, MDXPreProps>(
  (props, forwardedRef) => {
    return (
      <pre
        ref={forwardedRef}
        className='my-4 text-sm text-gray-10'
        {...props}
      />
    );
  },
);

type CodeRef = React.ElementRef<'code'>;
type CodeProps = React.ComponentProps<'code'>;

type MDXCodeRef = CodeRef;
type MDXCodeProps = Omit<CodeProps, 'className'>;

export const MDXCode = forwardRef<MDXCodeRef, MDXCodeProps>(
  (props, forwardedRef) => {
    return <code ref={forwardedRef} {...props} />;
  },
);

import {CLASS_NAME_MDX_BASE_SPACING} from './constants';

type MDXFigureProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  children?: React.ReactNode;
};

export function MDXFigure({src, alt, width, height, children}: MDXFigureProps) {
  return (
    <figure data-slot='mdx-figure' className={CLASS_NAME_MDX_BASE_SPACING}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading='lazy'
        decoding='async'
        className='h-auto w-full rounded-lg border border-gray-5 bg-gray-5'
      />
      {children && (
        <figcaption className='mt-2 text-center text-sm text-gray-11 [&_[data-slot=mdx-paragraph]]:mt-0'>
          {children}
        </figcaption>
      )}
    </figure>
  );
}

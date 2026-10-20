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
        className='tw:h-auto tw:w-full tw:rounded-lg tw:border tw:border-gray-5 tw:bg-gray-5'
      />
      {children && (
        <figcaption className='tw:mt-2 tw:text-center tw:text-sm tw:text-gray-11 tw:**:data-[slot=mdx-paragraph]:mt-0'>
          {children}
        </figcaption>
      )}
    </figure>
  );
}

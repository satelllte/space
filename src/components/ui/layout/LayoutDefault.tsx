import {Theme} from '../../context/Theme';

type LayoutDefaultProps = {
  children: React.ReactNode;
};

export function LayoutDefault({children}: LayoutDefaultProps) {
  return (
    <Theme>
      <div className='flex min-h-full flex-col px-4 pb-6 pt-10 sm:px-8 sm:pb-8 sm:pt-12'>
        {children}
      </div>
    </Theme>
  );
}

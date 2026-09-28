import clsx from 'clsx';
import {Theme} from '../../context/Theme';
import {CLASS_NAME_PAGE_SPACING} from './constants';

type LayoutDefaultProps = {
  children: React.ReactNode;
};

export function LayoutDefault({children}: LayoutDefaultProps) {
  return (
    <Theme>
      <div
        className={clsx(CLASS_NAME_PAGE_SPACING, 'flex min-h-full flex-col')}
      >
        {children}
      </div>
    </Theme>
  );
}

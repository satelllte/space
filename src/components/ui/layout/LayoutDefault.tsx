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
        className={clsx(
          CLASS_NAME_PAGE_SPACING,
          'tw:flex tw:min-h-full tw:flex-col',
        )}
      >
        {children}
      </div>
    </Theme>
  );
}

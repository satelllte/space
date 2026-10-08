import {Canvas as R3FCanvas, type Dpr} from '@react-three/fiber';
import {CanvasErrorBoundary} from './CanvasErrorBoundary';

type R3FCanvasProps = React.ComponentProps<typeof R3FCanvas>;

export type CanvasProps = Omit<
  R3FCanvasProps,
  | 'children' //
  | 'dpr'
> & {
  children: React.ReactNode;
};

const DEVICE_PIXEL_RATIO_MIN = 1;
const DEVICE_PIXEL_RATIO_MAX = 2;
const dpr = [DEVICE_PIXEL_RATIO_MIN, DEVICE_PIXEL_RATIO_MAX] satisfies Dpr;

export function Canvas(props: CanvasProps) {
  return (
    <CanvasErrorBoundary>
      <R3FCanvas dpr={dpr} {...props} />
    </CanvasErrorBoundary>
  );
}

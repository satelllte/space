import {forwardRef} from 'react';
import {Canvas as R3FCanvas, type Dpr} from '@react-three/fiber';

type R3FCanvasRef = React.ElementRef<typeof R3FCanvas>;
type R3FCanvasProps = React.ComponentProps<typeof R3FCanvas>;

export type CanvasRef = R3FCanvasRef;
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

export const Canvas = forwardRef<CanvasRef, CanvasProps>(
  (props, forwardedRef) => {
    return <R3FCanvas ref={forwardedRef} dpr={dpr} {...props} />;
  },
);

import {useEffect, useRef} from 'react';
import clsx from 'clsx';

const DEVICE_PIXEL_RATIO_MAX = 2;

export type Canvas2DDraw = (
  context: CanvasRenderingContext2D,
  size: {width: number; height: number},
) => void;

type Canvas2DProps = {
  label: string;
  height: 150 | 200;
  draw: Canvas2DDraw;
};

export function Canvas2D({label, height, draw}: Canvas2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio, DEVICE_PIXEL_RATIO_MAX);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(context, {width, height});
    };

    render();

    const resizeObserver = new ResizeObserver(render);
    resizeObserver.observe(canvas);

    const themeObserver = new MutationObserver(render);
    themeObserver.observe(document.documentElement, {
      attributeFilter: ['class'],
    });

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      role='img'
      aria-label={label}
      className={clsx(
        'block w-full',
        height === 150 && 'h-[150px]',
        height === 200 && 'h-[200px]',
      )}
    />
  );
}

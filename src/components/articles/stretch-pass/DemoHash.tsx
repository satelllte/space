import {useCallback, useState} from 'react';
import {MDXCode} from '../../ui/mdx/MDXCode';
import {Demo, DemoControls} from './_shared/Demo';
import {Canvas2D, type Canvas2DDraw} from './_shared/Canvas2D';
import {FONT_FAMILY_MONO, getCSSVariable} from '../../utils/css';
import {Slider} from '../../ui/Slider/Slider';

const K_MAX = 43758.5453;
const K_LINE_MAX = 60; // above this, the plot is drawn as dots, since a line would turn into a solid block
const X_MAX = 12;
const PADDING = {left: 28, right: 8, top: 10, bottom: 22} as const;

export function DemoHash() {
  // The slider is logarithmic, so the multiplier is K_MAX^t, where t is in [0, 1]
  const [t, setT] = useState(0);
  const k = Math.pow(K_MAX, t);
  const draw = useCallback<Canvas2DDraw>(
    (context, size) => drawHash(context, size, k),
    [k],
  );
  return (
    <Demo
      caption={
        <>
          Plotting <MDXCode>fract(sin(x) * k)</MDXCode>. With small{' '}
          <MDXCode>k</MDXCode> you can still see the sine. Push it to the right
          and the wave shatters into noise.
        </>
      }
    >
      <Canvas2D
        label={`Plot of fract(sin(x) * k) for x from 0 to ${X_MAX}, with k = ${formatK(k)}`}
        height={200}
        draw={draw}
      />
      <DemoControls>
        <Slider
          label='multiplier k'
          value={t}
          min={0}
          max={1}
          step={0.001}
          format={(value) => formatK(Math.pow(K_MAX, value))}
          onChange={setT}
        />
      </DemoControls>
    </Demo>
  );
}

const formatK = (k: number): string =>
  k < 10 ? k.toFixed(2) : Math.round(k).toLocaleString('en-US');

const fract = (x: number): number => x - Math.floor(x);

function drawHash(
  context: CanvasRenderingContext2D,
  {width, height}: {width: number; height: number},
  k: number,
) {
  const plotWidth = width - PADDING.left - PADDING.right;
  const plotHeight = height - PADDING.top - PADDING.bottom;
  const toX = (x: number) => PADDING.left + (x / X_MAX) * plotWidth;
  const toY = (y: number) => PADDING.top + (1 - y) * plotHeight;

  context.strokeStyle = getCSSVariable('--color-gray-6');
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(PADDING.left, toY(0));
  context.lineTo(PADDING.left + plotWidth, toY(0));
  context.moveTo(PADDING.left, toY(1));
  context.lineTo(PADDING.left + plotWidth, toY(1));
  context.stroke();

  context.fillStyle = getCSSVariable('--color-gray-11');
  context.font = `11px ${FONT_FAMILY_MONO}`;
  context.fillText('1', 8, toY(1) + 4);
  context.fillText('0', 8, toY(0) + 4);
  context.textAlign = 'right';
  context.fillText('x →', PADDING.left + plotWidth, height - 5);

  const colorPlot = getCSSVariable('--color-gray-12');
  if (k < K_LINE_MAX) {
    context.strokeStyle = colorPlot;
    context.lineWidth = 1.75;
    context.beginPath();
    const samples = 1200;
    let yPrevious: number | undefined;
    for (let i = 0; i <= samples; i++) {
      const x = (i / samples) * X_MAX;
      const y = fract(Math.sin(x) * k);
      // Break the line where "fract" wraps around, so it doesn't draw vertical spikes
      if (yPrevious === undefined || Math.abs(y - yPrevious) > 0.5) {
        context.moveTo(toX(x), toY(y));
      } else {
        context.lineTo(toX(x), toY(y));
      }
      yPrevious = y;
    }
    context.stroke();
  } else {
    context.fillStyle = colorPlot;
    const samples = 500;
    for (let i = 0; i <= samples; i++) {
      const x = (i / samples) * X_MAX;
      const y = fract(Math.sin(x) * k);
      context.beginPath();
      context.arc(toX(x), toY(y), 1.6, 0, Math.PI * 2);
      context.fill();
    }
  }
}

import {useCallback, useState} from 'react';
import {Demo, DemoControls} from './_shared/Demo';
import {Canvas2D, type Canvas2DDraw} from './_shared/Canvas2D';
import {FONT_FAMILY_MONO, getCSSVariable, getHSL} from '../../utils/css';
import {Slider} from '../../ui/Slider/Slider';

const CELLS = 32;
const ROW_HEIGHT = 30;
const INPUT_Y = 22;
const OUTPUT_Y = 96;

export function DemoClamp() {
  const [noise, setNoise] = useState(0.2);
  const draw = useCallback<Canvas2DDraw>(
    (context, size) => drawClamp(context, size, noise),
    [noise],
  );
  return (
    <Demo>
      <Canvas2D
        label={`A row of ${CELLS} colored cells, and the same row with uv.x clamped between ${format(noise)} and ${format(1 - noise)}`}
        height={150}
        draw={draw}
      />
      <DemoControls>
        <Slider
          label='noise'
          value={noise}
          min={0}
          max={0.5}
          step={0.01}
          format={format}
          onChange={setNoise}
        />
      </DemoControls>
    </Demo>
  );
}

const format = (value: number): string => value.toFixed(2);

const getCellColor = (index: number) =>
  getHSL(0, 0, 10 + (index / (CELLS - 1)) * 70);

function drawClamp(
  context: CanvasRenderingContext2D,
  {width}: {width: number},
  noise: number,
) {
  const colorText = getCSSVariable('--color-gray-11');
  const colorLine = getCSSVariable('--color-gray-12');
  const {fontFamily} = getComputedStyle(context.canvas);
  const cellWidth = width / CELLS;

  context.font = `11px ${fontFamily}`;
  context.fillStyle = colorText;
  context.fillText('input', 0, INPUT_Y - 8);
  context.fillText('output: clamp(uv.x, noise, 1.0 - noise)', 0, OUTPUT_Y - 8);

  for (let i = 0; i < CELLS; i++) {
    const x = (i + 0.5) / CELLS;
    const clamped = Math.min(Math.max(x, noise), 1 - noise);
    const source = Math.min(CELLS - 1, Math.floor(clamped * CELLS));
    context.fillStyle = getCellColor(i);
    context.fillRect(i * cellWidth + 0.5, INPUT_Y, cellWidth - 1, ROW_HEIGHT);
    context.fillStyle = getCellColor(source);
    context.fillRect(i * cellWidth + 0.5, OUTPUT_Y, cellWidth - 1, ROW_HEIGHT);
  }

  context.strokeStyle = colorLine;
  context.lineWidth = 1.5;
  context.setLineDash([4, 3]);
  for (const value of [noise, 1 - noise]) {
    const x = value * width;
    context.beginPath();
    context.moveTo(x, INPUT_Y - 2);
    context.lineTo(x, INPUT_Y + ROW_HEIGHT + 2);
    context.moveTo(x, OUTPUT_Y - 2);
    context.lineTo(x, OUTPUT_Y + ROW_HEIGHT + 4);
    context.stroke();
  }
  context.setLineDash([]);

  // Labels sit outside of the clamped range, and are hidden when there is no room for them
  context.font = `11px ${FONT_FAMILY_MONO}`;
  context.fillStyle = colorText;
  const labelY = OUTPUT_Y + ROW_HEIGHT + 18;
  const labelGap = 4;

  const labelMin = 'noise';
  const labelMinX = noise * width - labelGap;
  if (labelMinX - context.measureText(labelMin).width >= 0) {
    context.textAlign = 'right';
    context.fillText(labelMin, labelMinX, labelY);
  }

  const labelMax = '1 - noise';
  const labelMaxX = (1 - noise) * width + labelGap;
  if (labelMaxX + context.measureText(labelMax).width <= width) {
    context.textAlign = 'left';
    context.fillText(labelMax, labelMaxX, labelY);
  }
}

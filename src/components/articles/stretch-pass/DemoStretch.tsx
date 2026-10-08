import {useEffect, useState} from 'react';
import {extend, useThree, type ThreeElement} from '@react-three/fiber';
import {ScreenQuad, shaderMaterial} from '@react-three/drei';
import {CanvasTexture, MathUtils, Texture} from 'three';
import {Canvas} from '../../pages/scenes/_shared/Canvas';
import {Demo, DemoControls} from './_shared/Demo';
import fragmentShader from './DemoStretch.fragment.glsl?raw';
import vertexShader from './DemoStretch.vertex.glsl?raw';
import {ButtonToggle} from '../../ui/Button';
import {Slider} from '../../ui/Slider/Slider';
import {getHSLA} from '../../utils/css';

type View = (typeof VIEWS)[number]['value'];
const VIEWS = [
  {label: 'Result', value: 0},
  {label: 'Mask', value: 1},
  {label: 'Original', value: 2},
] as const;

const SHUFFLE_INTERVAL_MS = 400;
const SHUFFLE_AMPLITUDE_MIN = 0.1;
const SHUFFLE_AMPLITUDE_MAX = 0.3;
const SHUFFLE_STEPS_MIN = 2;
const SHUFFLE_STEPS_MAX = 100;
const SEED_MAX = 1000;

const SOURCE_WIDTH = 1024;
const SOURCE_HEIGHT = 640;

const DemoStretchMaterial = shaderMaterial(
  {
    tDiffuse: new Texture(),
    amplitude: 0.0,
    seed: 0.0,
    steps: 1.0,
    view: 0 as View,
  } satisfies DemoStretchMaterialUniforms,
  vertexShader,
  fragmentShader,
);

extend({DemoStretchMaterial});

type DemoStretchMaterialUniforms = {
  tDiffuse: Texture;
  amplitude: number;
  seed: number;
  steps: number;
  view: View;
};

declare module '@react-three/fiber' {
  interface ThreeElements {
    demoStretchMaterial: ThreeElement<typeof DemoStretchMaterial>;
  }
}

export function DemoStretch() {
  const [amplitude, setAmplitude] = useState(0.2);
  const [steps, setSteps] = useState(11);
  const [seed, setSeed] = useState(42);
  const [view, setView] = useState<View>(0);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    if (!isShuffling) return;

    const shuffle = () => {
      setAmplitude(
        MathUtils.randFloat(SHUFFLE_AMPLITUDE_MIN, SHUFFLE_AMPLITUDE_MAX),
      );
      setSteps(MathUtils.randFloat(SHUFFLE_STEPS_MIN, SHUFFLE_STEPS_MAX));
      setSeed(MathUtils.randFloat(0, SEED_MAX));
    };

    shuffle();
    const interval = setInterval(shuffle, SHUFFLE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [isShuffling]);

  return (
    <Demo>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div role='group' aria-label='View' className='flex flex-wrap gap-1.5'>
          {VIEWS.map(({label, value}) => (
            <ButtonToggle
              key={value}
              pressed={view === value}
              onClick={() => setView(value)}
            >
              {label}
            </ButtonToggle>
          ))}
        </div>
        <ButtonToggle
          pressed={isShuffling}
          onClick={() => setIsShuffling((isShuffling) => !isShuffling)}
        >
          Shuffle every {SHUFFLE_INTERVAL_MS} ms
        </ButtonToggle>
      </div>
      <div
        role='img'
        aria-label='Live WebGL preview of the stretch shader applied to a test image'
        className='relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-md bg-gray-2'
      >
        <Canvas
          frameloop='demand'
          linear // keeps the texture colors as is, since the shader doesn't do any color space conversion
          flat
        >
          <StretchQuad
            amplitude={amplitude}
            steps={steps}
            seed={seed}
            view={view}
          />
        </Canvas>
      </div>
      <DemoControls>
        <Slider
          label='amplitude'
          value={amplitude}
          min={0}
          max={0.5}
          step={0.01}
          format={(value) => value.toFixed(2)}
          onChange={setAmplitude}
        />
        <Slider
          label='steps'
          value={steps}
          min={1}
          max={100}
          step={0.1}
          format={(value) => value.toFixed(1)}
          onChange={setSteps}
        />
        <Slider
          label='seed'
          value={seed}
          min={0}
          max={SEED_MAX}
          step={0.01}
          format={(value) => value.toFixed(2)}
          onChange={setSeed}
        />
      </DemoControls>
    </Demo>
  );
}

type StretchQuadProps = Omit<DemoStretchMaterialUniforms, 'tDiffuse'>;

function StretchQuad({amplitude, steps, seed, view}: StretchQuadProps) {
  const texture = useSourceTexture();
  return (
    <ScreenQuad>
      <demoStretchMaterial
        tDiffuse={texture}
        amplitude={amplitude}
        steps={steps}
        seed={seed}
        view={view}
      />
    </ScreenQuad>
  );
}

function useSourceTexture(): CanvasTexture {
  const invalidate = useThree(({invalidate}) => invalidate);
  const [{canvas, texture}] = useState(() => {
    const canvas = document.createElement('canvas');
    canvas.width = SOURCE_WIDTH;
    canvas.height = SOURCE_HEIGHT;
    drawSourceImage(canvas);
    return {canvas, texture: new CanvasTexture(canvas)};
  });

  useEffect(() => {
    let isCancelled = false;

    // Redraw once the web fonts are loaded, so the label is rendered with the right font
    void document.fonts.ready.then(() => {
      if (isCancelled) return;
      drawSourceImage(canvas);
      texture.needsUpdate = true;
      invalidate();
    });

    return () => {
      isCancelled = true;
      texture.dispose();
    };
  }, [canvas, texture, invalidate]);

  return texture;
}

function drawSourceImage(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');
  if (!context) return;

  const width = canvas.width;
  const height = canvas.height;

  const background = context.createLinearGradient(0, 0, 0, height);
  background.addColorStop(0, '#1b1b1b');
  background.addColorStop(1, '#6a6a6a');
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  // Thin vertical stripes: once stretched, they turn into solid bands
  for (let x = 0; x < width; x += 24) {
    context.fillStyle = getHSLA(180 + (x / width) * 160, 0, 100, 0.35);
    context.fillRect(x, 0, 10, height);
  }
}

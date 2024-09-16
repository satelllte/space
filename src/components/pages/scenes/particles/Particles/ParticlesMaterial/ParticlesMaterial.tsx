import {useEffect, useMemo, useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {AdditiveBlending} from 'three';
import {useTheme} from '../../../../../context/Theme';
import fragmentShader from './ParticlesMaterial.fragment.glsl?raw';
import vertexShader from './ParticlesMaterial.vertex.glsl?raw';

const COLOR_1_LIGHT = [0.933, 0.933, 0.933] as const;
const COLOR_2_LIGHT = [0.067, 0.067, 0.067] as const;
const COLOR_1_DARK = [0.125, 0.125, 0.125] as const;
const COLOR_2_DARK = [0.988, 0.988, 0.988] as const;

export function ParticlesMaterial() {
  const theme = useTheme();
  const themeDark = theme === 'dark';

  const materialRef = useRef<React.ElementRef<'shaderMaterial'>>(null);
  const uniforms = useMemo(
    () => ({
      uColor1: {value: COLOR_1_LIGHT},
      uColor2: {value: COLOR_2_LIGHT},
      uTime: {value: 0.0},
    }),
    [],
  );

  useEffect(() => {
    const material = materialRef.current;
    if (!material) return;
    if (!material.uniforms.uColor1) return;
    if (!material.uniforms.uColor2) return;

    material.uniforms.uColor1.value = themeDark ? COLOR_1_DARK : COLOR_1_LIGHT;
    material.uniforms.uColor2.value = themeDark ? COLOR_2_DARK : COLOR_2_LIGHT;
  }, [themeDark]);

  useFrame(({clock}) => {
    const material = materialRef.current;
    if (!material) return;
    if (!material.uniforms.uTime) return;

    material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <shaderMaterial
      ref={materialRef}
      uniforms={uniforms}
      fragmentShader={fragmentShader}
      vertexShader={vertexShader}
      blending={AdditiveBlending}
    />
  );
}

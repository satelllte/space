import {useRef} from 'react';
import {extend, useFrame, useLoader, useThree} from '@react-three/fiber';
import {ScreenQuad, shaderMaterial} from '@react-three/drei';
import {Texture, TextureLoader} from 'three';
import fragmentShader from './Moon.fragment.glsl?raw';
import vertexShader from './Moon.vertex.glsl?raw';

const MoonMaterial = shaderMaterial(
  {
    uTime: 0.0,
    uResolution: [0.0, 0.0],
    uTexture: new Texture(),
    uTextureResolution: [0.0, 0.0],
  } satisfies MoonMaterialUniforms,
  vertexShader,
  fragmentShader,
);

extend({MoonMaterial});

type MoonMaterialUniforms = {
  uTime: number;
  uResolution: [number, number];
  uTexture: Texture;
  uTextureResolution: [number, number];
};

type MoonMaterialImpl = MoonMaterialUniforms &
  JSX.IntrinsicElements['shaderMaterial'];

declare global {
  namespace JSX {
    interface IntrinsicElements {
      moonMaterial: MoonMaterialImpl;
    }
  }
}

export function Moon() {
  const size = useThree(({size}) => size);
  const materialRef = useRef<React.ElementRef<'moonMaterial'>>(null);
  const texture = useLoader(
    TextureLoader,
    '/assets/textures/moon/moon_1280x640.jpg',
  );

  useFrame(({clock}) => {
    const material = materialRef.current;
    if (!material) return;
    if (!material.uniforms.uTime) return;

    material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <ScreenQuad>
      <moonMaterial
        ref={materialRef}
        transparent
        uTime={0.0}
        uResolution={[size.width, size.height]}
        uTexture={texture}
        uTextureResolution={[texture.image.width, texture.image.height]}
      />
    </ScreenQuad>
  );
}

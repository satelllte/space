import {Canvas, useFrame, type Dpr} from '@react-three/fiber';
import {
  OrbitControls,
  MeshTransmissionMaterial,
  Environment,
} from '@react-three/drei';
import {Theme, useTheme} from '../../../context/Theme';
import {Link} from '../../../ui/Link';
import {useRef} from 'react';
import {degToRad} from 'three/src/math/MathUtils.js';

const DEVICE_PIXEL_RATIO_MIN = 1;
const DEVICE_PIXEL_RATIO_MAX = 2;
const dpr = [DEVICE_PIXEL_RATIO_MIN, DEVICE_PIXEL_RATIO_MAX] satisfies Dpr;

export function SceneTransmission() {
  return (
    <Theme>
      <SceneLayout>
        <Canvas dpr={dpr} camera={{position: [0.0, 0.0, 3.4]}}>
          <OrbitControls
            enablePan={false}
            minDistance={1.5}
            maxDistance={5.6}
            zoomSpeed={0.18}
            rotateSpeed={0.53}
            dampingFactor={0.0125}
          />
          <directionalLight
            intensity={10.0}
            rotation={[degToRad(31.2), degToRad(-12.2), degToRad(10.2)]}
          />
          <Env />
          <TransmissionObject />
        </Canvas>
      </SceneLayout>
    </Theme>
  );
}

function Env() {
  const theme = useTheme();
  const themeDark = theme === 'dark';

  return (
    <Environment
      backgroundIntensity={themeDark ? 0.001 : 1.0 - 0.001}
      environmentIntensity={themeDark ? 0.2 : 1 - 0.2}
      files={[
        '/assets/textures/overcast_soil_puresky/overcast_soil_puresky_1k.hdr',
      ]}
    />
  );
}

function TransmissionObject() {
  const meshRef = useRef<React.ElementRef<'mesh'>>(null);

  useFrame((_, timeDelta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.rotation.y += timeDelta * -0.21;
    mesh.rotation.y += timeDelta * 0.31;
    mesh.rotation.z += timeDelta * 0.03;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <MeshTransmissionMaterial
        thickness={0.2}
        chromaticAberration={0.9}
        backside
        samples={4}
        distortion={0.8}
        roughness={0.1}
      />
    </mesh>
  );
}

function SceneLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <noscript>
        <div className='fixed z-10 flex h-full w-full items-center justify-center'>
          <p className='text-gray-12'>
            {
              'Cannot display the scene because JavaScript is disabled in this browser :('
            }
          </p>
        </div>
      </noscript>

      {children}

      <footer className='fixed bottom-6 left-4 right-4 z-20 flex items-end sm:bottom-8 sm:left-8 sm:right-8'>
        <div /* This empty div is required for the link to be aligned the same way it appears on homepage */
        >
          <Link size='xs' href='/'>
            {`<- Back`}
          </Link>
        </div>
      </footer>
    </>
  );
}

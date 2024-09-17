import {Canvas, type Dpr} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import {Theme} from '../../../context/Theme';
import {Link} from '../../../ui/Link';

const DEVICE_PIXEL_RATIO_MIN = 1;
const DEVICE_PIXEL_RATIO_MAX = 2;
const dpr = [DEVICE_PIXEL_RATIO_MIN, DEVICE_PIXEL_RATIO_MAX] satisfies Dpr;

export function SceneCube() {
  return (
    <Theme>
      <SceneLayout>
        <Canvas
          dpr={dpr} // TODO: move into shared components
          camera={{position: [0.0, 0.0, 2.4]}}
        >
          <OrbitControls
            // TODO: move into shared components
            enablePan={false}
            autoRotateSpeed={0.5}
            minDistance={1.5}
            maxDistance={2.6}
            zoomSpeed={0.18}
            rotateSpeed={0.33}
            dampingFactor={0.0125}
          />
          <mesh>
            <boxGeometry />
            <meshStandardMaterial color={0x666666} />
          </mesh>
        </Canvas>
      </SceneLayout>
    </Theme>
  );
}

// TODO: move into shared components
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

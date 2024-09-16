import {Canvas, type Dpr} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import {Theme} from '../../../context/Theme';
import {Link} from '../../../ui/Link';
import {Particles} from './Particles';

const DEVICE_PIXEL_RATIO_MIN = 1;
const DEVICE_PIXEL_RATIO_MAX = 2;
const dpr = [DEVICE_PIXEL_RATIO_MIN, DEVICE_PIXEL_RATIO_MAX] satisfies Dpr;

export function SceneParticles() {
  return (
    <Theme>
      <SceneLayout>
        <Canvas dpr={dpr} camera={{position: [0.0, 0.0, 2.4]}}>
          <OrbitControls
            enablePan={false}
            autoRotateSpeed={0.5}
            minDistance={1.5}
            maxDistance={2.6}
            zoomSpeed={0.18}
            rotateSpeed={0.33}
            dampingFactor={0.0125}
          />
          <Particles />
        </Canvas>
      </SceneLayout>
    </Theme>
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

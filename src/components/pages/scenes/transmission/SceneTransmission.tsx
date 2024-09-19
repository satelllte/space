import {OrbitControls} from '@react-three/drei';
import {Theme} from '../../../context/Theme';
import {Link} from '../../../ui/Link';
import {Canvas} from '../_shared/Canvas';
import {Environment} from './Environment';
import {Lighting} from './Lighting';
import {TransmissionObject} from './TransmissionObject';

export function SceneTransmission() {
  return (
    <Theme>
      <SceneLayout>
        <Canvas camera={{position: [0.0, 0.0, 3.4]}}>
          <OrbitControls
            enablePan={false}
            minDistance={1.5}
            maxDistance={5.6}
            zoomSpeed={0.18}
            rotateSpeed={0.53}
            dampingFactor={0.0125}
          />
          <Lighting />
          <Environment />
          <TransmissionObject />
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

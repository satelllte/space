import {forwardRef} from 'react';
import {OrbitControls as DreiOrbitControls} from '@react-three/drei';

type DreiOrbitControlsRef = React.ElementRef<typeof DreiOrbitControls>;
type DreiOrbitControlsProps = React.ComponentProps<typeof DreiOrbitControls>;

export type OrbitControlsRef = DreiOrbitControlsRef;
export type OrbitControlsProps = DreiOrbitControlsProps;

export const OrbitControls = forwardRef<OrbitControlsRef, OrbitControlsProps>(
  (props, forwardedRef) => {
    return (
      <DreiOrbitControls
        ref={forwardedRef}
        enablePan={false}
        minDistance={1.5}
        maxDistance={7.0}
        zoomSpeed={0.2}
        rotateSpeed={0.5}
        dampingFactor={0.0125}
        {...props}
      />
    );
  },
);

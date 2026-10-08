import {OrbitControls as DreiOrbitControls} from '@react-three/drei';

type DreiOrbitControlsProps = React.ComponentProps<typeof DreiOrbitControls>;

export type OrbitControlsProps = DreiOrbitControlsProps;

export function OrbitControls(props: OrbitControlsProps) {
  return (
    <DreiOrbitControls
      enablePan={false}
      minDistance={1.5}
      maxDistance={7.0}
      zoomSpeed={0.2}
      rotateSpeed={0.5}
      dampingFactor={0.0125}
      {...props}
    />
  );
}

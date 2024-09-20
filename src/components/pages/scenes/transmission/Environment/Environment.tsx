import {Environment as DreiEnvironment} from '@react-three/drei';
import {useTheme} from '../../../../context/Theme';

export function Environment() {
  const theme = useTheme();
  const themeDark = theme === 'dark';

  return (
    <DreiEnvironment
      backgroundIntensity={themeDark ? 0.001 : 1.0 - 0.001}
      environmentIntensity={themeDark ? 0.2 : 1 - 0.2}
      files={[
        '/assets/textures/overcast_soil_puresky/overcast_soil_puresky_1k.hdr',
      ]}
    />
  );
}

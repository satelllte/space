import {ParticlesGeometry} from './ParticlesGeometry';
import {ParticlesMaterial} from './ParticlesMaterial';

export function Particles() {
  return (
    <points>
      <ParticlesGeometry />
      <ParticlesMaterial />
    </points>
  );
}

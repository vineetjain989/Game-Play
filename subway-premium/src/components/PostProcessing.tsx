import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export default function PostProcessing() {
  return (
    <EffectComposer disableNormalPass>
      <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} opacity={0.9} intensity={0.6} />
      <Noise opacity={0.04} />
      <Vignette eskil={false} offset={0.35} darkness={0.6} />
      <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0015, 0.0012]} />
    </EffectComposer>
  );
}

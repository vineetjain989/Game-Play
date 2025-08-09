import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, useAnimations, Html, Sparkles } from '@react-three/drei';
import PostProcessing from './PostProcessing';
import { GLTFResult } from '../lib/loader';

function Runner({ url = '/models/character.glb' }) {
  const group = useRef<any>();
  const { scene, animations } = useGLTF(url) as GLTFResult;
  const { actions, mixer } = useAnimations(animations, group as any);

  useEffect(() => {
    if (actions && actions['Run']) {
      actions['Run'].play();
    } else if (actions && Object.values(actions)[0]) {
      // play first animation if names differ
      const a = Object.values(actions)[0] as any; a.play();
    }
  }, [actions]);

  useFrame((state, delta) => {
    if (mixer) mixer.update(delta);
  });

  return <primitive ref={group} object={scene} position={[0, -1.5, 0]} scale={[0.02,0.02,0.02]} />;
}

function Obstacle({ pos = [4, -1, -10], speed = 0.06 }) {
  const ref = useRef<any>();
  useFrame(() => {
    if (ref.current) {
      ref.current.position.x -= speed * 10;
      if (ref.current.position.x < -10) ref.current.position.x = 20;
    }
  });
  return (
    <mesh ref={ref} position={pos} castShadow>
      <boxGeometry args={[3,2,6]} />
      <meshStandardMaterial color={'#8b1e1e'} metalness={0.2} roughness={0.6} />
    </mesh>
  );
}

export default function Scene() {
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);

  useEffect(()=>{
    const id = setInterval(()=>{ scoreRef.current += 1; setScore(scoreRef.current); }, 150);
    return ()=>clearInterval(id);
  },[]);

  return (
    <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }} style={{height: '80vh', width: '100%'}}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5,10,5]} intensity={1.2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />

      <Environment preset="city" />

      <group position={[0,0,0]}>
        <Runner />
        <Obstacle pos={[6, -1, -6]} />
        <Obstacle pos={[14, -1, -20]} speed={0.09} />
      </group>

      <mesh rotation-x={-Math.PI/2} position={[0,-1.7,0]} receiveShadow>
        <planeGeometry args={[200,200]} />
        <meshStandardMaterial color={'#2e3b3b'} metalness={0.1} roughness={0.7} />
      </mesh>

      <Sparkles size={6} count={40} scale={[6,1,6]} speed={0.3} color="#ffcc00" />

      <PostProcessing />

      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI/2.1} />

      <Html position={[-3,2,-2]}> <div style={{padding:10,background:'rgba(0,0,0,0.45)',borderRadius:8}}>Score: <strong>{score}</strong></div> </Html>
    </Canvas>
  );
}

useGLTF.preload('/models/character.glb');

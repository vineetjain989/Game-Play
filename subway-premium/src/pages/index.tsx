import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Suspense } from 'react';
import HUD from '../components/HUD';

const Scene = dynamic(() => import('../components/Scene'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Subway Runner — Premium Demo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{display:'flex',gap:20,padding:20}}>
        <div className="canvasWrap panel">
          <Suspense fallback={<div style={{padding:20}}>Loading 3D scene...</div>}>
            <Scene />
          </Suspense>
        </div>
        <div className="hudWrap panel">
          <HUD />
        </div>
      </div>
    </>
  );
}

import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

function Shaft({ path, scale = 1 }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={scale} />;
}

function InteractiveShaft({ path, scale = 1 }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '400px',
        cursor: hovered ? 'grab' : 'default',
        border: hovered ? '2px dashed #aaa' : '2px solid transparent',
        borderRadius: '8px',
        transition: 'border 0.2s, cursor 0.2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.6)',
            color: 'white',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          Drag to rotate / scroll to zoom
        </div>
      )}

      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Shaft path={path} scale={scale} />
        </Suspense>
        <OrbitControls enablePan enableZoom enableRotate />
        <Environment preset="warehouse" />
      </Canvas>
    </div>
  );
}

export default function ShaftModels({ base }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        margin: '2rem 0',
      }}
    >
      <div style={{ flex: 1, minWidth: '300px' }}>
        <InteractiveShaft path={`${base}/models/sprocket-shaft.gltf`} scale={50} />
      </div>
      <div style={{ flex: 1, minWidth: '300px' }}>
        <InteractiveShaft path={`${base}/models/wheel-shaft.gltf`} scale={50} />
      </div>
    </div>
  );
}

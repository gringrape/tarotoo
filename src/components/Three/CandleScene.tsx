import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { CandleModel } from './CandleModel';
import styled from 'styled-components';

const FullScreenCanvas = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1; /* Above background, check pointer-events! */
  pointer-events: none;
`;

export function CandleScene() {
    return (
        <FullScreenCanvas>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                {/* Left Candle */}
                <CandleModel position={[-3, -1.5, 0]} scale={0.2} rotation={[0, 0.5, 0]} />

                {/* Right Candle */}
                <CandleModel position={[3, -1.5, 0]} scale={0.2} rotation={[0, -0.5, 0]} />

                <Environment preset="night" />
            </Canvas>
        </FullScreenCanvas>
    );
}

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { CrystalBallModel } from './CrystalBallModel';

export function SingleCrystalBall() {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            {/* Floating effect for the crystal ball */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <CrystalBallModel position={[0, -1, 0]} scale={1.5} />
            </Float>

            <Environment preset="night" />
        </Canvas>
    );
}

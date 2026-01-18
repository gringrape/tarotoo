import React from 'react';
import { useGLTF } from '@react-three/drei';

export function CrystalBallModel(props: any) {
    const { scene } = useGLTF('/models/crystal_ball.glb');
    return <primitive object={scene} {...props} />;
}

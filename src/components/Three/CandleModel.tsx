import React from 'react';
import { useGLTF } from '@react-three/drei';

export function CandleModel(props: any) {
    const { scene } = useGLTF('/models/candle_stand.glb');
    return <primitive object={scene} {...props} />;
}

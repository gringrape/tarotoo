/*
Run this to identify node names in the console.
*/
import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ClockModel() {
    const { scene, nodes } = useGLTF('/models/classic_clock.glb');
    const speed = React.useRef(1.0);

    useFrame((state, delta) => {
        // Accelerate
        speed.current += 0.005;

        // Cast to any to access dynamic node properties
        const n = nodes as any;
        // Final Animation: Object_4 (Hand 1) and Object_5 (Hand 2) with acceleration
        if (n.Object_4) n.Object_4.rotation.y += delta * 0.2 * speed.current; // Fast (Seconds)
        if (n.Object_5) n.Object_5.rotation.y += delta * 0.1 * speed.current; // Slow (Minutes/Hours)
    });

    return <primitive object={scene} scale={0.3} />;
}

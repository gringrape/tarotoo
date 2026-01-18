import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { CandleModel } from './CandleModel';

export function SingleCandle() {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            {/* Center the model in this mini-canvas */}
            <CandleModel position={[0, -1.5, 0]} scale={3} />

            <Environment preset="night" />
        </Canvas>
    );
}

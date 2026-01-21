import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { ClockModel } from './ClockModel';
import styled from 'styled-components';
import { theme } from '../../styles/designSystem';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const SceneContainer = styled.div`
  width: 100%;
  height: 400px; /* Adjust as needed */
  display: flex;
  justify-content: center;
  align-items: center;

  ${theme.media.mobile} {
    height: 370px; /* Reduced height to pull elements up */
  }
`;

export function LoadingScene() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <SceneContainer>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <ClockModel scale={isMobile ? 0.24 : 0.3} />
                <Environment preset="city" />
                {/* OrbitControls for debug rotation */}
                <OrbitControls enableZoom={false} autoRotate={false} />
            </Canvas>
        </SceneContainer>
    );
}

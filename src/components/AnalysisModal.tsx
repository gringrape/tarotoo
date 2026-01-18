import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  z-index: 2000; /* Higher than selected cards (1000+) */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled(motion.div)`
  background: rgba(20, 10, 40, 0.9);
  padding: 3rem 4rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(138, 43, 226, 0.3);
  text-align: center;
  color: white;
  min-width: 300px;
`;

const Question = styled.h2`
  font-family: 'KerisKeduLine', sans-serif;
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #E0D4FC;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  background: ${props => props.$variant === 'secondary' ? 'transparent' : '#6A0dad'};
  border: 1px solid ${props => props.$variant === 'secondary' ? '#aaa' : '#6A0dad'};
  color: ${props => props.$variant === 'secondary' ? '#ccc' : 'white'};
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  font-family: 'Suit', sans-serif;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$variant === 'secondary' ? 'rgba(255,255,255,0.1)' : '#800080'};
    transform: scale(1.05);
  }
`;

interface AnalysisModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
  confirmText?: string;
}

export function AnalysisModal({
  isVisible,
  onConfirm,
  onCancel,
  message = "분석을 시작할까요?",
  confirmText = "네"
}: AnalysisModalProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <Question>{message}</Question>
            <ButtonGroup>
              <Button $variant="secondary" onClick={onCancel} data-testid="cancel-button">다시 고르기</Button>
              <Button onClick={onConfirm} data-testid="confirm-button">{confirmText}</Button>
            </ButtonGroup>
          </ModalContent>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}

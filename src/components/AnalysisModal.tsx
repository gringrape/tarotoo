import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/designSystem';

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${theme.colors.background.overlay};
  backdrop-filter: blur(5px);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled(motion.div)`
  background: ${theme.colors.background.modal};
  padding: 3rem 4rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 20px;
  box-shadow: 0 0 30px ${theme.colors.primaryShadow};
  text-align: center;
  color: ${theme.colors.text.main};
  min-width: 300px;
  
  ${theme.media.mobile} {
    padding: 2rem;
    min-width: unset;
    width: 70%;
    max-width: 320px;
  }
`;

const Question = styled.h2`
  font-family: ${theme.fonts.main};
  font-size: 2rem;
  margin-bottom: 3rem;
  color: ${theme.colors.text.sub};
  
  strong {
    color: ${theme.colors.primary};
  }

  ${theme.media.mobile} {
    font-size: ${theme.typography.subTitle.mobile};
    margin-bottom: 2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;

  ${theme.media.mobile} {
    gap: 1rem;
    flex-wrap: wrap; /* Wrap if buttons are too wide */
  }
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  background: ${props => props.$variant === 'secondary' ? 'transparent' : theme.colors.primary};
  border: 1px solid ${props => props.$variant === 'secondary' ? theme.colors.border : theme.colors.primary};
  color: ${props => props.$variant === 'secondary' ? theme.colors.text.main : theme.colors.text.dark};
  padding: 0.8rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  font-family: ${theme.fonts.main};
  font-weight: bold;
  transition: all 0.2s ease;
  box-shadow: ${props => props.$variant === 'secondary' ? 'none' : `0 4px 15px ${theme.colors.primaryShadow}`};

  &:hover {
    background: ${props => props.$variant === 'secondary' ? 'rgba(255,255,255,0.1)' : theme.colors.primaryHover};
    transform: scale(1.05);
    box-shadow: ${props => props.$variant === 'secondary' ? 'none' : `0 0 25px ${theme.colors.primaryShadow}`};
    border-color: ${props => props.$variant === 'secondary' ? theme.colors.text.main : theme.colors.primaryHover};
  }

  ${theme.media.mobile} {
    font-size: ${theme.typography.button.mobile};
    padding: 0.7rem 1.5rem;
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
            <Question dangerouslySetInnerHTML={{ __html: message.replace(/\*(.*?)\*/g, '<strong>$1</strong>') }} />
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

import { useState } from 'react';
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
  z-index: 3000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled(motion.div)`
  background: ${theme.colors.background.modal};
  padding: 3rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 20px;
  box-shadow: 0 0 30px ${theme.colors.primaryShadow};
  text-align: center;
  color: ${theme.colors.text.main};
  width: 90%;
  max-width: 400px;
`;

const Title = styled.h2`
  font-family: ${theme.fonts.main};
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: ${theme.colors.text.highlight};
`;

const Message = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: ${theme.colors.text.main};
  line-height: 1.5;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const Button = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.text.dark};
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  font-family: ${theme.fonts.main};
  font-weight: bold;
  box-shadow: 0 4px 15px ${theme.colors.primaryShadow};
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background: ${theme.colors.primaryHover};
    transform: scale(1.02);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.p`
    color: #ff6b6b;
    font-size: 0.9rem;
    margin-top: -1rem;
    margin-bottom: 1rem;
    text-align: left;
`;

interface CreditModalProps {
    isVisible: boolean;
    onRegister: (email: string) => Promise<void>;
    onCancel: () => void;
}

export function CreditModal({ isVisible, onRegister, onCancel }: CreditModalProps) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!email.includes('@')) {
            setError("올바른 이메일 주소를 입력해주세요.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await onRegister(email);
            setEmail('');
        } catch (err: any) {
            setError(err.message || "이메일 등록에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <Backdrop
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <ModalContent
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <Title>사용 횟수 초과</Title>
                        <Message>
                            무료 사용 횟수를 모두 사용하셨습니다.<br />
                            이메일을 등록하시면 <strong>추가 2회</strong>가 지급됩니다.
                        </Message>
                        <Input
                            type="email"
                            placeholder="이메일을 입력해주세요"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <ErrorMsg>{error}</ErrorMsg>}
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? "처리중..." : "이메일 등록하고 계속하기"}
                        </Button>
                        <div style={{ marginTop: '1rem', cursor: 'pointer', fontSize: '0.9rem', color: '#aaa' }} onClick={onCancel}>
                            나중에 하기
                        </div>
                    </ModalContent>
                </Backdrop>
            )}
        </AnimatePresence>
    );
}

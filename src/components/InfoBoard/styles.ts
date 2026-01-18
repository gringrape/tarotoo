import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ScrollContent = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  padding-right: 1rem;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(106, 13, 173, 0.5);
    border-radius: 3px;
  }
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 4rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
`;

export const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 auto;
`;

export const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
  text-align: left;
`;

export const CardName = styled.h4`
  font-size: 1.8em;
  color: #FFD700;
  margin: 0 0 1.5rem 0;
  font-weight: bold;
`;

export const ResultTitle = styled.h2`
  font-family: 'GounBatang', serif;
  font-size: 2em;
  margin-bottom: 1rem;
  color: #FFD700;
  flex-shrink: 0;
`;

export const ResultDesc = styled.p`
  font-size: 1em;
  line-height: 1.8;
  color: #ddd;
  word-break: keep-all;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

export const TypeLabel = styled.h3`
  font-family: 'GounBatang', serif;
  font-size: 1.5em;
  color: #E0D4FC;
  opacity: 0.9;
  margin: 0;
  margin-bottom: 0.5rem;
`;

export const TypeText = styled(motion.p)`
  font-family: 'GounBatang', serif;
  font-size: 1.3em;
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: keep-all;
  color: #fff;
  text-align: left;
`;

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/designSystem';

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
    background: ${theme.colors.primaryShadow};
    border-radius: 3px;
  }
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 3rem;
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
  flex: 0 0 22%; /* Generous ratio for the card fan */
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
  font-size: 1.5em;
  color: ${theme.colors.primary};
  margin: 0 0 1.5rem 0;
  font-weight: bold;
`;

export const ResultTitle = styled.h2`
  font-family: ${theme.fonts.main};
  font-size: 2em;
  margin-bottom: 1rem;
  color: ${theme.colors.text.highlight};
  flex-shrink: 0;
`;

export const ResultDesc = styled.div`
  font-size: 1em;
  line-height: 1.8;
  color: ${theme.colors.text.main};
  word-break: keep-all;
  word-wrap: break-word; /* Ensure compatibility */
  text-align: left;
  
  /* Markdown Styles */
  h1, h2, h3 {
    color: ${theme.colors.text.highlight};
    margin-top: 2rem;
    margin-bottom: 1rem;
    line-height: 1.4;
  }

  h1 { font-size: 1.8em; }
  h2 { font-size: 1.5em; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; }
  h3 { font-size: 1.2em; color: ${theme.colors.primary}; }

  p {
    margin-bottom: 1.2rem;
    line-height: 1.8;
  }

  ul, ol {
    margin-bottom: 1.2rem;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
    line-height: 1.7;
  }

  strong {
    color: ${theme.colors.primary};
    font-weight: bold;
  }

  blockquote {
    border-left: 4px solid ${theme.colors.primary};
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: ${theme.colors.text.sub};
  }
`;

export const TypeLabel = styled.h3`
  font-family: ${theme.fonts.main};
  font-size: 1.5em;
  color: ${theme.colors.text.sub};
  opacity: 0.9;
  margin: 0;
  margin-bottom: 0.5rem;
`;

export const TypeText = styled(motion.p)`
  font-family: ${theme.fonts.main};
  font-size: 1.3em;
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: keep-all;
  color: ${theme.colors.text.main};
  text-align: left;
`;

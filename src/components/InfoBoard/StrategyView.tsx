import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ScrollContent, ResultTitle, CardName, ResultDesc } from './styles';

interface StrategyViewProps {
    overallStrategy: string;
}

export function StrategyView({ overallStrategy }: StrategyViewProps) {
    return (
        <ScrollContent key="step-14-text">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%' }}
            >
                <ResultTitle>최종 전략</ResultTitle>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '2rem', marginTop: '1rem' }}>
                    <CardName>종합 전략</CardName>
                    <ResultDesc>
                        <ReactMarkdown>
                            {overallStrategy}
                        </ReactMarkdown>
                    </ResultDesc>
                </div>
            </motion.div>
        </ScrollContent>
    );
}

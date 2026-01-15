import { useState } from 'react';
import { LayoutGroup } from 'framer-motion';
import { CardDeck } from './CardDeck';
import { SelectedCards } from './SelectedCards';
import { SandText } from './SandText';

export function TarotBoard() {
    const [selectedCards, setSelectedCards] = useState<number[]>([]);

    const handleCardClick = (index: number) => {
        setSelectedCards(prev => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index);
            }
            if (prev.length < 3) {
                return [...prev, index];
            }
            return prev;
        });
    };

    return (
        <LayoutGroup>
            {selectedCards.length === 0 && <SandText text="운명의 카드를 세장 선택해주세요." />}
            <SelectedCards selectedCards={selectedCards} onCardClick={handleCardClick} />
            <CardDeck selectedCards={selectedCards} onCardClick={handleCardClick} />
        </LayoutGroup>
    );
}

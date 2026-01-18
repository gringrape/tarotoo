
describe('Tarot App E2E', () => {
    let nextCardIndex = 0;

    beforeEach(() => {
        nextCardIndex = 0;
        cy.visit('/');
    });

    // === Helper Steps ===
    const mockApi = () => {
        cy.intercept('POST', '**/analyze', {
            statusCode: 200,
            body: {
                theirFeelings: {
                    cards: [
                        { name: 'Card A', desc: 'Their Desc A' },
                        { name: 'Card B', desc: 'Their Desc B' },
                        { name: 'Card C', desc: 'Their Desc C' }
                    ],
                    summary: 'Their Final Summary' // Shown in Step 13
                },
                myFeelings: {
                    cards: [
                        { name: 'Card D', desc: 'My Desc D' },
                        { name: 'Card E', desc: 'My Desc E' },
                        { name: 'Card F', desc: 'My Desc F' }
                    ],
                    summary: 'My Final Summary' // Shown in Step 13
                },
                overallStrategy: 'Final Strategy' // Shown in Step 14
            },
            delay: 100 // Fast response for test
        }).as('analyzeParams');
    };

    const selectCards = ({ count }: { count: number }) => {
        const startIndex = nextCardIndex;
        nextCardIndex += count;

        cy.get('[data-testid^="card-wrapper-"]').then($cards => {
            for (let i = 0; i < count; i++) {
                cy.wrap($cards[startIndex + i]).click({ force: true });
            }
        });
    };

    const verifyModal = ({ message, confirmWith }: { message: string; confirmWith: string }) => {
        cy.contains(message).should('be.visible');
        cy.get('[data-testid="confirm-button"]').should('contain.text', confirmWith).click();
    };

    const proceedNext = () => {
        cy.contains('button', '다음').should('be.visible').click();
    };

    // === Tests ===

    it('completes the full tarot reading flow with sequential analysis', () => {
        mockApi();

        // Phase 1: Their Cards
        cy.contains('상대방').should('be.visible');
        selectCards({ count: 3 });
        verifyModal({ message: '다음', confirmWith: '네' });

        // Phase 2: My Cards
        cy.contains('나의 마음').should('be.visible');
        selectCards({ count: 3 });
        verifyModal({ message: '분석', confirmWith: '분석' });

        // Await Analysis
        cy.contains('분석하고 있습니다').should('be.visible');
        cy.wait('@analyzeParams');

        // === Sequential Card Analysis (6 Cards) ===
        // Expected Texts in order
        const expectedTexts = [
            'Their Desc A',
            'Their Desc B',
            'Their Desc C',
            'My Desc D',
            'My Desc E',
            'My Desc F'
        ];

        expectedTexts.forEach((text, index) => {
            // Wait for Flip Step (Auto) -> Text Step (Manual)
            // Flip step is odd (1, 3, 5...), Text step is even (2, 4, 6...)
            // But from user perspective, we just wait for text to appear.

            cy.contains(text, { timeout: 10000 }).should('be.visible');

            // The "Next" button appears on text steps
            if (index < 5) { // For first 5 cards
                proceedNext();
            } else {
                // For the last card (6th), clicking next goes to Summary Grid
                proceedNext();
            }
        });

        // === Step 13: Summary Grid ===
        cy.contains('종합 분석 결과').should('be.visible');
        cy.contains('Their Final Summary').should('be.visible'); // Summary text included in Step 13
        cy.contains('My Final Summary').should('be.visible');

        // Verify we are NOT yet seeing the Strategy
        cy.contains('최종 전략').should('not.exist');

        // Advance to Step 14
        proceedNext();

        // === Step 14: Final Strategy ===
        cy.contains('최종 전략').should('be.visible');
        cy.contains('Final Strategy').should('be.visible');
    });

    it('handles cancellation in modal correctly', () => {
        mockApi(); // Just in case
        nextCardIndex = 0;
        selectCards({ count: 3 });
        cy.contains('다음').should('be.visible');

        cy.get('[data-testid="cancel-button"]').click();
        cy.contains('다음').should('not.exist');

        // Reset local index tracker since UI deselected them
        nextCardIndex -= 3;

        selectCards({ count: 3 });
        cy.contains('다음').should('be.visible');
    });
});

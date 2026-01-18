

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
                    summary: 'Their Final Summary'
                },
                myFeelings: {
                    cards: [
                        { name: 'Card D', desc: 'My Desc D' },
                        { name: 'Card E', desc: 'My Desc E' },
                        { name: 'Card F', desc: 'My Desc F' }
                    ],
                    summary: 'My Final Summary'
                },
                overallStrategy: 'Final Strategy'
            },
            delay: 500
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

    const verifyStage = ({ expectingText }: { expectingText: string }) => {
        cy.contains(expectingText, { timeout: 30000 }).should('be.visible');
    };

    const proceedToNextStage = () => {
        cy.contains('button', '다음').should('be.visible').click();
    };

    const verifyFinalSummary = () => {
        cy.contains('종합').should('be.visible');
        cy.contains('Summary').should('be.visible');
        cy.contains('Strategy').should('be.visible');
    };

    // === Tests ===

    it('completes the full tarot reading flow with 3-stage analysis', () => {
        mockApi();

        // Phase 1: Their Cards
        cy.contains('상대방').should('be.visible');
        selectCards({ count: 3 });
        verifyModal({ message: '다음', confirmWith: '네' });

        // Phase 2: My Cards
        cy.contains('나의 마음').should('be.visible');
        selectCards({ count: 3 });
        verifyModal({ message: '분석', confirmWith: '분석' });

        // Analysis
        cy.contains('분석하고 있습니다').should('be.visible');
        cy.wait('@analyzeParams');

        // Stage 1
        verifyStage({ expectingText: 'Their Desc C' });
        proceedToNextStage();

        // Stage 2
        verifyStage({ expectingText: 'My Desc F' });
        proceedToNextStage();

        // Stage 3
        verifyFinalSummary();
    });

    it('handles cancellation in modal correctly', () => {
        selectCards({ count: 3 });
        cy.contains('다음').should('be.visible');

        cy.get('[data-testid="cancel-button"]').click();
        cy.contains('다음').should('not.exist');

        // Reset index because after cancel we need to re-select
        // Wait, does cancellation reset the fact that we "used" those physical cards?
        // In the app, they are deselected.
        // So we can click the SAME cards again (0, 1, 2).
        // Since my `nextCardIndex` only increments, I need to allow "resetting" or manual management if needed.
        // OR, the test logic needs to "rewind" the index.
        nextCardIndex -= 3;

        selectCards({ count: 3 });
        cy.contains('다음').should('be.visible');
    });
});

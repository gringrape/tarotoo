

describe('Tarot App E2E', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('runs through the full tarot reading flow', () => {
        // Mock the analysis API
        cy.intercept('POST', '**/analyze', {
            statusCode: 200,
            body: {
                theirFeelings: {
                    cards: [
                        { name: 'Card 1', desc: 'Their Desc 1' },
                        { name: 'Card 2', desc: 'Their Desc 2' },
                        { name: 'Card 3', desc: 'Their Desc 3' }
                    ],
                    summary: 'Their Summary'
                },
                myFeelings: {
                    cards: [
                        { name: 'Card 4', desc: 'My Desc 1' },
                        { name: 'Card 5', desc: 'My Desc 2' },
                        { name: 'Card 6', desc: 'My Desc 3' }
                    ],
                    summary: 'My Summary'
                },
                overallStrategy: 'Strategy'
            },
            delay: 1000 // Ensure loading state is visible
        }).as('analyzeParams');

        // 1. Initial State
        cy.contains('나를 향한 상대방의 마음을 떠올리며').should('be.visible');

        // Select 3 cards using test ids
        cy.get('[data-testid="card-wrapper-0"]').click({ force: true });
        cy.get('[data-testid="card-wrapper-1"]').click({ force: true });
        cy.get('[data-testid="card-wrapper-2"]').click({ force: true });

        // Modal appears
        cy.contains('분석을 시작할까요?').should('be.visible');

        // Confirm
        cy.get('[data-testid="confirm-button"]').click();

        // 2. Second Phase
        cy.contains('상대방을 향한 나의 마음을 떠올리며').should('be.visible');

        // Select 3 cards again (indices 3, 4, 5)
        cy.get('[data-testid="card-wrapper-3"]').click({ force: true });
        cy.get('[data-testid="card-wrapper-4"]').click({ force: true });
        cy.get('[data-testid="card-wrapper-5"]').click({ force: true });

        // Modal appears
        cy.contains('분석을 시작할까요?').should('be.visible');

        // Confirm
        cy.get('[data-testid="confirm-button"]').click();

        // 3. Analysis Result
        cy.contains('운명을 분석하고 있습니다...').should('be.visible');

        // Wait for the API call
        cy.wait('@analyzeParams');

        // Wait for results
        // The typing effect takes time, so we might need to wait or check for final state
        // We can check if "Their Desc 1" appears which is part of our mock
        cy.contains('Their Desc 1', { timeout: 20000 }).should('be.visible');
        cy.contains('나를 향한 상대방의 마음').should('be.visible');
        cy.contains('상대방을 향한 나의 마음').should('be.visible');
    });

    it('allows cancelling selection in the modal', () => {
        // Select 3 cards
        cy.get('[data-testid="card-wrapper-0"]').click({ force: true });
        cy.get('[data-testid="card-wrapper-1"]').click({ force: true });
        cy.get('[data-testid="card-wrapper-2"]').click({ force: true });

        // Modal appears
        cy.contains('분석을 시작할까요?').should('be.visible');

        // Click Cancel
        cy.get('[data-testid="cancel-button"]').click();

        // Modal should disappear
        cy.contains('분석을 시작할까요?').should('not.exist');

        // Selecting again should work
        cy.get('[data-testid="card-wrapper-3"]').click({ force: true });
        cy.get('[data-testid="card-wrapper-4"]').click({ force: true });
        cy.get('[data-testid="card-wrapper-5"]').click({ force: true });

        cy.contains('분석을 시작할까요?').should('be.visible');
    });
});

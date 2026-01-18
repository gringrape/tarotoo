describe('Card Deck Randomization', () => {
    it('should display cards in different order on reload', () => {
        // 1. Visit the page
        cy.visit('/');

        // 2. Get the list of card IDs (from data-testid) in DOM order
        const getCardIds = () => {
            return cy.get('[data-testid^="card-wrapper-"]')
                .then($cards => {
                    // Map elements to their data-testid attribute value (e.g., "card-wrapper-0")
                    // then extract the ID part.
                    return Cypress._.map($cards, card => {
                        const testId = card.getAttribute('data-testid');
                        return parseInt(testId!.replace('card-wrapper-', ''), 10);
                    });
                });
        };

        let firstLoadOrder: number[];

        getCardIds().then(ids => {
            firstLoadOrder = ids;
            // Verify we have 22 cards
            expect(ids).to.have.length(22);

            // 3. Reload the page
            cy.visit('/');
        });

        getCardIds().then(secondLoadOrder => {
            // Verify we have 22 cards again
            expect(secondLoadOrder).to.have.length(22);

            // 4. Compare orders
            // It is statistically extremely unlikely that they are identical
            // We check that they are NOT deep equal
            expect(secondLoadOrder).to.not.deep.equal(firstLoadOrder);

            // Also verify that it contains all numbers 0-21 (integrity check)
            const sortedFirst = [...firstLoadOrder].sort((a, b) => a - b);
            const sortedSecond = [...secondLoadOrder].sort((a, b) => a - b);
            const expected = Array.from({ length: 22 }, (_, i) => i);

            expect(sortedFirst).to.deep.equal(expected);
            expect(sortedSecond).to.deep.equal(expected);
        });
    });
});

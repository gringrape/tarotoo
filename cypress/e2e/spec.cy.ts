
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

        // Phase 0: Intro Screen
        cy.contains('h1', '재회타로').should('be.visible');
        cy.contains('button', '시작하기').should('be.visible').click();

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
            // Handle Guidance Overlays
            // Step 1 (Index 0): Start of Their Cards
            if (index === 0) {
                cy.contains('먼저 상대방의 마음을 알아볼까요?').should('be.visible').click();
                cy.contains('먼저 상대방의 마음을 알아볼까요?').should('not.be.visible');
            }

            // Step 7 (Index 3): Start of My Cards
            if (index === 3) {
                // Wait for the transition to Step 7
                // Previous step was index 2 (Card 3). We clicked Next.
                // The overlay should appear.
                cy.contains('이제 당신의 마음을 읽어볼게요').should('be.visible').click();
                cy.contains('이제 당신의 마음을 읽어볼게요').should('not.be.visible');
            }

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
        // Handle Guidance Overlay for Summary
        cy.contains('결과를 종합해드릴게요').should('be.visible').click();
        cy.contains('결과를 종합해드릴게요').should('not.be.visible');

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

        // Phase 0: Intro Screen (Dismiss)
        cy.contains('button', '시작하기').scrollIntoView().should('be.visible').click();

        selectCards({ count: 3 });
        cy.contains('다음').should('be.visible');

        cy.get('[data-testid="cancel-button"]').click();
        cy.contains('다음').should('not.exist');

        // Reset local index tracker since UI deselected them
        nextCardIndex -= 3;

        selectCards({ count: 3 });
        cy.contains('다음').should('be.visible');
    });

    describe('Credit System', () => {
        it('should show credit modal on 403 and allow recovery via email', () => {
            // 1. Setup Intercepts
            cy.intercept('POST', '**/api/users', { statusCode: 201, body: { userId: 'test-user', credits: 0 } }).as('createUser');

            // Force 403 on first analysis
            cy.intercept('POST', '**/api/analyze', {
                statusCode: 403,
                body: { message: 'Insufficient credits' }
            }).as('analyzeFail');

            // Success on email register
            cy.intercept('POST', '**/api/users/register-email', {
                statusCode: 200,
                body: { success: true, credits: 2 }
            }).as('registerEmail');

            // Success Analysis Mock
            cy.intercept('POST', '**/api/analyze', {
                statusCode: 200,
                body: {
                    theirFeelings: { cards: [{ name: 'A', desc: 'A' }], summary: 'Test Summary' },
                    myFeelings: { cards: [{ name: 'B', desc: 'B' }], summary: 'Test Summary' },
                    overallStrategy: 'Success Strategy'
                }
            }).as('analyzeSuccess');

            cy.visit('/');
            cy.contains('시작하기').click();

            // 2. Select Cards (Their)
            selectCards({ count: 3 });
            verifyModal({ message: '다음', confirmWith: '네' });

            // 3. Select Cards (My)
            selectCards({ count: 3 });

            // Trigger Analysis
            cy.contains('button', '분석').should('be.visible').click();
            cy.contains('결과를 보시겠습니까?').should('be.visible');
            cy.get('[data-testid="confirm-button"]').click();

            cy.wait('@analyzeFail');

            // 4. Verify Credit Modal
            cy.contains('사용 횟수 초과').should('be.visible');
            cy.get('input[type="email"]').type('test@example.com');
            cy.contains('이메일 등록하고 계속하기').click();

            // 5. Verify Recovery
            cy.wait('@registerEmail');
            cy.wait('@analyzeSuccess');
            cy.contains('사용 횟수 초과').should('not.exist');
        });
    });
});

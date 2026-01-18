const http = require('http');

const PORT = 3001;

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/api/analyze' && req.method === 'POST') {
        console.log('Received analysis request. Waiting 10 seconds...');

        // Simulate 10 second delay
        setTimeout(() => {
            const mockResponse = {
                theirFeelings: {
                    cards: [
                        { name: 'Card A', desc: '상대방은 당신에 대해 호기심을 가지고 있습니다. 새로운 시작을 의미하는 카드가 나왔네요.' },
                        { name: 'Card B', desc: '하지만 조금 조심스러운 태도도 보입니다. 과거의 상처가 아직 남아있을 수 있습니다.' },
                        { name: 'Card C', desc: '결국 마음을 열고 다가올 것입니다. 긍정적인 신호로 해석됩니다.' }
                    ],
                    summary: '상대방은 당신에게 긍정적인 호기심을 가지고 있으며, 조심스럽지만 관계를 발전시키고 싶어합니다.'
                },
                myFeelings: {
                    cards: [
                        { name: 'Card D', desc: '당신은 이 관계에 대해 기대감이 큽니다. 열정적인 마음이 보이네요.' },
                        { name: 'Card E', desc: '동시에 불안감도 가지고 있습니다. 상대방의 진심을 확신하지 못하고 있어요.' },
                        { name: 'Card F', desc: '자신의 감정을 솔직하게 표현하는 것이 중요합니다. 숨기지 마세요.' }
                    ],
                    summary: '당신은 기대와 불안이 공존하고 있지만, 긍정적인 방향으로 나아가려는 의지가 강합니다.'
                },
                overallStrategy: '서로의 마음을 확인하는 시간을 가지세요. 급하게 다가가기보다는 천천히 신뢰를 쌓는 것이 중요합니다. 솔직한 대화가 열쇠입니다.'
            };

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(mockResponse));
            console.log('Response sent.');
        }, 10000); // 10 seconds delay
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Mock server running at http://localhost:${PORT}`);
});

const http = require('http');
const { randomUUID } = require('crypto');

const PORT = 3001;
const users = {}; // In-memory user store: { [userId]: { credits: number, email?: string } }

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

    // Helper to read body
    const readBody = () => new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => { resolve(body ? JSON.parse(body) : {}); });
    });

    // 1. Create User
    if (req.url === '/api/users' && req.method === 'POST') {
        const userId = randomUUID();
        users[userId] = { credits: 1 };

        console.log(`[Mock] Created user ${userId} with 1 credit.`);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ userId, credits: 1 }));
        return;
    }

    // 2. Register Email
    if (req.url === '/api/users/register-email' && req.method === 'POST') {
        readBody().then(({ userId, email }) => {
            if (!userId || !email) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Missing userId or email' }));
                return;
            }

            const user = users[userId];
            if (!user) {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'User not found' }));
                return;
            }

            if (user.email) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Email already registered' }));
                return;
            }

            user.email = email;
            user.credits += 2; // Grant 2 extra credits

            console.log(`[Mock] User ${userId} registered email. Credits: ${user.credits}`);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, credits: user.credits }));
        });
        return;
    }

    // 3. Analyze (with credit check)
    if (req.url === '/api/analyze' && req.method === 'POST') {
        readBody().then(body => {
            const { userId } = body;

            // Bypass credit check if no userId provided (backward compatibility or strict enforcement?)
            // Let's enforce it as per requirements.
            if (!userId) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Missing userId' }));
                return;
            }

            const user = users[userId];
            if (!user) {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'User not found' }));
                return;
            }

            if (user.credits <= 0) {
                console.log(`[Mock] User ${userId} has insufficient credits.`);
                res.writeHead(403);
                res.end(JSON.stringify({ message: 'Insufficient credits' }));
                return;
            }

            // Deduct credit
            user.credits -= 1;
            console.log(`[Mock] User ${userId} used 1 credit. Remaining: ${user.credits}`);

            console.log('Received analysis request. Waiting 5 seconds...');

            // Simulate delay
            setTimeout(() => {
                const mockResponse = {
                    theirFeelings: {
                        cards: [
                            { name: 'The Fool', desc: '상대방은 당신에 대해 호기심을 가지고 있습니다. 새로운 시작을 의미하는 카드가 나왔네요. 이는 새로운 시작을 의미하는 카드가 나왔네요.' },
                            { name: 'The Magician', desc: '하지만 조금 조심스러운 태도도 보입니다. 과거의 상처가 아직 남아있을 수 있습니다. 이는 과거의 상처가 아직 남아있을 수 있습니다.' },
                            { name: 'The High Priestess', desc: '결국 마음을 열고 다가올 것입니다. 긍정적인 신호로 해석됩니다. 이는 마음을 열고 다가올 것입니다. 긍정적인 신호로 해석됩니다.' }
                        ],
                        summary: '상대방은 당신에게 긍정적인 호기심을 가지고 있으며, 조심스럽지만 관계를 발전시키고 싶어합니다. 이는 상대방은 당신에게 긍정적인 호기심을 가지고 있으며, 조심스럽지만 관계를 발전시키고 싶어합니다.'
                    },
                    myFeelings: {
                        cards: [
                            { name: 'The Magician', desc: '당신은 이 관계에 대해 기대감이 큽니다. 열정적인 마음이 보이네요. 이는 당신은 이 관계에 대해 기대감이 큽니다. 열정적인 마음이 보이네요.' },
                            { name: 'The High Priestess', desc: '동시에 불안감도 가지고 있습니다. 상대방의 진심을 확신하지 못하고 있어요. 이는 동시에 불안감도 가지고 있습니다. 상대방의 진심을 확신하지 못하고 있어요.' },
                            { name: 'The Empress', desc: '자신의 감정을 솔직하게 표현하는 것이 중요합니다. 숨기지 마세요. 이는 자신이 자신의 감정을 솔직하게 표현하는 것이 중요합니다. 숨기지 마세요.' }
                        ],
                        summary: '당신은 기대와 불안이 공존하고 있지만, 긍정적인 방향으로 나아가려는 의지가 강합니다. 이는 당신은 기대와 불안이 공존하고 있지만, 긍정적인 방향으로 나아가려는 의지가 강합니다.'
                    },
                    overallStrategy: '서로의 마음을 확인하는 시간을 가지세요. 급하게 다가가기보다는 천천히 신뢰를 쌓는 것이 중요합니다. 솔직한 대화가 열쇠입니다. 이는 서로의 마음을 확인하는 시간을 가지세요. 급하게 다가가기보다는 천천히 신뢰를 쌓는 것이 중요합니다. 솔직한 대화가 열쇠입니다.'
                };

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(mockResponse));
                console.log('Response sent.');
            }, 5000);
        });
        return;
    }

    // Default 404
    res.writeHead(404);
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`Mock server running at http://localhost:${PORT}`);
});

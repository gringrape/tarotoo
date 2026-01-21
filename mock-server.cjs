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
                            {
                                name: "The Fool",
                                desc: "상대방은 현재 관계에 대해 무겁거나 심각한 책임감을 느끼기보다는, 가벼운 마음으로 즐겁게 시작하고 싶어 합니다. 자유로운 영혼처럼 구속받지 않는 상태를 선호하며, 미래에 대한 구체적인 계획보다는 현재의 즐거움에 초점을 맞추고 있습니다."
                            },
                            {
                                name: "The Magician",
                                desc: "당신과의 관계를 이끌어갈 자신감과 능력, 그리고 매력을 충분히 가지고 있다고 생각합니다. 다만 이는 진지한 감정의 깊이보다는, 본인이 이 상황을 능숙하게 '다룰 수 있다'는 주도권이나 호기심 섞인 흥미에 가깝습니다."
                            },
                            {
                                name: "The High Priestess",
                                desc: "겉으로는 활발해 보일지 몰라도, 내면 깊은 곳의 진심이나 본인이 가진 비밀은 철저히 숨기고 있습니다. 당신을 냉철하게 관찰하고 있으며, 자신의 감정을 100퍼센트 드러내지 않은 채 일정한 심리적 거리를 유지하고 있습니다."
                            }
                        ],
                        summary: "상대방은 당신에게 흥미와 매력을 느끼며 관계를 주도하려 하지만, 결정적인 속마음은 감추고 있습니다. 구속되기는 싫어하며, 자유로운 탐색 단계를 즐기고 있는 상태입니다."
                    },
                    myFeelings: {
                        cards: [
                            {
                                name: "The Empress",
                                desc: "당신은 이 관계에서 큰 애정과 풍요로움을 느끼고 있으며, 상대방을 돌보고 챙겨주고 싶은 모성애적인 본능이 강하게 작용하고 있습니다. 관계가 현실적으로 결실을 맺기를 바라는 마음이 큽니다."
                            },
                            {
                                name: "The Emperor",
                                desc: "관계가 불확실한 상태로 남는 것을 원치 않으며, 확실한 체계와 안정을 원합니다. 당신이 상황을 통제하고 싶어 하거나, 상대방이 내 기준에 맞춰주기를 바라는 보수적이고 권위적인 태도가 내재되어 있습니다."
                            },
                            {
                                name: "The Hierophant",
                                desc: "단순한 연애를 넘어 결혼이나 공식적인 관계 승격 등 사회적으로 인정받는 견고한 약속을 원하고 있습니다. 두 사람의 관계가 전통적이고 도덕적인 올바른 길로 나아가야 한다는 신념이 강합니다."
                            }
                        ],
                        summary: "당신은 이 관계를 매우 진지하게 받아들이고 있으며, 애정을 쏟는 만큼 확실한 책임과 공식적인 관계 정립(결혼, 약속)을 강력하게 원하고 있습니다."
                    },
                    overallStrategy: "## 종합 조언 및 전략\n\n두 분의 카드를 대조해보면 에너지의 무게감이 극명하게 다릅니다. 당신은 '안정과 확신(황제, 교황)'을 추구하는 반면, 상대방은 '자유와 탐색(바보, 마법사)'을 추구하고 있습니다. 이 간극을 줄이는 것이 핵심입니다.\n\n### 1. 관계의 무게감을 덜어내세요\n현재 당신의 카드는 3, 4, 5번 메이저 아르카나로 이어지며 매우 무겁고 진지한 에너지를 형성하고 있습니다. 반면 상대방은 0, 1번의 시작 단계 에너지입니다. 지금 당장 관계를 규정짓거나 미래에 대한 확답을 요구하는 행동은 자유를 원하는 상대방(The Fool)에게 큰 부담이 되어 도망가게 만들 수 있습니다. 결혼이나 책임에 대한 언급을 줄이고, 현재를 즐기는 가벼운 태도를 연출해야 합니다.\n\n### 2. 패를 다 보여주지 마세요\n상대방은 '고위 여사제' 카드를 통해 속내를 감추고 당신을 관찰하고 있습니다. 이에 맞서 당신도 모든 감정과 일상을 공유하기보다는 신비주의 전략을 취해야 합니다. 당신이 너무 헌신적이거나(여황제) 통제하려 들면(황제), 상대방은 금방 흥미를 잃을 수 있습니다. 상대가 당신을 궁금해하도록 여백을 남기십시오.\n\n### 3. 유연한 태도로 주도권을 회복하세요\n당신은 규칙과 안정을 중시하지만, 지금은 '마법사' 카드를 쥔 상대방의 유연함과 재치에 말려들 가능성이 큽니다. 당신의 확고한 기준(교황)을 잠시 내려놓고, 상대방의 장단에 맞춰주는 척하며 여유를 가지세요. 조급함을 버리고 당신의 가치를 높게 유지할 때, 상대방은 그제야 당신이라는 사람을 진지하게 탐구하려 할 것입니다."
                };

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(mockResponse));
                console.log('Response sent.');
            }, 100000000);
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

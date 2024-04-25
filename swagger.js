const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "오목시로이 백엔드 API",
            version: "1.0.0",
            description: "모르면 물어보세요",
        },
        servers: [
            {
                url: "http://localhost:8080",
                description: "개발 서버",
            },
        ],
        components: {
            schemas: {
                Room: {
                    type: "object",
                    properties: {
                        room_id: {
                            type: "integer",
                            description: "방의 고유 식별자입니다.",
                        },
                        title: {
                            type: "string",
                            description: "방의 제목입니다.",
                        },
                        creator_user: {
                            type: "string",
                            description: "방을 생성한 사용자의 이름입니다.",
                        },
                        guest: {
                            oneOf: [
                                {
                                    type: "string",
                                    description: "게스트 사용자의 이름입니다.",
                                },
                                {
                                    type: "null",
                                    description:
                                        "게스트가 없는 경우에는 null입니다.",
                                },
                            ],
                            description:
                                "게스트 사용자의 이름 또는 null 값입니다.",
                        },
                        player_count: {
                            type: "integer",
                            description: "현재 방에 있는 플레이어의 수입니다.",
                        },
                        timer_second: {
                            type: "integer",
                            description: "타이머의 지속 시간(초)입니다.",
                        },
                    },
                },
            },
        },
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

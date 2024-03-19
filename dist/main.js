"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cors = require("cors");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cors({
        origin: 'http://localhost:3000',
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    }));
    const options = new swagger_1.DocumentBuilder()
        .setTitle('API')
        .setDescription('The API description')
        .setVersion('1.0')
        .addTag('api')
        .addTag('users')
        .addTag('hotels')
        .addTag('reservations')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(5001);
}
bootstrap();
//# sourceMappingURL=main.js.map
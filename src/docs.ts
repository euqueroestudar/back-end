import { INestApplication } from '@nestjs/common/interfaces';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class OpenAPI {
  static instance(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('EQES Documantation API')
      .setDescription('The api documantation')
      .setVersion('0.0.1')
      .addTag('API')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    return app;
  }
}


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- CONFIGURAÇÃO DO SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('Sistema de Caixa API')
    .setDescription('API para gerenciar transações e saldo.')
    .setVersion('1.0')
    .addTag('cashflow')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // O endpoint será http://localhost:3000/api/docs
  SwaggerModule.setup('api/docs', app, document); 
  // -------------------------------

  await app.listen(3000);
}
bootstrap();
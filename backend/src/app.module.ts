// backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importe ConfigModule e ConfigService
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { CashflowModule } from './cashflow/cashflow.module'; // Seu módulo de movimentação

@Module({
  imports: [
    // 1. ConfigModule para carregar variáveis de ambiente
    ConfigModule.forRoot({
      isGlobal: true, // Torna o módulo de configuração disponível globalmente
    }),

    // 2. TypeOrmModule (configuração assíncrona para usar ConfigService)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importa o ConfigModule para usar o ConfigService
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // Tipo de banco de dados
        host: 'db', // O NOME DO SERVIÇO do Docker Compose!
        port: 5432,
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        
        // Entidades a serem carregadas (usaremos o padrão de auto-carregamento)
        entities: [__dirname + '/**/*.entity{.ts,.js}'], 
        
        // Migrations (para desenvolvimento)
        synchronize: true, // ATENÇÃO: Use 'true' APENAS em desenvolvimento!
        autoLoadEntities: true, // Carrega automaticamente as entidades

        // Detalhes da conexão para debug (opcional)
        logging: ['query', 'error'],
      }),
      inject: [ConfigService],
    }),

    CashflowModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
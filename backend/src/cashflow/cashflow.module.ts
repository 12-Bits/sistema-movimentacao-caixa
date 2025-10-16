import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashflowService } from './cashflow.service';
import { CashflowController } from './cashflow.controller';
import { Transaction } from './entities/transaction.entity'; // Importe a entidade

@Module({
  imports: [
    // Registra a entidade Transaction (e Account, se você a criar)
    TypeOrmModule.forFeature([Transaction]), 
  ],
  controllers: [CashflowController],
  providers: [CashflowService],
  exports: [TypeOrmModule] // Se precisar injetar o Repositório em outros módulos
})
export class CashflowModule {}
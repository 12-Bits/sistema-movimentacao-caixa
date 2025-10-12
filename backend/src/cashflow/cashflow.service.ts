// backend/src/cashflow/cashflow.service.ts

import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto'; // <<-- IMPORT AQUI!
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class CashflowService {
  // Use o nome correto do DTO
  async createTransaction(transactionDto: CreateTransactionDto): Promise<Transaction> {
    
    // ... o restante da sua lógica de transação ...

    // Exemplo de como usar o tipo:
    console.log(`Nova transação do tipo: ${transactionDto.type} no valor de ${transactionDto.amount}`);
    
    // ATENÇÃO: Se houver erros no código de transação, use `CreateTransactionDto`
    // no lugar de `TransactionDto` em todas as ocorrências.

    // Coloque a lógica real aqui:
    return null as any; 
  }
}
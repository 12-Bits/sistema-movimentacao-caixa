import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto'; 
import { SummaryDto } from './dto/summary.dto';

@Injectable()
export class CashflowService {

  // Método chamado por POST /cashflow/transaction
  createTransaction(createTransactionDto: CreateTransactionDto) {
    // 🚨 A lógica real de persistência virá aqui (TypeORM/DB)
    console.log('Criando transação:', createTransactionDto);
    return { 
      message: 'Transação criada com sucesso (Simulação)', 
      data: createTransactionDto 
    };
    
  }
  
  
  // Método chamado por GET /cashflow/balance
  getCurrentBalance(): number {
    console.log('Buscando saldo atual...');
    return 0.00; // Simulação
  }

  getSummary(): SummaryDto {
    const incomes = 1500.50;  // Simulação
    const expenses = 500.00; // Simulação
    const balance = incomes - expenses;

    return {
      incomes: incomes,
      expenses: expenses,
      balance: balance,
    };
  }
  
}

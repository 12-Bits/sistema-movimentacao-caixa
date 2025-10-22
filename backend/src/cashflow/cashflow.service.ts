import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ListTransactionsDto } from './dto/list-transactions.dto';
import { Transaction, TransactionType } from './entities/transaction.entity';
import { v4 as uuidv4 } from 'uuid'; // gerar UUIDs reais

@Injectable()
export class CashflowService {
  private transactions: Transaction[] = [];

  async createTransaction(transactionDto: CreateTransactionDto): Promise<Transaction> {
    const lastTransaction = this.transactions[this.transactions.length - 1];
    const previousBalance = lastTransaction ? lastTransaction.balanceAfter : 0;

    const newBalance =
      transactionDto.type === TransactionType.CREDIT
        ? previousBalance + transactionDto.amount
        : previousBalance - transactionDto.amount;

    const now = new Date();

    const newTransaction: Transaction = {
      id: uuidv4(),
      type: transactionDto.type,
      amount: transactionDto.amount,
      description: transactionDto.description,
      balanceAfter: newBalance,
      createdAt: now,
      date: now,
    };

    this.transactions.push(newTransaction);
    console.log('Nova transação criada:', newTransaction);

    return newTransaction;
  }

  async listTransactions(filters: ListTransactionsDto): Promise<Transaction[]> {
    const {id, type, search, page = 1, limit = 10, sortBy, order } = filters;

    let results = [...this.transactions];

    if (type) results = results.filter(t => t.type === type);
    
    if (id) {
    results = results.filter(t => t.id === id);
  }
    if (search)
      results = results.filter(t =>
        t.description.toLowerCase().includes(search.toLowerCase()),
      );

    if (sortBy) {
      results.sort((a, b) => {
        const dir = order === 'desc' ? -1 : 1;
        if (a[sortBy] < b[sortBy]) return -1 * dir;
        if (a[sortBy] > b[sortBy]) return 1 * dir;
        return 0;
      });
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    return results.slice(start, end);
  }

  getCurrentBalance(): number {
    return this.transactions.reduce(
      (acc, t) => (t.type === TransactionType.CREDIT ? acc + t.amount : acc - t.amount),
      0,
    );
  }
  
  // NOVO: deletar transação pelo ID
  deleteTransaction(id: string): boolean {
    const index = this.transactions.findIndex(t => t.id === id);
    if (index === -1) return false;

    this.transactions.splice(index, 1);
    return true;
  }

  //SUMÁRIO GERAL DAS TRANSAÇÕES
  getSummary() {
    const totalTransactions = this.transactions.length;
    const totalCredits = this.transactions
      .filter(t => t.type === TransactionType.CREDIT)
      .reduce((sum, t) => sum + t.amount, 0);
  
    const totalDebits = this.transactions
      .filter(t => t.type === TransactionType.DEBIT)
      .reduce((sum, t) => sum + t.amount, 0);
  
    const currentBalance = totalCredits - totalDebits;
  
    return {
      totalTransactions,
      totalCredits,
      totalDebits,
      currentBalance,
    };
  }
  
}

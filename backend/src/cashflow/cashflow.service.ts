import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ListTransactionsDto } from './dto/list-transactions.dto';
import { SummaryDto } from './dto/summary.dto';
import { Transaction, TransactionType } from './entities/transaction.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CashflowService {
  private transactions: Transaction[] = [];

  // Criar nova transação
  createTransaction(createTransactionDto: CreateTransactionDto): Transaction {
    const lastTransaction = this.transactions[this.transactions.length - 1];
    const previousBalance = lastTransaction ? lastTransaction.balanceAfter : 0;

    const newBalance =
      createTransactionDto.type === TransactionType.CREDIT
        ? previousBalance + createTransactionDto.amount
        : previousBalance - createTransactionDto.amount;

    const now = new Date();

    const newTransaction: Transaction = {
      id: uuidv4(),
      type: createTransactionDto.type,
      amount: createTransactionDto.amount,
      description: createTransactionDto.description,
      balanceAfter: newBalance,
      createdAt: now,
      date: now,
    };

    this.transactions.push(newTransaction);
    console.log('Nova transação criada:', newTransaction);
    return newTransaction;
  }

  // Listar transações com filtros
  listTransactions(filters: ListTransactionsDto): Transaction[] {
  const { id, type, search, page = 1, limit = 10, sortBy, order } = filters;

  let results = [...this.transactions];

  if (id) {
    results = results.filter(t => t.id === id);
  }

  if (type) {
    results = results.filter(t => t.type === type);
  }

  if (search) {
    results = results.filter(t =>
      t.description.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (sortBy) {
    const dir = order === 'desc' ? -1 : 1;
    results.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1 * dir;
      if (a[sortBy] > b[sortBy]) return 1 * dir;
      return 0;
    });
  }

  const start = (page - 1) * limit;
  const end = start + limit;

  return results.slice(start, end);
}


  // Deletar transação
  deleteTransaction(id: string): boolean {
    const index = this.transactions.findIndex(t => t.id === id);
    if (index === -1) return false;

    this.transactions.splice(index, 1);
    console.log(`Transação ${id} deletada.`);
    return true;
  }

  // Obter saldo atual
  getCurrentBalance(): number {
    return this.transactions.reduce(
      (acc, t) => (t.type === TransactionType.CREDIT ? acc + t.amount : acc - t.amount),
      0,
    );
  }

  // Resumo (entradas, saídas e saldo)
  getSummary(): any {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const calcTotals = (transactions: Transaction[]) => {
      const incomes = transactions
        .filter(t => t.type === TransactionType.CREDIT)
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = transactions
        .filter(t => t.type === TransactionType.DEBIT)
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        incomes,
        expenses,
        balance: incomes - expenses,
      };
    };

    const total = calcTotals(this.transactions);

    const monthly = calcTotals(
      this.transactions.filter(
        t =>
          t.date.getMonth() === currentMonth &&
          t.date.getFullYear() === currentYear,
      ),
    );

    const yearly = calcTotals(
      this.transactions.filter(t => t.date.getFullYear() === currentYear),
    );

    return {
      total,
      monthly,
      yearly,
    };
  }
}

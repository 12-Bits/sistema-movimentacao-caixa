// Este é o único local onde definimos os tipos de transação

// 1. A Entidade Transação (como vista pelo Frontend)
// Note que 'id' é string (para o UUID) e 'date' é string (para o ISO)
export interface Transaction {
  id: string; 
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  date: string;
  balanceAfter: number; // Corrigindo para camelCase (balanceAfter)
  createdAt: string; // Assumindo que o TypeORM envia datas como strings ISO
}

// 2. Os Parâmetros de Filtro (DTO)
// Note que 'type' é restrito, não uma string genérica.
export interface ListTransactionsParams {
  type?: 'CREDIT' | 'DEBIT'; 
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface SummaryDto { 
  incomes: number;
  expenses: number;
  balance: number;
}
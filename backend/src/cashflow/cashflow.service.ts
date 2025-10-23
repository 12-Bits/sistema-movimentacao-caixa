import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto'; 
import { SummaryDto } from './dto/summary.dto';
import { ListTransactionsDto } from './dto/list-transactions.dto';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; // 🚨 ESTA LINHA ESTAVA FALTANDO OU INCOMPLETA 🚨



@Injectable()
export class CashflowService {

constructor(
    @InjectRepository(Transaction)
    // 🚨 ADICIONE 'private' AQUI 🚨
    private transactionRepository: Repository<Transaction>, 
  ) {}

  // Método chamado por POST /cashflow/transaction
  async createTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
      console.log('Iniciando criação da transação no DB:', createTransactionDto);
      
      // 1. Cria a entidade no contexto do repositório
      const newTransaction = this.transactionRepository.create(createTransactionDto);
      
      // 2. 🚨 PERSISTE NO BANCO DE DADOS 🚨
      const savedTransaction = await this.transactionRepository.save(newTransaction);
      
      return savedTransaction; // Retorna o objeto salvo (com ID gerado)
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
  
  // backend/src/cashflow/cashflow.service.ts (Versão Corrigida)

async listTransactions(query: ListTransactionsDto): Promise<Transaction[]> {
    const { page, limit, sortBy, order, type, search } = query;
    const take = limit ?? 10;
    const currentPage = page ?? 1;
    const skip = (currentPage - 1) * take;

    const queryBuilder = this.transactionRepository.createQueryBuilder('transaction');

    // ✅ FILTRO DE TIPO CORRETO: Ignora o valor 'undefined' vindo da query string
    if (type && String(type).toLowerCase() !== 'undefined') {
        queryBuilder.andWhere('transaction.type = :type', { type });
    }
    
    // ✅ FILTRO DE BUSCA
    if (search) {
        queryBuilder.andWhere('LOWER(transaction.description) LIKE LOWER(:search)', { search: `%${search}%` });
    }

    // ✅ AJUSTE DE ORDENAÇÃO
    const orderColumn = sortBy && sortBy !== 'undefined' ? sortBy : 'date'; 
    const orderDirection = (order && order.toUpperCase() === 'DESC') ? 'DESC' : 'ASC';

    queryBuilder
        .take(take)
        .skip(skip)
        .orderBy(`transaction.${orderColumn}`, orderDirection as 'ASC' | 'DESC'); 
        // Usamos orderColumn e orderDirection garantidos.

    // 🚨 MANTENHA A EXECUÇÃO APENAS AQUI 🚨
try {
        // Esta é a linha que estava na linha 87 do seu log anterior
        const [transactions, total] = await queryBuilder.getManyAndCount();
        
        return transactions; 
    } catch (e) {
        // Continua logando o erro no servidor para debug
        console.error("Erro na consulta do DB:", e); 
        throw e; 
    }
}

    // 🚨 NOVO MÉTODO 2: Deletar Transação por ID 🚨
    async deleteTransaction(id: string): Promise<boolean> {
      // O TypeORM normalmente usa IDs como números, então converta a string
      const idNumber = parseInt(id, 10); 
      
      // Tenta deletar a transação
      const result = await this.transactionRepository.delete(idNumber);
      
      // Verifica se alguma linha foi afetada
      if (result.affected === 0) {
          return false; // Transação não encontrada
      }
      
      return true; // Transação deletada
    }

}

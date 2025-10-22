import { ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionType } from '../entities/transaction.entity';

export class ListTransactionsDto {
  @ApiPropertyOptional({ enum: TransactionType, description: 'Filtrar por tipo (CREDIT ou DEBIT)' })
  type?: TransactionType;

  @ApiPropertyOptional({ description: 'ID da transação para buscar' })
  id?: string;

  @ApiPropertyOptional({ description: 'Buscar por texto na descrição' })
  search?: string;

  @ApiPropertyOptional({ description: 'Página atual (para paginação)', default: 1 })
  page?: number;

  @ApiPropertyOptional({ description: 'Quantidade de itens por página', default: 10 })
  limit?: number;

  @ApiPropertyOptional({ description: 'Campo para ordenação (ex: date, amount)' })
  sortBy?: string;

  @ApiPropertyOptional({ description: 'Ordem da ordenação (asc ou desc)', default: 'asc' })
  order?: 'asc' | 'desc';
}

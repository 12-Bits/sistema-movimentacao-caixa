import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../entities/transaction.entity'; 

export class CreateTransactionDto {
  
  @ApiProperty({ enum: TransactionType,  example: 'CREDIT', description: 'Tipo: CREDIT ou DEBIT' })
  type: TransactionType; 

  @ApiProperty({ example: 100.50, description: 'Valor da transação' })
  amount: number;

  @ApiProperty({ example: 'Compra de suprimentos', description: 'Descrição da transação' })
  description: string;
  
  @ApiProperty({ example: '2025-11-13T10:00:00.000Z', description: 'Data/Hora da transação (ISO 8601)' })
  date: string;
}

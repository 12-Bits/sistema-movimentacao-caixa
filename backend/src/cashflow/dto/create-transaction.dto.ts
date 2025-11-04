import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../entities/transaction.entity'; 

export class CreateTransactionDto {
  @ApiProperty({ example: 100.50, description: 'Valor da transação' })
  amount: number;

  @ApiProperty({ enum: TransactionType, description: 'Tipo: CREDIT ou DEBIT' })
  type: TransactionType; 

  @ApiProperty({ example: 'Compra de suprimentos', description: 'Descrição da transação' })
  description: string;
}

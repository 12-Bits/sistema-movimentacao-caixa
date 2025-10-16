// backend/src/cashflow/dto/create-transaction.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ example: 100.50, description: 'Valor da transação' })
  amount: number;

  @ApiProperty({ example: 'CREDIT', description: 'Tipo: CREDIT ou DEBIT' })
  type: 'CREDIT' | 'DEBIT';

  @ApiProperty({ example: 'Compra de suprimentos', description: 'Descrição da transação' })
  description: string;
}
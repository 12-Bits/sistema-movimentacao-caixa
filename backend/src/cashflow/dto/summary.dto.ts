import { ApiProperty } from '@nestjs/swagger';

export class SummaryDto {
  @ApiProperty({ example: 1500.00, description: 'Soma total de todas as transações de crédito (entradas).' })
  incomes: number;

  @ApiProperty({ example: 500.00, description: 'Soma total de todas as transações de débito (saídas).' })
  expenses: number;

  @ApiProperty({ example: 1000.00, description: 'Saldo líquido: Incomes - Expenses.' })
  balance: number;
}
import { IsEnum, IsNumber, IsString, IsPositive } from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

// Usamos DTOs e 'class-validator' para garantir que os dados recebidos sejam válidos.
export class CreateTransactionDto {
  
  @IsEnum(TransactionType)
  type: TransactionType; // Deve ser 'CREDIT' ou 'DEBIT'

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number; // O valor da movimentação

  @IsString()
  description: string; // Descrição da movimentação
}
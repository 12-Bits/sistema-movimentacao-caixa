// backend/src/cashflow/entities/transaction.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

// Crie um Enum para o tipo de movimentação
export enum TransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

@Entity('transactions') // Nome da tabela no banco de dados
export class Transaction {
  @PrimaryGeneratedColumn('uuid') // ID principal (UUID)
  id: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType; // CREDIT ou DEBIT

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Tipo Decimal para valores monetários
  amount: number;

  @Column()
  description: string;

  @Column({ 
    type: 'decimal', 
    precision: 10, 
    scale: 2, 
    name: 'balance_after' 
  })
  balanceAfter: number; // Saldo após a transação (para auditoria)

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  
  // Opcional: Você pode adicionar uma relação @ManyToOne com a entidade Account (se criada)
  // @ManyToOne(() => Account, account => account.transactions)
  // account: Account; 
}
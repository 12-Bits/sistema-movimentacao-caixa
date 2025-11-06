import React from 'react';
import type { Transaction } from '../../types/cashflow.types';
// 1. Defina a tipagem da transação (idealmente, importe de um arquivo de tipos)


// 2. Defina as props que o App.tsx está passando
interface TransactionsTableProps {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  onTransactionDeleted: () => void;
}

// Helpers (mova para um arquivo utils se preferir)
const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
const formatDate = (date: string) => new Date(date).toLocaleDateString('pt-BR');

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ 
  transactions, 
  isLoading, 
  error, 
  onTransactionDeleted 
}) => {

  // Função para chamar o endpoint DELETE (Correto)
  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta transação?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/cashflow/transaction/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        if (response.status === 404) throw new Error('Transação não encontrada.');
        throw new Error('Falha ao excluir transação.');
      }
      
      // Sucesso: avisa o App.tsx para recarregar
      onTransactionDeleted(); 

    } catch (err) {
      alert(String(err)); // Use String(err) para segurança de tipo
    }
  };


  if (isLoading) {
    return <div className="loading-message">Carregando transações...</div>;
  }
  
  if (error) {
    return <div className="error-message">Falha ao carregar transações: {error}</div>;
  }

  return (
    <div className="transactions-container">
      <h2>Lista de Transações</h2>
      
      {/* 🚨 OS FILTROS E PAGINAÇÃO (que causaram os erros) 
           FORAM REMOVIDOS DESTE COMPONENTE. 
           Eles devem ficar no App.tsx ou em um componente irmão.
      */}

      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id} className={t.type.toLowerCase()}>
              <td>{formatDate(t.date)}</td>
              <td>{t.description}</td>
              <td>{t.type === 'CREDIT' ? 'Entrada' : 'Saída'}</td>
              <td className={t.type === 'CREDIT' ? 'amount-credit' : 'amount-debit'}>
                {formatCurrency(t.amount)}
              </td>
              <td>
                <button 
                  className="delete-button" 
                  onClick={() => handleDelete(t.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
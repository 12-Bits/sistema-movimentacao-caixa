import React from 'react';
import { useTransactions } from '..//hooks/useTransactions';
// import './TransactionsTable.css'; // Opcional: Arquivo de estilo

// Helper para formatar moeda e data
const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
const formatDate = (date: string) => new Date(date).toLocaleDateString('pt-BR');

export const TransactionsTable: React.FC = () => {
  const { transactions, isLoading, error, params, updateParams } = useTransactions();
  const currentPage = params.page ?? 1;
  if (isLoading) {
    return <div className="loading-message">Carregando transações...</div>;
  }
  
  if (error) {
    return <div className="error-message">Falha ao carregar transações: {error}</div>;
  }

  // Função para simular a mudança de página (usando os parâmetros do DTO)
  const handlePageChange = (newPage: number) => {
    updateParams({ page: newPage });
  };
  
  // Função para simular a mudança de filtro (usando o DTO 'type')
  const handleFilterType = (type: 'CREDIT' | 'DEBIT' | undefined) => {
    updateParams({ type: type, page: 1 }); // Volta para a primeira página ao filtrar
  };


  return (
    <div className="transactions-container">
      <h2>Lista de Transações</h2>
      
      {/* 🚨 Área de Filtros (Simples) 🚨 */}
      <div className="filters">
        <button onClick={() => handleFilterType(undefined)}>Todas</button>
        <button onClick={() => handleFilterType('CREDIT')}>Entradas</button>
        <button onClick={() => handleFilterType('DEBIT')}>Saídas</button>
        {/* Você pode adicionar aqui um input para o filtro 'search' */}
      </div>

      {/* 🚨 Tabela de Dados 🚨 */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id} className={t.type.toLowerCase()}>
              <td>{t.id}</td>
              <td>{formatDate(t.date)}</td>
              <td>{t.description}</td>
              <td>{t.type === 'CREDIT' ? 'Entrada' : 'Saída'}</td>
              <td className={t.type === 'CREDIT' ? 'amount-credit' : 'amount-debit'}>
                {formatCurrency(t.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🚨 Paginação (Simples) 🚨 */}
      <div className="pagination">
          <button 
              // Usa o valor garantido (currentPage)
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage <= 1}
          >
              Anterior
          </button>
          <span>Página {currentPage}</span>
          <button 
              // Usa o valor garantido (currentPage)
              onClick={() => handlePageChange(currentPage + 1)}
          >
              Próxima
          </button>
      </div>
    </div>
  );
};


import React from 'react';
import { useSummary } from '../../hooks/useSummary';
//import './SummaryCards.css'; // Crie este arquivo CSS para estilizar os cards

// Helper para formatação de moeda
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const SummaryCards: React.FC = () => {
  const { summary, isLoading, error } = useSummary();

  if (isLoading) {
    return <div className="summary-container">Carregando Resumo...</div>;
  }
  
  if (error) {
    return <div className="summary-container error">Erro ao carregar resumo.</div>;
  }
  
  return (
    <div className="summary-container">
      {/* 1. Cartão de Entradas (Receitas) */}
      <div className="summary-card income">
        <h3 className="card-title">Entradas</h3>
        <p className="card-amount positive">
          {formatCurrency(summary.incomes)}
        </p>
      </div>

      {/* 2. Cartão de Saídas (Despesas) */}
      <div className="summary-card expense">
        <h3 className="card-title">Saídas</h3>
        <p className="card-amount negative">
          {formatCurrency(summary.expenses)}
        </p>
      </div>

      {/* 3. Cartão de Saldo Total */}
      <div className={`summary-card total ${summary.balance >= 0 ? 'positive-bg' : 'negative-bg'}`}>
        <h3 className="card-title">Saldo Total</h3>
        <p className="card-amount">
          {formatCurrency(summary.balance)}
        </p>
      </div>
    </div>
  );
};
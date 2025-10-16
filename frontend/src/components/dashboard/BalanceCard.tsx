// frontend/src/components/BalanceCard.tsx

import React from 'react';
import { useBalance } from '../../hooks/useBalance';

// Função para formatar o número como moeda (BRL)
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const BalanceCard: React.FC = () => {
  // 1. CHAMA o Hook para obter os dados e o status
  const { balance, isLoading, error } = useBalance();

  // 2. CONDIÇÃO de Carregamento
  if (isLoading) {
    return <div className="balance-card">Carregando Saldo...</div>;
  }
  
  // 3. CONDIÇÃO de Erro
  if (error) {
    return <div className="balance-card error">Erro ao carregar: {error}</div>;
  }
  
  // 4. RENDERIZAÇÃO dos Dados (TSX)
  return (
    <div className="balance-card">
      <h3 className="title">Saldo Atual</h3>
      {/* Exibe o saldo formatado */}
      <p className={`amount ${balance < 0 ? 'negative' : 'positive'}`}>
        {formatCurrency(balance)} 
      </p>
    </div>
  );
};
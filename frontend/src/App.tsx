import React from 'react';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { TransactionsTable } from './components/transactions/TransactionTable';
import { TransactionForm } from './components/transactions/TransactionForm'; 
import { TransactionFilters } from './components/transactions/TransactionFilters';
import { BalanceCard } from './components/dashboard/BalanceCard';
import { useTransactions } from './hooks/useTransactions';
import { CashflowBarChart } from './components/CashflowBarChart';


const monthlyData = [
  { label: 'Setembro', income: 4500, expense: 5200 },
  { label: 'Outubro', income: 5200, expense: 3100 },
  { label: 'Novembro', income: 4800, expense: 2500 },
  { label: 'Dezembro', income: 7800, expense: 3500 },
];

function App() {
  // O App agora gerencia o estado das transações
  const { 
    transactions, 
    isLoading, 
    error, 
    fetchTransactions,
    params,         // 👈 2. Obtenha params
    updateParams
  } = useTransactions();

  // Função que será chamada após um POST ou DELETE
  const handleDataUpdate = () => {
    fetchTransactions();
    // Você também precisará recarregar o SummaryCards (talvez modificando o useSummary da mesma forma)
  };

  return (
    <div className="app-container">
      <h1>Dashboard de Fluxo de Caixa</h1>
      <SummaryCards />
      
      {/* 1. Formulário para Adicionar */}
      <TransactionForm onTransactionAdded={handleDataUpdate} />

      <TransactionFilters 
        params={params} 
        updateParams={updateParams} 
      />

      {/* 2. Tabela para Listar e Excluir */}
      <TransactionsTable 
        transactions={transactions} // Passamos os dados
        isLoading={isLoading}
        error={error}
        onTransactionDeleted={handleDataUpdate} // Passamos a função de recarregar
      />
      <BalanceCard />
      <div className="chart-container" style={{ marginTop: '40px' }}>
        <h2>Resumo Mensal</h2>
        <CashflowBarChart data={monthlyData} />
      </div>
    </div>
  );
}

export default App;
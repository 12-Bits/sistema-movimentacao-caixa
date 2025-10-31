//import React from 'react';
import { BalanceCard } from './components/dashboard/BalanceCard';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { TransactionsTable } from './components/TransactionTable';
import './App.css';
import React from 'react';
import { CashflowBarChart } from './components/CashflowBarChart'; // 👈 Importe o novo componente

// Dados de exemplo para o gráfico. No futuro, isso virá da sua API.
const monthlyData = [
  { label: 'Setembro', income: 4500, expense: 2200 },
  { label: 'Outubro', income: 5200, expense: 3100 },
  { label: 'Novembro', income: 4800, expense: 2500 },
  { label: 'Dezembro', income: 7800, expense: 3500 },
];

function App() {
  return (
    <div className="app-container">
      <h1>Dashboard de Fluxo de Caixa</h1>
      <SummaryCards />
      
      {/* 👇 Adicione o componente do gráfico aqui */}
      <div className="chart-container" style={{ marginTop: '40px' }}>
        <h2>Resumo Mensal</h2>
        <CashflowBarChart data={monthlyData} />
      </div>

      <TransactionsTable />
      <BalanceCard />
    </div>
  );
}

export default App;

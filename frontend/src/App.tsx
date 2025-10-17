// frontend/src/App.tsx (ou sua página principal)

import React from 'react';
import { BalanceCard } from './components/dashboard/BalanceCard';
import { SummaryCards } from './components/dashboard/SummaryCards';
import './App.css';
// ... outros imports

function App() {
  return (
    <div className="container">
      <h1>Dashboard de Fluxo de Caixa</h1>
      
      {/* 🚨 O dado do banco de dados aparece aqui! */}
      <BalanceCard /> 
      <SummaryCards />
      {/* ... Outros componentes (Formulário, Tabela) */}
    </div>
  );
}

export default App;
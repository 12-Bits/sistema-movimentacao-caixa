import React, { useState } from 'react';

// Helper para obter a data atual no formato YYYY-MM-DD para o input
const getTodayDate = () => {
    const today = new Date();
    // Garante o formato AAAA-MM-DD
    return today.toISOString().split('T')[0]; 
};


interface TransactionFormProps {
  onTransactionAdded: () => void;
}

// 🟢 CORREÇÃO 1: Adicionar 'date' ao FormState
type FormState = {
  type: 'CREDIT' | 'DEBIT';
  amount: string; 
  description: string;
  date: string; // <-- O CAMPO DATA ESTÁ AQUI
};

const initialState: FormState = {
  type: 'CREDIT',
  amount: '',
  description: '',
  date: getTodayDate(), // <-- Inicializa com a data de hoje
};

export const TransactionForm: React.FC<TransactionFormProps> = ({ onTransactionAdded }) => {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Verificação simplificada
    if (!formData.amount) {
      setError('Por favor, preencha o valor.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/cashflow/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: formData.type,
          amount: parseFloat(formData.amount),
          description: formData.description,
          // 🟢 CORREÇÃO 2: Enviar o campo date na requisição
          date: formData.date, 
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao criar transação.');
      }

      setFormData(initialState);
      onTransactionAdded(); 

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };

  return (
    <div className="transaction-form-container">
      <h3>Adicionar Nova Transação</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo:</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="CREDIT">Crédito (Entrada)</option>
            <option value="DEBIT">Débito (Saída)</option>
          </select>
        </div>
        <div>
          <label>Valor (R$):</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
          />
        </div>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ex: Pagamento de fornecedor"
          />
        </div>
        
        {/* 🟢 CORREÇÃO 3: Adicionar o campo de input para a data */}
        <div>
          <label>Data:</label>
          <input
            type="date" // O tipo 'date' do HTML espera o formato YYYY-MM-DD
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Adicionar</button>
      </form>

      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
    </div>
  );
};
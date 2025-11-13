import React, { useState } from 'react';

// Prop para notificar o App.tsx que uma transação foi adicionada
interface TransactionFormProps {
  onTransactionAdded: () => void;
}


const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; 
};

type FormState = {
  type: 'CREDIT' | 'DEBIT';
  amount: string; 
  description: string;
  date: string;
};

const initialState: FormState = {
  type: 'CREDIT',
  amount: '',
  description: '',
  date: getTodayDate(), 
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

    if (!formData.amount || !formData.description) {
      setError('Por favor, preencha o valor e a descrição.');
      return;
    }

try {
      const response = await fetch('http://localhost:3000/cashflow/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: formData.type,
          amount: parseFloat(formData.amount), 
          date: new Date(formData.date).toISOString(), 
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao criar transação.');
      }

      // Limpa o formulário e avisa o App.tsx para recarregar a lista
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
        <div>
          <label>Data da Transação:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Adicionar</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};
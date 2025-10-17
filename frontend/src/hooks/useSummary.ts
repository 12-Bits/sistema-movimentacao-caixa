import { useState, useEffect } from 'react';

// Tipagem do DTO (deve ser o mesmo que o Backend envia)
interface SummaryData {
  incomes: number;
  expenses: number;
  balance: number;
}

const initialSummary: SummaryData = { incomes: 0, expenses: 0, balance: 0 };

export const useSummary = () => {
  const [summary, setSummary] = useState<SummaryData>(initialSummary);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // A URL da nova rota
  const API_URL = 'http://localhost:3000/cashflow/summary';

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data: SummaryData = await response.json(); 
        setSummary(data);
      } catch (err) {
        console.error("Falha ao buscar resumo:", err);
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("Um erro desconhecido ocorreu ao buscar o resumo.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return { summary, isLoading, error };
};
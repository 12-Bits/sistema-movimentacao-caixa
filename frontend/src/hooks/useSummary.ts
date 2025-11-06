import { useState, useEffect } from 'react';

// Tipagem do DTO (deve ser o mesmo que o Backend envia)
interface SummaryDto {
  incomes: number;
  expenses: number;
  balance: number;
}

const initialSummary: SummaryDto = { incomes: 0, expenses: 0, balance: 0 };

export const useSummary = () => {
  const [summary, setSummary] = useState<SummaryDto>(initialSummary);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // A URL da nova rota
  const API_URL = 'http://localhost:3000/cashflow/summary';

  useEffect(() => {
    const fetchSummary = async () => {
setIsLoading(true); // Garante que o carregamento começa
    try {
        const response = await fetch(API_URL);

        // 🚨 1. CORREÇÃO ESSENCIAL: Tratar 304 🚨
        if (response.status === 304) {
            // Se 304, o navegador usou o cache, o estado atual é válido, apenas finalize o loading.
            setIsLoading(false);
            return; // Sai da função sem tentar ler o JSON
        }
        
        // 2. Tratar outros erros HTTP (4xx, 5xx)
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        // 3. Processar o JSON (Apenas se não for 304 ou erro)
        const data: SummaryDto = await response.json();
        setSummary(data);
        setError(null);

    } catch (err) {
        // Se response.json() falhou (por qualquer motivo, inclusive o 304 não capturado)
        setError(String(err)); 
    } finally {
        setIsLoading(false);
    }
    };

    fetchSummary();
  }, []);

  return { summary, isLoading, error };
};
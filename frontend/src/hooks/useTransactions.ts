import { useState, useEffect, useCallback } from 'react';

// 🚨 Tipagem do DTO (Adapte para o seu frontend) 🚨
interface ListTransactionsParams {
  type?: 'CREDIT' | 'DEBIT';
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

// Tipagem para a resposta da API (sua entidade Transaction)
interface Transaction {
  id: number;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  date: string;
}

// Resposta com paginação (Se sua API retornar assim)
interface PaginatedResponse {
  data: Transaction[];
  total: number;
  page: number;
  limit: number;
}


const API_BASE_URL = 'http://localhost:3000/cashflow/transactions';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [params, setParams] = useState<ListTransactionsParams>({ page: 1, limit: 10, order: 'desc' });
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    // Constrói a Query String a partir dos parâmetros do DTO
    const queryString = new URLSearchParams(params as any).toString();
    const url = `${API_BASE_URL}?${queryString}`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      // Assumindo que a API retorna um array simples por enquanto
      const data: Transaction[] = await response.json(); 
      
      // Se sua API retornar PaginatedResponse:
      // const data: PaginatedResponse = await response.json(); 
      // setTransactions(data.data);
      // setTotal(data.total); 
      
      setTransactions(data);
      
    } catch (err) {
      console.error("Falha ao buscar transações:", err);
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  }, [params]); // Refaz a busca sempre que os parâmetros (filtros) mudam

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Função para mudar a página ou aplicar novos filtros
  const updateParams = (newParams: Partial<ListTransactionsParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return { transactions, isLoading, error, total, params, updateParams };
};
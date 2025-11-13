import { useState, useEffect, useCallback } from 'react';
import type { Transaction, ListTransactionsParams } from '../types/cashflow.types';

const API_BASE_URL = 'http://localhost:3000/cashflow/transactions';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [params, setParams] = useState<ListTransactionsParams>({ page: 1, limit: 10, order: 'desc' });
  const [total, /*setTotal*/] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    // --- INÍCIO DA CORREÇÃO ---
    
    // 1. Cria uma cópia do objeto params
    const cleanParams = { ...params };

    // 2. Itera sobre as chaves do objeto para remover valores inválidos
    Object.keys(cleanParams).forEach((key) => {
      // Asserção de tipo para o TypeScript aceitar a chave
      const prop = key as keyof typeof cleanParams;

      // Verifica se é undefined, null ou string vazia
      if (cleanParams[prop] === undefined || cleanParams[prop] === null || cleanParams[prop] === '') {
        delete cleanParams[prop];
      }
    });

    // 3. Constrói a Query String USANDO O cleanParams (não o params original)
    const queryString = new URLSearchParams(cleanParams as any).toString();
    const url = `${API_BASE_URL}?${queryString}`;

    // --- FIM DA CORREÇÃO ---

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data: Transaction[] = await response.json(); 
      
      setTransactions(data);
      
    } catch (err) {
      console.error("Falha ao buscar transações:", err);
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  }, [params]); 

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const updateParams = (newParams: Partial<ListTransactionsParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return { transactions, isLoading, error, total, params, updateParams, fetchTransactions };
};
import { useState, useEffect } from 'react';
// Defina o tipo de dado que você espera, ex: um número formatado
type Balance = number; 

export const useBalance = () => {
  const [balance, setBalance] = useState<Balance>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // URL da sua API no NestJS
  const API_URL = 'http://localhost:3000/cashflow/balance';

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        // O Backend deve retornar o saldo como um número JSON
        const data: number = await response.json(); 
        
        setBalance(data);
      } catch (err) {
        console.error("Falha ao buscar saldo:", err);
        if (err instanceof Error) {
          setError(err.message); // Armazena a mensagem de erro
        } else {
          setError(String(err)); // Fallback para outros tipos
        }
        setBalance(0); // Garante que o saldo não é null em caso de falha
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, []); // O array vazio garante que o fetch roda apenas uma vez

  return { balance, isLoading, error };
};
import React, { useState, useEffect } from 'react';
import type { ListTransactionsParams } from '../../types/cashflow.types';

// 1. Defina a tipagem dos filtros que este componente espera
// (Idealmente, importe esta interface de um arquivo de tipos compartilhado)


// 2. Defina as props que o componente receberá do App.tsx
interface TransactionFiltersProps {
  params: ListTransactionsParams;
  updateParams: (newParams: Partial<ListTransactionsParams>) => void;
  // Opcional: passe o 'total' de itens para desabilitar a paginação
  // totalItems: number; 
}

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({ params, updateParams }) => {
  
  // 3. Estado local para o campo de busca (para evitar chamadas de API a cada tecla)
  const [localSearch, setLocalSearch] = useState(params.search || '');

  // Atualiza o estado local se o 'params.search' mudar externamente
  useEffect(() => {
    setLocalSearch(params.search || '');
  }, [params.search]);


  // 4. Handlers (Manipuladores de eventos)

  // Filtro de Tipo (CREDIT/DEBIT/ALL)
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    updateParams({ 
      // Se 'ALL', defina como undefined para remover o filtro
      type: newType === 'ALL' ? undefined : (newType as 'CREDIT' | 'DEBIT'), 
      page: 1 // Sempre reseta para a página 1 ao mudar filtros
    });
  };

  // Busca por Texto (Controlado)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  // Submissão da Busca
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ search: localSearch, page: 1 });
  };

  // Ordenação
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, order] = e.target.value.split(',');
    updateParams({ sortBy, order: order as 'asc' | 'desc', page: 1 });
  };

  // Paginação
  const currentPage = params.page ?? 1;
  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return; // Não permite página < 1
    updateParams({ page: newPage });
  };


  // 5. Renderização (JSX)
  return (
    <div className="filters-container" style={{ margin: '20px 0' }}>
      <h4>Filtros e Ordenação</h4>
      
      {/* Filtro de Tipo */}
      <label>Tipo: </label>
      <select 
        value={params.type || 'ALL'} 
        onChange={handleTypeChange}
      >
        <option value="ALL">Todas</option>
        <option value="CREDIT">Entradas</option>
        <option value="DEBIT">Saídas</option>
      </select>

      {/* Filtro de Busca (Search) */}
      <form onSubmit={handleSearchSubmit} style={{ display: 'inline-block', marginLeft: '10px' }}>
        <input 
          type="text" 
          value={localSearch} 
          onChange={handleSearchChange}
          placeholder="Buscar por descrição..."
        />
        <button type="submit">Buscar</button>
      </form>

      {/* Filtro de Ordenação (SortBy/Order) */}
      <label style={{ marginLeft: '10px' }}>Ordenar por: </label>
      <select 
        value={`${params.sortBy || 'date'},${params.order || 'desc'}`}
        onChange={handleSortChange}
      >
        <option value="date,desc">Data (Mais Recente)</option>
        <option value="date,asc">Data (Mais Antiga)</option>
        <option value="amount,desc">Valor (Maior)</option>
        <option value="amount,asc">Valor (Menor)</option>
      </select>

      {/* Paginação */}
      <div className="pagination" style={{ marginTop: '10px' }}>
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage <= 1}
        >
          Anterior
        </button>
        <span style={{ margin: '0 10px' }}>Página {currentPage}</span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          // (Para desabilitar 'Próxima', você precisaria do 'totalItems' e 'limit')
        >
          Próxima
        </button>
      </div>
    </div>
  );
};
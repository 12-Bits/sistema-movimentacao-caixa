import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// 1. Definimos a estrutura dos dados que o gráfico espera receber
interface ChartData {
  label: string; // Ex: 'Outubro', 'Semana 42'
  income: number;
  expense: number;
}

// 2. Definimos as props do nosso componente
interface CashflowBarChartProps {
  data: ChartData[];
  width?: number;
  height?: number;
}

export const CashflowBarChart: React.FC<CashflowBarChartProps> = ({
  data,
  width = 600,
  height = 400,
}) => {
  // 3. Usamos useRef para obter uma referência direta ao elemento SVG no DOM
  const svgRef = useRef<SVGSVGElement | null>(null);

  // 4. useEffect é onde toda a mágica do D3 acontece.
  // Ele será executado sempre que os dados ou as dimensões mudarem.
  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);

    // Limpa o SVG anterior para evitar sobreposição ao re-renderizar
    svg.selectAll('*').remove();

    // --- Configuração do Gráfico (Dimensões e Margens) ---
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // --- Escalas ---
    // Escala X: Mapeia os rótulos (ex: meses) para posições na horizontal
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, innerWidth])
      .padding(0.2);

    // Escala Y: Mapeia os valores (R$) para posições na vertical
    const maxValue = d3.max(data, (d) => Math.max(d.income, d.expense)) || 0;
    const yScale = d3.scaleLinear().domain([0, maxValue]).range([innerHeight, 0]);

    // --- Eixos ---
    const xAxis = d3.axisBottom(xScale);
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end');

    const yAxis = d3.axisLeft(yScale).ticks(5).tickFormat(d => `R$${d}`);
    g.append('g').call(yAxis);

    // --- Desenhando as Barras (Usando a lógica do D3 dentro do useEffect) ---
    // Barras de Receita (Income)
    g.selectAll('.bar-income')
      .data(data)
      .join('rect')
      .attr('class', 'bar-income')
      .attr('x', (d) => xScale(d.label)! + xScale.bandwidth() / 2) // Posição da barra de receita
      .attr('y', (d) => yScale(d.income))
      .attr('width', xScale.bandwidth() / 2)
      .attr('height', (d) => innerHeight - yScale(d.income))
      .attr('fill', '#4caf50'); // Verde

    // Barras de Despesa (Expense)
    g.selectAll('.bar-expense')
      .data(data)
      .join('rect')
      .attr('class', 'bar-expense')
      .attr('x', (d) => xScale(d.label)!) // Posição da barra de despesa
      .attr('y', (d) => yScale(d.expense))
      .attr('width', xScale.bandwidth() / 2)
      .attr('height', (d) => innerHeight - yScale(d.expense))
      .attr('fill', '#f44336'); // Vermelho

  }, [data, width, height]); // Dependências do useEffect

  // 5. O JSX retorna um elemento SVG simples. O D3 irá preenchê-lo.
  return <svg ref={svgRef} width={width} height={height}></svg>;
};
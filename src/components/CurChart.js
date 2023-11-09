import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Chart from 'chart.js/auto';

const CurChart = ({ currencyCode }) => {
  const [exchangeRates, setExchangeRates] = useState(null);
  const chartRef = useRef(null);
  const chartCanvasRef = useRef(null);

  useEffect(() => {
    const fetchExchangeRates = async (currencyCode) => {
      const apiKey = '5db851bd653360c071bbb624';
      const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currencyCode}`;

      try {
        const response = await axios.get(apiUrl);
        const responseData = response.data;

        const selectedCurrencies = ['USD', 'EUR', 'GBP', 'CHF'];
        const filteredExchangeRates = Object.fromEntries(
          Object.entries(responseData?.conversion_rates || {})
            .filter(([currency]) => selectedCurrencies.includes(currency))
        );

        setExchangeRates(filteredExchangeRates);
      } catch (error) {
        console.error("Error getting exchange rates:", error);
      }
    };

    if (currencyCode) {
      fetchExchangeRates(currencyCode);
    }
  }, [currencyCode]);

  useEffect(() => {
    if (exchangeRates && chartCanvasRef.current) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const currencies = ['USD', 'EUR', 'GBP', 'CHF'];
      const labels = currencies;
      const data = Object.values(exchangeRates);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: `How Much of ${currencyCode} can you buy with 1 of the following (Base Currency: ${currencyCode})`,
            data: data.map(rate => 1 / rate),
            backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722"],
          },
        ],
      };

      const chartOptions = {
        scales: {
          x: {
            type: 'category',
            labels: labels,
            position: 'bottom',
            title: {
              display: true,
              text: 'Currencies',
            },
          },
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Quantity',
            },
          },
        },
      };

      const ctx = chartCanvasRef.current.getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
      });
    }
  }, [exchangeRates, currencyCode]);

  return (
    exchangeRates && (
            <div>
      <h2>Currency Context Shower</h2>
      <canvas ref={chartCanvasRef} width="400" height="200"></canvas>
    </div>
    )

  );
};

export default CurChart;

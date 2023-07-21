<template>
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  export default {
    name: 'BarChart',
    props: ['forecastData'],
    computed: {
      chartData() {
        if (this.forecastData && this.forecastData.list) {
          const currentDate = new Date().getDate();
          const filteredData = this.forecastData.list.filter(item => {
            const date = new Date(item.dt_txt);
            return date.getDate() === currentDate;
          });
  
          const tableData = filteredData.map(item => Math.round(item.main.temp));
  
          return {
            labels: filteredData.map(item => this.formatTime(item.dt_txt)),
            datasets: [
              {
                label: 'Temperature',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: tableData,
              },
            ],
          };
        }
  
        return null;
      },
    },
    methods: {
      formatTime(timeString) {
        const date = new Date(timeString);
        return `${date.getHours()}:00`;
      },
    },
    components: { Bar },
    data() {
    return {
      chartOptions: {
        scales: {
          x: {
            display: true,
            grid: {
              display: false,
            },
          },
          y: {
            display: true,
            beginAtZero: true,
            grid: {
              display: true,
            },
          },
        },
      },
    };
  },
  };
  </script>

<style>
  #my-chart-id {
  border-radius: 10px;
  background-color: #191d34;
  color: white;
}

/* Tooltip Style */
.chartjs-tooltip {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  border: 1px solid #ccc;
  color: #333;
  padding: 6px 8px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
}

/* Hover Effect */
.chart-container .chart-bar:hover {
  background-color: lightyellow;
}
</style>
<script>
import { mapState, mapGetters } from 'vuex';
import BarChart from '../components/BarChart.vue';
import store from '../store/store';
import HumidityIcon from '../icons/HumadityIcon.vue';
import LoadingIcon from '../icons/Loading.vue';

export default {
  computed: {
    ...mapState(["city", "weatherData", "forecastData"]),
    ...mapGetters(["loading"]),

    forecastDays() {
      if (this.forecastData) {
        const uniqueDates = [...new Set(this.forecastData.list.map(item => this.formatDate(item.dt_txt)))];
        return uniqueDates.slice(0, 5);
      }
      return [];
    },
    forecastTableData() {
      if (this.forecastData) {
        const uniqueDates = [...new Set(this.forecastData.list.map(item => this.formatDate(item.dt_txt)))];
        const tableData = [];
        for (let i = 0; i < 5; i++) {
          const date = uniqueDates[i];
          const temperatures = this.forecastData.list
            .filter(item => this.formatDate(item.dt_txt) === date)
            .map(item => item.main.temp);
          const averageTemperature = Math.round(temperatures.reduce((total, temp) => total + temp, 0) / temperatures.length);

          const description = this.forecastData.list
            .filter(item => this.formatDate(item.dt_txt) === date)
            .map(item => item.weather[0].main);
            
          tableData.push({
            description: description[0], 
            averageTemperature: averageTemperature.toFixed(2)
          });
        }
        return tableData;
      }
      return [];
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.getDate()} ${date.toLocaleString("default", { month: "long" })}`;
    },
    chunkArray(array, size) {
      const chunkedArray = [];
      for (let i = 0; i < array.length; i += size) {
          chunkedArray.push(array.slice(i, i + size));
      }
      return chunkedArray;
    },
    addToFavorites() {
      store.commit('addToFavorites');
    }
  },
  components: 
  { BarChart, HumidityIcon, LoadingIcon },
};
</script>

<template>
  <div class="container-page">
    <div class="row-style">
      <h1 class="model-main-text" v-if="weatherData && !loading">{{ weatherData.name }}, {{ weatherData.sys.country }}</h1>
    </div>

    <div class="row-style element-end">
      <div class="model-element-day" v-if="weatherData && !loading">
          <h2>Current Weather:</h2>
          <div class="temp-text">{{ Math.round(weatherData.main.temp) }}°C</div>
          <p class="position-align-center"> <HumidityIcon />Humidity: {{ weatherData.main.humidity }}</p>
          <p class="text-center">{{ weatherData.weather[0].main }}</p>
      </div>

      <div class="model-element-week component-fill " v-if="forecastData && !loading">
        <h2>Weather in 5 days:</h2>
        <span class="button-pos"><button @click="addToFavorites">Add to favorites</button></span>
        <table class="model-table">
          <thead>
            <tr>
              <th v-for="(day, index) in forecastDays" :key="index">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="(temperature, index) in forecastTableData" :key="index">
                <div>{{ temperature.averageTemperature }}°C</div>
                <div>{{ temperature.description }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="model-chart">
      <BarChart v-if="forecastData && !loading" :forecastData="forecastData"/>
    </div>

    <div v-if="loading" class="loading-icon">
      <LoadingIcon />
    </div>

  </div>
</template>

<style>

  @media (max-width: 768px) {

    .model-main-text{
      font-size: 20px !important;
    }
    .model-element-day{
      width: auto !important;
      margin: 0 !important;
      margin-top: 10px !important;
    }

    .model-element-week{
      margin: 0 !important;
      margin-top: 10px !important;
    }

    .model-chart{
      margin: 0 !important;
      margin-top: 10px !important;
    }
  }

  .loading-icon{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .button-pos{
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .model-table{
    width: 100%;
    text-align: center;
    padding: 10px;
    border-radius: 10px;
    background-color: #191d34;
  }
  .model-main-text{
    margin: 10px;
    color: white;
  }
  .model-element-day{
    margin: 5px;
    padding: 10px;
    width: 25%;
    min-height: 250px;
    background-color: cornflowerblue;
    color: white;
    opacity: 90%;
    border-radius: 10px;
  }
  .model-element-week{
    position: relative;
    margin: 5px;
    padding: 10px;
    background-color: cornflowerblue;
    color: white;
    opacity: 90%;
    border-radius: 10px;
  }
  .model-chart{
    margin: 5px;
    max-height: 280px;
    color: white;
    border-radius: 10px;
  }
</style>
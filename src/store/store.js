import { createStore } from 'vuex';

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
              
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

const store = createStore({
    state: {
      city: '',
      weatherData: null,
      forecastData: null,
      fromDatetoDateWeather: null,
      favorites: JSON.parse(localStorage.getItem('favorites')) || [],
      apiKey: 'e9bbccc993d1d63441495536eb24650d',
      apiKey_2: 'ZE3K4L7K64XY49HE46KJL7KA6',
      cities: [],
      loading: false,
      startDate: new Date(),
      endDate: new Date(),
    },
    mutations: {
      updateCity(state, city) {
        state.city = city;
      },
      setWeatherData(state, weatherData) {
        state.weatherData = weatherData;
      },
      setForecastData(state, forecastData) {
        state.forecastData = forecastData;
      },
      setFromDateToDateWeather(state, fromDatetoDateWeather){
        state.fromDatetoDateWeather = fromDatetoDateWeather
      },
      addToFavorites(state) {
        if (!state.favorites.includes(state.city) && state.favorites.length < 5) {
          state.favorites.push(state.city);
          localStorage.setItem('favorites', JSON.stringify(state.favorites));
        }
      },
      loadFavorites(state) {
        const favorites = localStorage.getItem('favorites');
        if (favorites) {
          state.favorites = JSON.parse(favorites);
        }
      },
      removeFromFavorites(state, city) {
        state.favorites = state.favorites.filter((favorite) => favorite !== city);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      },
      updateCities(state, cities) {
        state.cities = cities;
      }
    },
    actions: {
      async getData({ commit, state }, city) {
        state.loading = true;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${state.apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${state.apiKey}`;
        try {
          const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
          ]);
         
          const weatherData = await weatherResponse.json();
          const forecastData = await forecastResponse.json();

          commit('updateCity', city)
         
          commit('setWeatherData', weatherData);
          commit('setForecastData', forecastData);
          console.log('Get data')
          state.loading = false;
        } catch (error) {
          console.error(error);
        }
      },
      async getDatefromDatetoDate({commit, state}, { city, startDate, endDate }){
        state.loading = true;

        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        const dateUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${formattedStartDate}/${formattedEndDate}?unitGroup=metric&include=days&key=${state.apiKey_2}&contentType=json`

        try{
          const dateResponse = await fetch(dateUrl);
          const DateData = await dateResponse.json();

          commit('updateCity', city)
          commit('setFromDateToDateWeather', DateData);

          console.log('Get data range', DateData)
          state.loading = false;
        } catch (error) {
          console.error(error);
        }
      },
    },
    getters: {
      loading: state => state.loading
    }
});

export default store;
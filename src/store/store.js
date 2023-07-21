import { createStore } from 'vuex';

const store = createStore({
    state: {
      city: '',
      weatherData: null,
      forecastData: null,
      favorites: JSON.parse(localStorage.getItem('favorites')),
      apiKey: 'e9bbccc993d1d63441495536eb24650d',
      cities: [],
      loading: false,
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
        console.log("run", city, state.apiKey)
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
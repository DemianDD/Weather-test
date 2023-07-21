<script>
  import store from '../store/store';
  import Suggester from './Suggester.vue';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    mounted() {
      fetch(
        'https://raw.githubusercontent.com/lmfmaier/cities-json/master/cities500.json'
      )
      .then((r) => r.json())
      .then((cities) => {
        this.$store.commit('updateCities', cities);

        navigator.geolocation.getCurrentPosition((g) => {
          let current = cities[0];
          for (let i = 0; i < cities.length; i++) {
            if (
              Math.abs(current.lat - g.coords.latitude) +
                Math.abs(current.lon - g.coords.longitude) >
              Math.abs(cities[i].lat - g.coords.latitude) +
                Math.abs(cities[i].lon - g.coords.longitude)
            ) {
              current = cities[i];
            }
          }

          this.$store.dispatch('getData', current.name);
        });
      });
    },
    computed: {
    },
    components: {
      Suggester
    },
    data() {
      return {
        city: '',
        open: true
      };
    },
    methods: {
      ...mapActions(['getData', 'updateCities']),
      onCitySelected(city) {
        this.city = city;
      },
      getData() {
        console.log("Click")
        this.$store.dispatch('getData', this.city);
      }
    },
  };
</script>

<template>
  <form class="input-position" @submit.prevent="getData">
    <div id="d-flex">
      <input
        @focus="open = true"
        @blur="open = false" 
        v-model="city" placeholder="Enter any town to get weather" />
      <Suggester
        v-if="open && city.trim() !== ''"
        :search-querry="city"
        class="suggestions"
      />
      <button>Find</button>
    </div>
  </form>
</template>

<style>
  @media (max-width: 768px) {
    .input-position{
      top: 75px !important;
      right: auto !important;
      left: 50% !important;
      transform: translate(-50%, -50%);
    }
  }
  #d-flex{
    display: flex;
  }
  .input-position{
    position: fixed;
    top: 25px;
    right: 200px;
    margin: 0;
    z-index: 2;
  }
  .suggestions{
    position: absolute;
    top: 43px;
    max-height: 200px;
    padding: 5px;
    background-color: white;
    width: 78%;
    border-radius: 6px;
    opacity: 70%;
    font-size: 12px;
    overflow-y: auto;
  }
</style>
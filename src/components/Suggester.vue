<script>
  import store from '../store/store';
  import { mapActions } from 'vuex';

  export default {
    name: "Suggester",
    methods: {
      getSuggestedCities() {
        if (this.searchQuerry.length < 3) return [];
        return this.$store.state.cities.filter((c) =>
          c.name.toLowerCase().includes(this.searchQuerry.toLowerCase())
        );
      },
      handleCityClick(newCity) {
        this.onSelect();
        this.$store.commit('updateCity', newCity);
      }
    },
    props: {
      searchQuerry: String,
      onSelect: Function
    }
  };
</script>

<template>
  <div @blur="handleClose">
    <li v-for="item in getSuggestedCities()" 
    :key="item.id" 
    @click="() => handleCityClick(item.name)" 
    class="suggest-element">
      <span >{{ item.name }}</span>
    </li>
  </div>
</template>

<style>
  .suggest-element{
    transition: 0.2s;
    cursor: pointer;
  }

  .suggest-element:hover{
    background-color: rgb(229, 229, 229);
    transition: 0.2s;
  }
</style>
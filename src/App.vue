<script>
import Navbar from '../src/components/NavBar.vue';
import Search from '../src/components/Search.vue';
import store from '../src/store/store';

  export default {
    name: 'App',
    components: {
      Navbar,
      Search
    },
    store
  }
</script>

<template>
  <div>
    <Search/>
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<style scoped>
    
</style>

<template>
    <div class="navbar">
      <router-link to="/" class="nav-brand">Home</router-link>
      <div class="column-style ">
        <div class="circle-container">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
        <div class="column-style">
          <div v-for="(city, index) in this.$store.state.favorites" :key="index">
            <div class="city-list">
              <span class="nav-item" @click="$store.dispatch('getData', city)">{{ city }} </span>
              <RemoveIcon class="component-fill" @click="showPopUp = true"/>
              <div ><PopUp :show="showPopUp" :onConfirm="handleConfirm(city)" :onCancel="handleCancel" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
import { mapState } from 'vuex';
import store from '../store/store';
import RemoveIcon from '../icons/RemoveIcon.vue';
import PopUp from './PopUp.vue';

  export default {
    name: 'Navbar',
    data() {
      return {
        showPopUp: false
      };
    },  
    computed: {
      ...mapState(["favorites"]),
      city() {
        return this.$store.state.city;
      },
    },
    components: 
    { RemoveIcon, PopUp },
    methods: {

      handleConfirm(city) {
        this.$store.commit('removeFromFavorites', city);
        this.showPopUp = false;
      },

      handleCancel() {
        this.showPopUp = false;
      }
    }
  }
</script>
  
<style>

  @media (max-width: 768px) {
    .navbar{
      width: 100% !important;
      height: 30px !important;
      flex-direction: row !important;
      min-height: 0 !important;
      right: auto !important;
      border-radius: 0 !important;
      left: auto !important;
    }
  }
  .navbar {
    width: 150px;
    min-height: 35%;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 0;
    right: 0;
    background-color: cornflowerblue;
    opacity: 90%;
    padding: 10px;
    border-radius: 0px 0px 0px 10px;
  }

  .nav-brand{
    text-decoration: none;
    color: white;
    font-size: 25px;
    margin: 20px 0px;
    transition: 0.2s;
  }

  .nav-brand:hover{
    color: rgb(238, 220, 187);
    transition: 0.2s;
  }

  .city-list{
    width: 100%;
    display: flex;
    padding: 5px;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    text-transform: capitalize;
  }
  
  .nav-item {
    color: white;
    text-decoration: none;
    transition: 0.2s;
    width: 75px;
  }

  .nav-item:hover{
    color: rgb(238, 220, 187);
    transition: 0.2s;
  }

  .nav-add-button{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    text-align: center;
    background-color: orange;
    color: white;
  }

  .circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff; 
    margin: 2.5px; 
  }
  .circle-container {
    display: flex;
    justify-content: center; 
  }

  @media (max-width: 767px) {
    .city-list{
      font-size: 20px !important;
      align-items: center;
    }
    .circle-container {
      flex-direction: column;
      align-items: center;
      margin: 0px 10px;
    }

    .circle{
      width: 5px !important;
      height: 5px !important;
    }
  }
</style>
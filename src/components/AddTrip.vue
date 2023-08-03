<template>
  <div v-if="show"  class="popup-container">
    <div class="column-style">
      <div><h3>Add new trip</h3></div>
      <div>
        <form class="column-style" @submit.prevent="confirm">
          <div class="label-input">Enter your city</div>
          <input placeholder="for ex.: London" v-model="city"/>
      
          <div class="label-input" for="startDate">Start Date:</div>
          <input type="date" v-model="startDate" />

          <div class="label-input" for="endDate">End Date:</div>
          <input type="date" v-model="endDate" />
        </form>
      </div>
      <div class="button-flex">
        <button @click="confirm">Confirm</button>
        <button @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import Suggester from './Suggester.vue';
import { ref } from 'vue';
export default {
    components: {
      Suggester
    },
    props: {
      show: {
        type: Boolean,
        required: true
      },
      onConfirm: {
        type: Function,
        required: true
      },
      onCancel: {
        type: Function,
        required: true
      }
    },
  data() {
    return {
      city: '',
      startDate: this.getCurrentDate(),
      endDate: this.getCurrentDate(),
      inputRef: ref(null)
    };
  },
  methods: {
    getCurrentDate() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1;
      let day = currentDate.getDate();

      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;

      return `${year}-${month}-${day}`;
    },
    confirm() {
      if(this.city.length)
        this.onConfirm({
          city: this.city,
          startDate: this.startDate,
          endDate: this.endDate,
        });
    },
    cancel() {
        this.onCancel();
    },
  },
  watch: {
    startDate(newValue) {
      this.endDate = this.endDate < newValue ? newValue : this.endDate;
    },
    endDate(newValue) {
      this.startDate = this.startDate > newValue ? newValue : this.startDate;
    },
  },
};
</script>
  
<style>
  .label-input{
    font-size: 12px;
    color: #ccc;
    margin: 5px 0px;
  }
  .popup-container{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    top: 50%;
    z-index: 2;
    left: 50%;
    min-height: 50%;
    min-width: 50%;
    transform: translate(-50%, -50%);
    background-color: #0f1016;
    border: orange solid 2px;
    border-radius: 10px;
    color: #fff;
  }
  .button-flex{
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
</style>
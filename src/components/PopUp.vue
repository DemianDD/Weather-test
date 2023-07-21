<template>
    <div v-if="show" class="popup-container">
        <div><h3>Are you sure?</h3></div>
        <div class="button-flex">
          <button @click="confirm">Yes</button>
          <button @click="cancel">No</button>
        </div>
    </div>
  </template>
  
  <script>
  export default {
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
    methods: {
      confirm() {
        this.onConfirm();
      },
      cancel() {
        this.onCancel();
      }
    }
  };
</script>
  
<style>
    .popup-container{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        top: 50%;
        z-index: 2;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 250px;
        height: 150px;
        background-color: #0f1016;
        border: orange solid 2px;
        border-radius: 10px;
        color: #fff;
    }

    .button-flex{
        display: flex;
        justify-content: center;
    }
</style>
<script>
import AddTrip from '../components/AddTrip.vue'
import WeatherWeek from '../components/WeatherWeek.vue'
import { mapState, mapActions } from 'vuex';
import HumidityIcon from '../icons/HumadityIcon.vue';
import RemoveIcon from '../icons/RemoveIcon.vue';
import LoadingIcon from '../icons/Loading.vue';
import LeftIcon from '../icons/LeftIcon.vue';
import RightIcon from '../icons/RightIcon.vue';

    export default{
        components: 
        { AddTrip, HumidityIcon, RemoveIcon, WeatherWeek, LoadingIcon, LeftIcon, RightIcon },

        data() {
            return {
                addTripWindow: false,
                tripList: JSON.parse(localStorage.getItem('tripList')) || [],
                searchQuery: '',
                selectedIndex: -1,
                scrollOffset: 0,
                itemWidth: 182,
            }
        },
        computed: {
            ...mapState(['weatherData', 'city', 'fromDatetoDateWeather', 'startDate', 'endDate']),
            filteredList() {
                return this.tripList.filter((trip) => {
                    return trip.city && trip.city.toLowerCase().includes(this.searchQuery.toLowerCase());
                });
            },
            countdown() {
                if (this.selectedIndex !== -1) {
                    const startDate = new Date(this.filteredList[this.selectedIndex].startDate);
                    const currentDate = new Date();
                    const timeDiff = startDate.getTime() - currentDate.getTime();

                    if (timeDiff <= 0) {
                        return {
                            days: 0,
                            hours: 0,
                            minutes: 0,
                            seconds: 0,
                        };
                    }

                    const daysRemaining = Math.floor(timeDiff / (1000 * 3600 * 24));
                    const hoursRemaining = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
                    const minutesRemaining = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
                    const secondsRemaining = Math.floor((timeDiff % (1000 * 60)) / 1000);

                    return {
                        days: daysRemaining,
                        hours: hoursRemaining,
                        minutes: minutesRemaining,
                        seconds: secondsRemaining,
                    };
                }
                return {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                }
            },
        }, 

        mounted() {
            if (this.city) {
                this.getData(this.city);
            }
        },
        methods: {
            ...mapActions(['getData', 'getDatefromDatetoDate']),
            showWeather(city, startDate, endDate, index) {
                this.getData(city);
                this.getDatefromDatetoDate({ city, startDate, endDate });
                this.selectedIndex = index;
            },
            open() {
                this.addTripWindow = true;
            },
            handleConfirm(tripData) {
                this.addTripWindow = false;
                this.addTrip(tripData);
            },     
            handleCancel() {
                this.addTripWindow = false;
            },
            addTrip(tripData) {
                const newTrip = {
                    city: tripData.city,
                    startDate: tripData.startDate,
                    endDate: tripData.endDate,
                };
                this.tripList.push(newTrip);
                this.saveTripList();
            },
            saveTripList() {
                localStorage.setItem('tripList', JSON.stringify(this.tripList));
            },
            removeTrip(index) {
                if (index >= 0 && index < this.tripList.length) {
                    this.tripList.splice(index, 1); 
                    this.saveTripList(); 
                }
            },
            scrollLeft() {
                this.scrollOffset = Math.max(0, this.scrollOffset - this.itemWidth);
            },
            scrollRight() {
                const carouselWidth = this.filteredList.length * this.itemWidth;
                const maxOffset = Math.max(0, carouselWidth - this.$refs.carousel.offsetWidth);
                this.scrollOffset = Math.min(this.scrollOffset + this.itemWidth, maxOffset);
            },
        }
    }
</script>

<template>
    <div class="container-page-trip">
        <h1 class="trip-main-text">My Trips</h1>
        <div>
            <form>
                <input placeholder="Search for trip" @submit.prevent v-model="searchQuery"/>
            </form>
        </div>

        <div class="row-style">

            <div class="column-style">
                <div class="trip-list">
                    
                    <div class="trip-carousel" ref="carousel">
                        <div class="trip-list-scroll" :style="{ transform: `translateX(-${scrollOffset}px)`}">
                            <div v-if="filteredList.length == 0" class="element-info">
                                <div class="info-text-main">You don't have any trips yet </div>
                                <div class="info-text-secondary">Please click the button to book a trip</div>
                            </div>
                            <div class="trip-list-item" 
                            v-for="(trip, index) in filteredList" 
                            :key="index" @click="showWeather(trip.city, trip.startDate, trip.endDate, index)"
                            :class="{ 'selected-item': index === selectedIndex }">
                                
                                <RemoveIcon class="trip-item-btn" @click="removeTrip(index)"/>
                                <span> {{ trip.city }} </span>
                                <span class="item-data"> {{ trip.startDate }} - {{ trip.endDate }} </span>
                            </div>
                        </div>
                        
                    </div>
                    <button @click="open()">
                        +
                        <div><small>Add new trip</small></div>
                    </button>
                    <div v-if="filteredList != 0">
                        <button @click="scrollLeft" class="carousel-btn-left"><LeftIcon/></button>
                        <button @click="scrollRight" class="carousel-btn-right"><RightIcon/></button>
                    </div>
                </div>

                <div class="trip-week">
                    <WeatherWeek v-if="fromDatetoDateWeather  && this.selectedIndex != -1 && filteredList.length != 0" :city="city" :startDate="startDate.toISOString()" :endDate="endDate.toISOString()" />
                    <div class="trip-week-info" v-else>
                        <h4>
                            Please select the city from list to view the information
                        </h4>
                    </div>
                    
                </div>
            </div>

            <div class="trip-current-city text-center" >
                <div v-if="weatherData && this.selectedIndex != -1">
                    <h2>{{ city }}</h2>
                    <div class="temp-text">{{ Math.round(weatherData.main.temp) }}°C</div>
                    <p class="position-align-center"> <HumidityIcon />Humidity: {{ weatherData.main.humidity }}</p>
                    <p class="">{{ weatherData.weather[0].main }}</p>
                    <p>Countdown: </p>
                    <p v-if="countdown.days > 0">
                        {{ countdown.days }} days, 
                        {{ countdown.hours }} hours, 
                        {{ countdown.minutes }} minutes, 
                        {{ countdown.seconds }} seconds
                    </p>
                    <p v-else>Trip has already started</p>
                </div>
            </div>

        </div>
    </div>
    <AddTrip :show="addTripWindow" :on-confirm="handleConfirm" :on-cancel="handleCancel"/>
</template>

<style>

    .element-info{
        max-width: 150px;
        padding: 10px;
    }
    .info-text-main{
        text-align: center;
        font-weight: 600;
        margin-bottom: 10px;
        color: orange;
    }

    .info-text-secondary{
        text-align: center;
        color: #ccc;
        font-size: 10px;
        font-weight: 100;
    }

    .carousel-btn-left{
        min-width: 40px !important;
        height: 40px !important;
        font-size: 14px !important;
        position: absolute;
        left: 40%;
        bottom: 0;
        background-color: transparent !important;
    }

    .carousel-btn-right{
        min-width: 40px !important;
        height: 40px !important;
        font-size: 14px !important;
        position: absolute;
        right: 40%;
        bottom: 0;
        background-color: transparent !important;
    }
    .selected-item {
        background-color: #111423;
        transition: 0.2s;
    }
    .trip-main-text{
        margin: 10px;
        color: white;
    }

    .trip-item-btn{
        position: absolute;
        right: 15px;
        top: 15px;
        z-index: 1;
        transition: 0.2s;
    }

    .trip-item-btn:hover{
        background-color: #272932;
        transition: 0.2s;
    }

    .trip-carousel{
        max-width: 570px;
        position: relative;
        overflow: hidden;
    }

    .trip-list-scroll {
        display: flex;
        flex-direction: row;
        align-items: center;
        transition: transform 0.3s ease-in-out;
    }

    .trip-week{
        display: flex;
        flex-direction: row;
        margin: 5px;
        padding: 10px;
        min-width: 700px;
        max-width: 700px;
        min-height: 250px;
        background-color: cornflowerblue;
        color: white;
        opacity: 90%;
        border-radius: 10px;
        overflow-x: auto;
    }

    .trip-week-info{
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .trip-list{
        position: relative;
        min-height: 250px;
        color: white;
        opacity: 90%;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .trip-list-item{
        position: relative;
        margin: 5px;
        padding: 10px;
        min-width: 150px;
        max-width: 150px;
        height: 150px;
        border: #fff solid 1px;
        color: white;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: 0.2s;
        cursor: pointer;
    }

    .trip-list-item:hover{
        background-color: #111423;
        transition: 0.2s;
    }

    .item-data{
        color: #ccc;
        font-size: 12px;
        padding-top: 10px;
    }

    .trip-list button{
        margin: 5px;
        min-width: 150px;
        height: 150px;
        background-color: #ffffff39;
        color: white;
        border-radius: 10px;
        transition: 0.2s;
        cursor: pointer;
        font-size: 25px;
    }

    .trip-list button:hover{
        background-color: #ffffff4a;
    }

    .trip-current-city{
        width: 100%;
        margin: 5px;
        padding: 10px;
        color: white;
        opacity: 90%;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>
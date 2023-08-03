<script>
import { mapState, mapActions } from 'vuex';

export default {
    props: {
        city: String,
        startDate: String,
        endDate: String,
    },
    computed: {
        ...mapState(['fromDatetoDateWeather', 'loading']),
    },
    methods: {
        ...mapActions(['getDatefromDatetoDate']),
        formatDate(dateStr) {
            const date = new Date(dateStr);
            const options = { day: '2-digit', month: 'short' };
            return date.toLocaleDateString('en-US', options);
        }
    },
};
</script>
<template>
    <div>
        <h1>Week</h1>
        <div v-if="loading">Loading...</div>
        <div v-else class="week-container">
            <div v-for="day in fromDatetoDateWeather.days" :key="day.datetime" class="day-column">
                <span class="date">{{ formatDate(day.datetime) }}</span>
                <span class="temp">{{ day.tempmin }}°C - {{ day.tempmax }}°C</span>
                <span class="desc">{{ day.conditions }}</span>
            </div>
        </div>
    </div>
</template>
  
<style>

.week-container{
    display: flex;
}

.day-column{
    display: flex;
    flex-direction: column;
    background-color: #191d34;
    padding: 10px;
    border-radius: 10px;
    margin-right: 3px;
    max-width: 150px;
    min-width: 150px;
}

.date{
    text-align: end;
    font-size: 16px;
    color: #ccc;
}

.temp{
    font-size: 20px;
    font-weight: 600;
    padding: 5px 0px;
}

.desc{
    font-size: 12px;
    font-weight: 600;
    color: #ccc;
}
</style>
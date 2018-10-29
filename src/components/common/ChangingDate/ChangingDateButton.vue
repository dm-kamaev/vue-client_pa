<template>
  <div class="form__row">
    <template>
      <loader v-if="load.date.loading"/>

      <button-date
        v-else-if="load.date.loaded"
        class="form__button-date"
        :dateArray="dateArray"
        :dateIndex="dateIndex"
        @setActive="setDate"
      />

      <error-fetch v-else="load.date.error"/>
    </template>

    <template>
      <loader v-if="load.time.loading || load.date.loading"/>

      <base-select-time
        v-else-if="load.time.loaded && timesArray.length"
        class="form__select"
        :list="timesArray"
        :active="this.timeIndex"
        @setActive="setTime"
      />

      <p v-else-if="load.time.loaded && !timesArray.length" class="form__text text" v-else>Нет доступного<br> времени</p>

      <error-fetch v-else-if="load.time.error"/>

    </template>
  </div>
</template>

<script>
  import Loader from '@/components/common/Loader'
  import ErrorFetch from '@/components/common/Error/ErrorFetch'
  import BaseSelectTime from "@/components/common/BaseSelect/BaseSelectTime"
  import ButtonDate from '@/components/common/ButtonDate/ButtonDate'


  export default {
    name: 'ChangingDateButton',

    components: {
      Loader,
      ErrorFetch,
      BaseSelectTime,
      ButtonDate,
    },

    props: {
      timesArray: {
        type: Array,
        required: true
      },

      dateArray: {
        type: Array,
        required: true
      },

      dateIndex: {
        type: Number,
        required: true
      },

      timeIndex: {
        type: Number,
        required: true
      },

      load: {
        type: Object,
        required: true
      }
    },

    data: () => ({
      selectedDate: null,
      selectedTime: null
    }),

    computed: {
      activeDate() {
        return {
          date: this.selectedDate,
          time: this.selectedTime
        }
      }
    },

    methods: {
      setDate(value) {
        this.selectedDate = value
      },

      setTime(value) {
        this.selectedTime = value
      }
    },

    watch: {
      selectedDate() {
        this.$emit('setDate', this.activeDate)
      },

      selectedTime() {
        this.$emit('setDate', this.activeDate)
      }
    }
  }
</script>

<style scoped>
  .form {
    &__row {
      display: flex;
      align-items: center;
    }

    &__select {
      max-width: 135px;
    }

    &__text {
      text-align: center;
      color: #000000;
    }

    &__button-date {
      margin-right: 30px;
    }
  }
</style>

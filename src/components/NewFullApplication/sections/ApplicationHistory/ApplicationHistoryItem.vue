<template>
  <div v-if="loaded" class="application-history-item">
    <div class="application-history-item__row">
      <div class="application-history-item__cell">
        <p class="application-history-item__text">
          <span>
            {{ date }}
          </span>
          <br>
          <span>{{ time }}</span>
        </p>
      </div>
      <div class="application-history-item__cell">
        <ul class="application-history-item__list">
          <li class="application-history-item__list-item"
              v-for="item in details.services">
            {{ item.serviceTitle }}
          </li>
        </ul>
      </div>
      <div class="application-history-item__cell">
        <button class="application-history-item__btn" @click="repeatOrder">Повторить</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
  import moment from 'moment'

	export default {
		name: 'ApplicationHistoryItem',

    props: {
      order: {
        type: Object,
        required: true
      }
    },

    computed: {
      ..._.mapValues(mapGetters({
        loading: 'orderDetailsLoading',
        loaded: 'orderDetailsLoaded',
        error: 'orderDetailsError',
        details: 'orderDetails'
      }), item => function (...rest) {
        return item.call(this, rest)(this.order.departureId)
      }),

      mobile() {
        return window.innerWidth < 768
      },

      date() {
        if (this.mobile) {
          return moment.utc(this.details.date).utcOffset(this.details.timeZone).format('DD.MM')
        }

        return moment.utc(this.details.date).utcOffset(this.details.timeZone).format('D MMMM')
      },

      time() {
        return moment.utc(this.details.date).utcOffset(this.details.timeZone).format('HH:mm')
      }
    },

    methods: {
      ...mapActions(['getOrderDetails']),

      checkAndLoad() {
        if (!this.loaded && !this.loading) {
          this.getOrderDetails(this.order.departureId)
        }
      },

      repeatOrder() {
        this.$emit('repeatOrder', this.details.departureId)
      }
    },

    watch: {
      loaded() {
		    this.$emit('loaded', this.order.departureId)
      }
    },

    mounted() {
		  if (this.loaded) {
        this.$emit('loaded', this.order.departureId)
      }

      this.checkAndLoad()
    }
	}
</script>

<style>
  @import "../../../../css/variables.css";

  .application-history-item {
    border-top: 1px solid #cbc9c9;

    &:last-of-type {
      border-bottom: 1px solid #cbc9c9;
    }

    &__row {
      display: flex;
      justify-content: space-between;
      padding: 15px 20px;
    }

    &__cell {
      width: calc(100% - 145px);
      margin-right: 15px;

      @media (--tablet) {
        width: calc(100% - 335px);
        margin-right: 35px;
      }

      &:first-of-type {
        width: 40px;

        @media (--tablet) {
          width: 95px;
        }
      }

      &:nth-of-type(2) {
        flex-grow: 1;
      }

      &:last-of-type {
        width: 75px;
        margin-left: auto;
        margin-right: 0;

        @media (--tablet) {
          width: 170px;
        }
      }
    }

    &__text {
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 19px;
      font-weight: 400;
      color: #353535;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        font-size: 16px;
        line-height: 22px;
      }
    }

    &__list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    &__list-item {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 19px;
      font-weight: 400;
      color: #353535;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        font-size: 16px;
        line-height: 22px;
      }
    }

    &__btn {
      box-sizing: border-box;
      height: auto;
      outline: none;
      font-size: 14px;
      line-height: 19px;
      color: #ff5a19;
      background-color: transparent;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

      @media (--tablet) {
        cursor: pointer;
        width: 170px;
        height: 45px;
        padding-left: 45px;
        padding-right: 45px;
        border-radius: 3px;
        font-size: 16px;
        line-height: 22px;
        color: #353535;
        background-color: #e5e5e5;
      }

      &:hover {
        @media (--tablet) {
          background-color: #ededed;
        }
      }

      &:active {
        @media (--desktop) {
          background-color: #e5e5e5;
        }
      }
    }
  }
</style>

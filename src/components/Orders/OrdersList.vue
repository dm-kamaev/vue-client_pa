<template>
  <virtual-scroller
    ref="scroll"
    class="scroller"
    pool-size="94"
    :items="list"
    item-height="100"
    content-tag="div"
    emit-update
    @update='update'
    :index="index"
    :active="active"
  >
    <template slot-scope="{ item, index, active }">
      <router-link class="orders-list__item" active-class="orders-list__item--active" :id="item.departureId" :to="setAddress(item.departureId)">
        <div class="orders-list__column">
          <p class="orders-list__number">№ {{ item.orderNumber }}</p>
          <time class="orders-list__time text">{{ setTime(item.date, item.timeZone) }}</time>
        </div>
        <div class="orders-list__column">
          <p class="orders-list__price">{{ item.totalAmount | currency }}</p>
        </div>
      </router-link>
    </template>
  </virtual-scroller>
</template>


<script>
  import { VirtualScroller } from 'vue-virtual-scroller'
  import moment from 'moment'
  import transform from '@/utils/transform'
  import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
  import PerfectScrollbar from 'perfect-scrollbar';


  export default {
    name: 'OrderList',

    components: {
      VirtualScroller
    },

    props: {
      list: {
        type: Array,
        require: true
      },

      objectId: {
        type: String,
        require: true
      }
    },

    data: () => ({
      height: 100,
      direction: 0,
      previousStartIndex: 0,
      previousEndIndex: 20,
      first: true,
      index: 0,
      active: 10
    }),

    computed: {

    },

    methods: {
      length() {
        return this.$refs.scroll.$el.querySelectorAll('.orders-list__item').length
      },

      update(startIndex, endIndex) {

        if (this.first) {
          this.first = false
          this.previousStartIndex = startIndex
          this.previousEndIndex = endIndex
        } else {
          if (this.previousStartIndex > startIndex || this.previousEndIndex > endIndex) {
            this.previousStartIndex = startIndex
            this.previousEndIndex = endIndex

            if (startIndex < 5) {
              this.$emit('update', { orderId: this.list[0].departureId, direction: 1 })
            }
          }

          if (this.previousStartIndex < startIndex || this.previousEndIndex < endIndex) {
            this.previousStartIndex = startIndex
            this.previousEndIndex = endIndex

            if (endIndex > this.list.length - 5) {
              this.$emit('update', { orderId: this.list[this.list.length - 1].departureId, direction: -1 })
            }
          }
        }
      },

      setTime(date, timezone) {
        return moment.utc(date).utcOffset(timezone).format('DD.MM.YYYY HH:mm')
      },

      setAddress(ordId) {
        return `/adr${this.objectId}/ord${transform(ordId)}`
      }
    },

    mounted() {
      this.$refs.scroll.$el.scrollTop = 200
      const ps = new PerfectScrollbar(this.$refs.scroll.$el);
    },

    watch: {
      list() {
        let exist = false
        for (let key in this.list) {
          if (this.$store.state.client.currentOrder === this.list[key].departureId) {
            exist = true
            const height = 94
            setTimeout(() => {
              this.$refs.scroll.$el.scrollTop = height * key
            }, 800)
          }
        }

        if (!exist) {
          this.$refs.scroll.$el.scrollTop = 0
        }

      }
    }
  }
</script>

<style>
  @import "./../../css/variables.css";
  @import "./../../css/reset.css";
  @import "./../../css/components/text.css";
  @import "./../../css/components/v-bar.css";

  .wrapper {
    height: 300px;
    width: 300px;
  }

  .orders-list {
    &__wrap {
      height: 100%;
    }

    &__price {
      color: var(--brand-color-orange);
    }

    &__number {
      color: var(--brand-color-orange);
      margin-bottom: 10px;
    }

    &__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 25px 30px;
      border-bottom: 1px solid var(--border-color-latte);
      user-select: none;
      cursor: pointer;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      &:first-child {
        border-top: 1px solid var(--border-color-latte);
      }

      &:hover {
        @media (--tablet) {
          background-color: var(--border-color-latte);
        }
      }

      &--active {
        background-color: var(--bg-dark);
      }
    }

    &__column {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  .scroller {
    height: 100%;
    position: relative;

    &.item {
      height: 22px;
    }
  }
</style>

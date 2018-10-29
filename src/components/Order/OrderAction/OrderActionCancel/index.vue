<template>
  <form class="form">
    <button-close class="modal__close" @closeHandler="close"/>

    <p class="form__title title">Пожалуйста, укажите причину отмены</p>
    <div class="form__row">
      <label v-for="item in filterReazons" class="form__checkbox">
        <input type="radio" class="form__input" :name="item.name" :value="item.value" v-model="selected">
        {{item.title}}
      </label>
    </div>
  </form>
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex'
  import api from 'vue_components/src/api/index'
  import types from '@/store/types'
  import analytic from '@/store/common/analytic'
  import moment from 'moment'

  import ButtonClose from '@/components/common/ButtonClose'

  export default {
    name: 'OrderActionCancel',

    components: {
      ButtonClose
    },

    props: {
      date: {
        type: Object,
        required: true
      },

      order: {
        type: Object,
        required: true
      }
    },

    data: () =>({
      reasons: [
        {
          title: 'никого не будет дома',
          name: 'cancel_reason',
          value: 'Cancel_NobodyAtHome'
        },
        {
          title: 'дома еще чисто',
          name: 'cancel_reason',
          value: 'Cancel_StillClean'
        },
        {
          title: 'хочу другого домовенка',
          name: 'cancel_reason',
          value: 'Cancel_ChangeEmployee'
        },
        {
          title: 'заказал в другом месте',
          name: 'cancel_reason',
          value: 'Cancel_AnotherCompany'
        }
      ],
      selected: null
    }),

    computed: {
      filterReazons() {
        function compareRandom(a, b) {
          return Math.random() - 0.5;
        }

        this.reasons.sort(compareRandom);

        return this.reasons
      }
    },

    methods: {
      ...mapMutations({
        changeStatus: types.CHANGE_STATUS_ORDER,
        showAlert: types.SHOW_ALERT
      }),

      async cancelOrder() {
        const param = {
          "departureID": this.order.departureId,
          "reasons": [
            {
              "param": this.selected,
              "value": true
            }
          ]
        }

        try {
          await api.client.cancelOrder(param)

          analytic.sendEvent({name: "button", value: "cancelled_order_submit", ga_action: "click"}, ['ga', 'af', 'fb'])
          this.showAlert({ view: 'message', text: 'Ваш заказ был отменен', timer: 3000, type: 'success' })

          this.$emit('close');
          this.changeStatus({ orderId: this.order.departureId, status: 3})

        } catch(error) {
          this.showAlert({ view: 'message', text: 'Ошибка, повторите попытку позднее', timer: 5000, type: 'error' })
          this.$emit('close');


        }
      },

      close() {
        analytic.sendEvent({name: "button", value: "cancelled_order_abort", ga_action: "click"}, ['ga', 'af', 'fb']);
        this.showAlert({ view: 'message', text: 'Заказ не был отменен. Чтобы закончить отмену заказа, выберите причину отмены.', timer: 3000, type: 'error' })

        this.$emit('close');
      }
    },

    watch: {
      selected() {
        this.cancelOrder()
      }
    }
  }
</script>

<style scoped>
  @import "../../../../css/variables.css";
  @import "../../../../css/components/title.css";
  @import "../../../../css/components/text.css";

  .form {
    padding: 30px 20px;

    @media (--tablet) {
      padding: 40px;
    }

    @media (--desktop) {
      padding: 50px;
    }

    &__title {
      margin-bottom: 30px;
      font-size: 18px;
      color: #000000;
      line-height: 1.3em;
      text-align: center;
    }

    &__text {
      text-align: center;
      color: #000000;
    }

    &__row {

      @media (--tablet) {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 400px;
        margin: 0 auto -10px;
      }
    }

    &__checkbox {
      display: block;
      box-sizing: border-box;
      width: 100%;
      margin-bottom: 10px;
      padding: 10px;
      text-align: center;
      color: #000000;
      border: 1px solid #cbc9c9;
      cursor: pointer;

      @media (--tablet) {
        width: calc((100% - 10px) / 2);
      }

      &:hover {
        color: var(--color-white);
        background-color: var(--brand-color-orange);
        border-color: var(--brand-color-orange);
      }
    }

    &__checkbox--active {
      color: var(--color-white);
      background-color: var(--brand-color-orange);
      border-color: var(--brand-color-orange);
    }

    &__input {
      display: none;
    }
  }
</style>

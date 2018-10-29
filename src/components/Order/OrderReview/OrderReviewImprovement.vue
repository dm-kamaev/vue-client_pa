<template>
  <form @submit.prevent="submit" class="form">
    <p class="form__title  title">Скажите, что мы могли бы сделать лучше</p>
    <div v-for="item in reasons" class="form__row">
      <label   class="checkbox">
        <input type="checkbox" v-model="item.checked" class="checkbox__input" :name="item.name"  :value="item.value">
        <span class="checkbox__indicator"></span>
        <span class="checkbox__text">{{ item.title }}</span>
      </label>
    </div>

    <div class="form__row">
      <input ref="input" class="form__input input" type="text" name="BadQuality" placeholder="Введите свой вариант...">
    </div>

    <p v-if="reviewOrderError" class="form__error">Ошибка, повторите попытку позднее</p>

    <button class="form__button button" type="submit">
      <template v-if="reviewOrderLoading">Отправка...</template>
      <template v-else>Отправить</template>
    </button>
  </form>
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex'
  import api from 'vue_components/src/api/index'
  import types from '@/store/types'

  export default {
    name: 'OrderReviewImprovement',

    props: {
      order: {
        type: Object,
        required: true
      }
    },

    data: () => ({
      reasons: [
        {
          title: 'приходить вовремя',
          name: 'badQuality',
          value: 'Improve_InTime',
          checked: false
        },
        {
          title: 'повысить качество уборки',
          name: 'BadQuality',
          value: 'Improve_Quality',
          checked: false
        },
        {
          title: 'сменить химию/инвентарь',
          name: 'BadQuality',
          value: 'Improve_Chem',
          checked: false
        },
        {
          title: 'убираться быстрее',
          name: 'BadQuality',
          value: 'Improve_Duration',
          checked: false
        },
        {
          title: 'улучшить сервис',
          name: 'BadQuality',
          value: 'Improve_Service',
          checked: false
        }
      ],
      reviewOrderError: false,
      reviewOrderLoading: false

    }),

    methods: {
      ...mapActions(['defineError']),

      async submit() {
        this.reviewOrderLoading = true

        let checkItems = [];

        this.reasons.forEach((item) => {
          if (item.checked) {
            let param = {
              param: item.value,
              value: true
            };

            checkItems.push(param);
          }
        });

        if (this.$refs.input.value !== "") {
          let param = {
            param: "Improve_Other",
            value: this.$refs.input.value
          };

          checkItems.push(param);
        }

        if (checkItems.length) {
          const params = {
            "departureId": this.order.departureId,
            "scores": checkItems,
          }

          try {
            await api.client.setOrderReview(params)

            this.$emit('close')
          } catch(error) {
            this.reviewOrderLoading = false
            this.reviewOrderError = true

            this.defineError({
              error: error,
              name: 'setOrderReview',
              params: params
            })
          }
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../../css/variables.css";
  @import "../../../css/components/title.css";
  @import "../../../css/components/text.css";
  @import "../../../css/components/button.css";
  @import "../../../css/components/checkbox.css";
  @import "../../../css/components/input.css";

  .form {
    &__title {
      text-align: center;
      margin-bottom: 30px;
      color: #000000;
    }

    &__text {
      text-align: center;
      color: #000000;
      line-height: 1.3em;
    }

    &__error {
      text-align: center;
      color: var(--color-red);
    }

    &__row {
      margin-bottom: 15px;
    }

    &__label {
      display: block;
      margin-bottom: 10px;
    }

    &__input {
      padding: 10px;

      &::placeholder {
        padding: 10px;
      }
    }

    &__button {
      margin: 30px auto 0;
    }
  }
</style>

<template>
   <div class="survey">
     <div class="survey__inner">
       <a class="survey__logo-link" href="https://www.domovenok.su" target="_blank">
         <img class="survey__logo" :src="logo" width="110" alt="logo">
       </a>
       <p class="survey__title">Наш опрос не займет у Вас более 2-х минут. Спасибо!</p>
       <form
         class="survey__form"
         method="post"
         @submit.prevent="submit"
       >

         <div class="survey__item" v-for="(question, index) in questions">
           <p class="survey__text">{{ index + 1 }}. {{ question.title }}</p>

           <template v-if="question.view === 'switch'">
             <div class="survey__inputs-group  survey__inputs-group--row">
               <div class="survey__input-wrapper" v-for="item in question.option">

                 <label
                   class="survey__label  survey__label--number"
                   :class="{'survey__label--number-invalid': question.value === '' && !valid, 'survey__label--number-active': item === question.value}" >

                   {{ item }}

                   <input
                     class="survey__radio"
                     type="radio"
                     :value="item"
                     v-model="question.value"
                   >
                 </label>
               </div>
             </div>
           </template>

           <template v-if="question.view === 'radio'">
             <div class="survey__inputs-group">
               <div class="survey__input-wrapper" v-for="item in question.option">

                 <label
                   class="survey__label"
                   :class="{'survey__label--invalid': question.value === '' && !valid, 'survey__label--active': item === question.value}"
                 >

                   {{item}}

                   <input
                     class="survey__radio"
                     type="radio"
                     :value="item"
                     v-model="question.value"
                   >
                 </label>

               </div>
             </div>
           </template>

           <template v-if="question.view === 'radioOrFreeEntry'">
             <div class="survey__inputs-group">
               <div class="survey__input-wrapper" v-for="item in question.option">
                 <label
                   class="survey__label"
                   :class="{'survey__label--invalid': question.value === '' && !valid, 'survey__label--active': item === question.value}"
                 >
                   {{item}}

                   <input
                     class="survey__radio"
                     type="radio"
                     :value="item"
                     v-model="question.value"
                     @input=""
                     @click="question.inputValue = ''"
                   >
                 </label>
               </div>
               <div class="survey__input-wrapper">
                 <input
                   class="survey__input"
                   type="text"
                   :placeholder="question.placeholder"
                   v-model="question.inputValue"
                   @input="question.value = question.inputValue"
                   @focus="question.value = question.inputValue"
                 >
               </div>
             </div>
           </template>

           <template v-if="question.view === 'radioAndComment'">
             <div class="survey__inputs-group">
               <div class="survey__input-wrapper" v-for="item in question.option">
                 <label
                   class="survey__label"
                   :class="{'survey__label--invalid': question.value === '' && !valid, 'survey__label--active': item === question.value}"
                 >
                   {{item}}

                   <input
                     class="survey__radio"
                     type="radio"
                     :value="item"
                     v-model="question.value"
                   >
                 </label>
               </div>
               <div class="survey__input-wrapper">
                 <input
                   class="survey__input"
                   type="text"
                   :placeholder="question.placeholder"
                   v-model="question.comment"
                 >
               </div>
             </div>
           </template>
         </div>

         <div class="survey__item">
           <p class="survey__text">Мы благодарим Вас за прохождение анкеты и дарим Вам 500 бонусных рублей на счет. Бонус
             действителен в течение 30 дней. Используйте сами или передайте другу :)</p>
         </div>
         <p v-if="error">Произошла ошибка, попробуйте позднее</p>
         <div class="survey__item">
           <button
             class="survey__btn button"
             type="submit"
           >
             <template v-if="loading">Отправка...</template>
             <template v-else>Скачать бонус!</template>
           </button>
         </div>
       </form>
     </div>

     <modal
       :show="isModalShown"
       @close="closePopup"
     >
       <div class="survey__modal">
         <h3 class="survey__modal-title">Спасибо за Ваши ответы!</h3>
         <p class="survey__modal-text">Активировать бонус можно по телефону:
           <a class="survey__modal-tel" href="tel:+74953696050">8&nbsp;(495)&nbsp;369-60-50</a>
         </p>
       </div>
     </modal>
   </div>
</template>

<script>
  import logoImage from './img/logo-new.svg'

  import Modal from '@/components/common/Modal'
  import api from 'vue_components/src/api'

	export default {
		name: 'Survey',

    components: {
      Modal
    },

    props: {
		  luid: {
		    type: String
      }
    },

		data: () => ({
      logo: logoImage,
      questions: [
        {
          title: 'Насколько вероятно, что в ближайшие 3 месяца Вы будете заказывать уборку в Домовенке?',
          option: [ 0, 1, 2, 3, 4, 5 ],
          value: '',
          view: 'switch'
        },
        {
          title: 'Насколько вероятно, что Вы порекомендуете Домовенка друзьям и знакомым?',
          option: [ 0, 1, 2, 3, 4, 5 ],
          value: '',
          view: 'switch'
        },
        {
          title: 'С какой целью Вы посещали наш сайт в последний раз?',
          option: [ 'проверить баланс', 'сделать заказ', 'узнать новости о компании', 'узнать стоимость услуги', 'заказать уборку', 'оставить отзыв', 'просто так'],
          value: '',
          view: 'radio'
        },
        {
          title: 'Почему Вы не сделали заказ?',
          option: ['не работал сайт', 'передумал', 'нашел вариант лучше'],
          value: '',
          inputValue: '',
          view: 'radioOrFreeEntry',
          placeholder: 'Другая причина'
        },
        {
          title: 'Удобно ли Вам пользоваться нашим сайтом?',
          option: ['да', 'нет'],
          value: '',
          comment: '',
          view: 'radioAndComment',
          placeholder: 'Что именно?'
        },
        {
          title: 'Мы сильно продвинулись за последнее время. Появились новые услуги и возможности! Вы скачали наш личный кабинет? Подписаны на соцсети? Телеграм канал?',
          option: ['да', 'нет'],
          value: '',
          comment: '',
          view: 'radioAndComment',
          placeholder: 'Что используете?'
        },
      ],
      valid: true,
      loading: false,
      error: false,
      isModalShown: false
		}),

		methods: {
      validate () {
        let valid = this.questions.every((item) => {
          return item.value !== ''
        })

        this.valid = valid
        return valid
      },

       async submit () {
        if (this.validate() && !this.loading) {
          this.loading = true

          const params = {
            'luid': this.luid,
            'survey_title': 'Опрос старых клиентов',
            'survey_answers': []
          }

          this.questions.forEach((item) => {
            params['survey_answers'].push(
              {
                'question': item.title,
                'answers':
                  [
                    {
                      'value': item.value,
                      'comment': item.comment ? item.comment : ''
                    }
                  ]
              }
            )
          })

          try {
            const data =  await api.common.sendSurvey(params)

            this.loading = false
            this.isModalShown = true
          } catch (err) {
            this.loading = false
            this.error = true
          }
        }
      },

      closePopup () {
        this.isModalShown = false;
      },
		}
	}
</script>

<style scoped>
  @import "../../css/variables.css";
  @import "../../css/components/button.css";

  .survey {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fcfcfc;

    @media (--tablet) {
      padding-top: 30px;
      padding-bottom: 30px;
      background-color: #e5e5e5;
    }

    &__inner {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 20px;

      @media (--tablet) {
        width: 690px;
        margin: 0 auto;
        padding: 40px;
        background: #fcfcfc url("img/survey-bg.jpg") no-repeat center center;
        background-size: contain;
      }
    }

    &__logo-link {
      display: block;
      margin-bottom: 30px;
      outline: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        margin-bottom: 40px;
      }
    }

    &__title {
      margin-bottom: 20px;
      font-family: var(--base-font-family);
      font-size: 18px;
      line-height: 25px;
      font-weight: 400;
      color: #353535;

      @media (--tablet) {
        margin-bottom: 40px;
        font-size: 22px;
        line-height: 30px;
      }
    }

    &__item {
      margin-bottom: 25px;

      @media (--tablet) {
        margin-bottom: 40px;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__text {
      margin-bottom: 20px;
      font-family: var(--base-font-family);
      font-size: 16px;
      line-height: 27px;
      font-weight: 400;
      color: #353535;
    }

    &__inputs-group {
      &--row {
        display: flex;
        margin-right: 10px;

        &:last-child {

        }
      }
    }

    &__radio {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }

    &__label {
      cursor: pointer;
      position: relative;
      padding-left: 35px;
      font-family: var(--base-font-family);
      font-size: 16px;
      line-height: 29px;
      font-weight: 400;
      color: #353535;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        box-sizing: border-box;
        display: block;
        width: 17px;
        height: 17px;
        border: 1px solid #cbc9c9;
        border-radius: 50%;
        background-color: #ffffff;
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 3px;
        transform: translateY(-50%);
        box-sizing: border-box;
        display: none;
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background-color: #ff5a19;
      }

      &:hover:before {
        @media (--tablet) {
          border-color: #ff5a19;
        }
      }

      &--invalid {
        &::before {
          border-color: red;
        }
      }

      &--active {
        &::before {
          border-color: #ff5a19;
        }

        &::after {
          display: block;
        }
      }

      &--number {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25px;
        height: 25px;
        margin-right: 10px;
        padding-left: 0;
        border: 1px solid #cbc9c9;
        border-radius: 50%;
        color: #cbc9c9;
        background-color: #ffffff;

        &::before {
          display: none;
        }

        &::after {
          opacity: 0;
        }

        &:hover {
          @media (--tablet) {
            border-color: #ff5a19;
            color: #ff5a19;
            background-color: #ffffff;
          }
        }

        &-invalid {
          border-color: red;
          color: red;
        }

        &-active {
          border-color: #ff5a19;
          color: #ff5a19;
          background-color: #ffffff;
        }
      }
    }


    &__radio:checked ~ .survey__label::before {
      border-color: #ff5a19;
    }

    &__radio:checked ~ .survey__label::after {
      display: block;
    }

    &__radio:checked ~ .survey__label--number {
      border-color: #ff5a19;
      color: #ffffff;
      background-color: #ff5a19;
    }

    &__input {
      box-sizing: border-box;
      width: 177px;
      margin-top: 10px;
      padding: 0;
      border-top: none;
      border-right: none;
      border-left: none;
      border-bottom: 1px solid #353535;
      outline: none;
      font-family: var(--base-font-family);
      font-size: 16px;
      line-height: 27px;
      font-weight: 400;
      color: #353535;
      background-color: transparent;
      box-shadow: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
      -webkit-appearance: none;

      &:hover {
        @media (--tablet) {
          border-color: #ff5a19;
        }
      }

      &:focus {
        @media (--tablet) {
          -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
          border-color: #ff5a19;
        }
      }
    }

    input::-webkit-input-placeholder {
      color: #cbc9c9;
    }

    input::-moz-placeholder {
      color: #cbc9c9;
    }

    input:-moz-placeholder {
      color: #cbc9c9;
    }

    input:-ms-input-placeholder {
      color: #cbc9c9;
    }

    &__btn {
      width: 216px;
      outline: none;
      margin-left: auto;
      margin-right: auto;
      font-size: 16px;
      line-height: 26px;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      &:hover {
        @media (--tablet) {
          background-color: #f25518;
        }
      }

      &:focus {
        @media (--tablet) {
          background-color: #f25518;
        }
      }
    }

    &__modal {
      padding: 50px;
    }

    &__modal-title {
      margin-bottom: 30px;
      text-align: center;
      font-family: var(--base-font-family);
      font-size: 16px;
      line-height: 27px;
      font-weight: 400;
      color: #353535;

      @media (--tablet) {
        font-size: 18px;
      }
    }

    &__modal-text {
      text-align: center;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 24px;
      font-weight: 400;
      color: #353535;

      @media (--tablet) {
        font-size: 16px;
      }
    }

    &__modal-tel {
      outline: none;
      text-align: center;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 24px;
      font-weight: 400;
      color: #ff5a19;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        font-size: 16px;
      }

      &:hover {
        @media (--tablet) {
          color: #f25518;
        }
      }

      &:focus {
        @media (--tablet) {
          color: #f25518;
        }
      }
    }
  }

</style>

<template>
  <div class="application-services-details">
    <button class="application-services-details__btn-close" type="button" @click="close">Закрыть</button>

    <div v-for="room in rooms" class="application-services-details__item">
      <h3 class="application-services-details__title">{{ room.title }}:</h3>
      <ul class="application-services-details__list">
        <li v-for="(item, key) in config[room.value]" class="application-services-details__list-item">
          {{ serviceNames[room.value][key] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'ApplicationServicesDetails',

    props: {
      config: {
        type: Object,
        required: true
      }
    },

    data: () => ({
      rooms: [
        {
          title: 'Комната и коридор',
          value: 'room'
        },
        {
          title: 'Кухня',
          value: 'kitchen'
        },
        {
          title: 'Ванная',
          value: 'bathroom'
        }
      ]
    }),

    computed: {
      serviceNames() {
        return this.$store.state.services.namesServicesWorks
      }
    },

    methods: {
      close() {
        this.$emit('close')
      }
    }
  }
</script>

<style>
  @import "../../../../css/variables.css";

  .application-services-details {
    margin-top: -82px;
    padding: 15px 20px 20px 20px;
    background-color: #ffffff;

    @media (--tablet) {
      margin-top: 0;
      padding: 0;
    }

    &__btn-close {
      display: block;
      width: 100%;
      margin-bottom: 20px;
      text-align: right;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 1.3em;
      font-weight: 400;
      color: #000000;
      outline: none;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

      &:hover {
        @media (--tablet) {
          opacity: 0.7;
        }
      }

      &:focus {
        @media (--tablet) {
          opacity: 0.7;
        }
      }

      &:active {
        @media (--tablet) {
          opacity: 1;
        }
      }
    }

    &__title {
      margin-bottom: 20px;
      font-family: var(--base-font-family);
      font-size: 18px;
      line-height: 1.3em;
      font-weight: 400;
      color: #353535;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
    }

    &__item {
      margin-bottom: 30px;

      @media (--desktop) {
        margin-bottom: 40px;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
    &__list {
      margin: 0;
      padding: 0 0 0 20px;
    }

    &__list-item {
      margin-bottom: 5px;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 22px;
      font-weight: 400;
      color: #353535;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        font-size: 16px;
        line-height: 27px;
      }
    }
  }
</style>

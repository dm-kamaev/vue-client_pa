<template>
  <div class="order-employee">
    <div @click="show = true" class="order-employee__wrap">
      <img class="order-employee__img" :src="photoSrc" width="40" height="auto">
    </div>

    <p class="order-employee__text">{{ employee.employeeTitle }}</p>

    <modal :show="show" @close="closeModal">
      <div @click="show = true" class="order-employee__wrap order-employee__wrap--modal">
        <img class="order-employee__img" :src="photoSrc" width="150" height="auto">
      </div>
    </modal>
  </div>
</template>

<script>
  import Modal from '@/components/common/Modal'
  import api from 'vue_components/src/api'
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

  export default {
    name: 'OrderEmployee',

    components: {
      Modal
    },

    props: {
      employee: {
        type: Object,
        required: true
      }
    },

    data: () => ({
      show: false,
      photoSrc: ''
    }),

    methods: {
      ...mapActions(['defineError']),

      async getImagePath() {
        const params = {
          photoId: this.employee.photoId
        }

        try {
          const { filePath } = await api.common.getEmployeeImage(params)

          this.photoSrc = this.$store.state.common.isApp ? `${this.$store.state.common.apiUrl}${filePath}`: filePath
        } catch (error) {
          this.defineError({
           error: error,
           name: 'getEmployeeImage',
           params: params
          })
        }
      },

      closeModal() {
        this.show = false
      }
    },

    created() {
      if (this.employee.photoId) {
        this.getImagePath()
      }
    }
  }
</script>

<style>
  .order-employee {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    &__wrap {
      width: 40px;
      height: 40px;
      overflow: hidden;
      border-radius: 50%;
      background-color: #f8f4ec;

      &--modal {
        margin: 30px;
        width: 150px;
        height: 150px;
        border-radius: 0;
      }
    }

    &__img {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
    }

    &__text {
      position: relative;
      max-width: calc(100% - 55px);
      padding-left: 15px;
      overflow: hidden;
      line-height: 40px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>

<template>
  <div ref="social" class="ya-social-links"></div>
</template>

<script>
  export default {
    name: "ShareSocialLinks",

    props: {
      param: {
        type: Object,
        required: true
      }
    },

    mounted() {
      if (Ya) {
        Ya.share2(this.$refs.social, this.param);
      }
    }
  }
</script>

<style>
  @import "../../../css/variables.css";

  .ya-social-links .ya-share2__item_service_facebook .ya-share2__badge {
    background-color: var(--brand-color-orange);

    & .ya-share2__icon {
      background-repeat: no-repeat;
      background-position: center;
      background-size: 30px;
    }
  }

  .ya-social-links .ya-share2__item_service_vkontakte .ya-share2__badge {
    background-color: var(--brand-color-orange);

    & .ya-share2__icon {
      background-repeat: no-repeat;
      background-position: center;
      background-size: 30px;
    }
  }

  .ya-social-links .ya-share2__badge {
    border-radius: 50%;
  }

  .ya-social-links .ya-share2__item_service_odnoklassniki .ya-share2__badge {
    background-color: var(--brand-color-orange);

    & .ya-share2__icon {
      background-repeat: no-repeat;
      background-position: center;
      background-size: 30px;
    }
  }

  .ya-social-links .ya-share2__item {
    margin-right: 30px;

    &:last-child {
      margin-right: 0;
    }
  }

  .ya-social-links .ya-share2__container_size_m .ya-share2__item {
    margin-right: 30px;

    &:last-child {
      margin-right: 0;
    }
  }

  .ya-social-links .ya-share2__container_size_m .ya-share2__icon {
    width: 40px;
    height: 40px;
  }
</style>

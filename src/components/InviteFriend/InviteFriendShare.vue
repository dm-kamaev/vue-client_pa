<template>
  <div ref="social" class="invite-friend-share ya-social-links"></div>
</template>

<script>
  export default {
    name: "InviteFriendShare",

    props: {
      param: {
        type: Object,
        required: true
      }
    },

    mounted() {
      const share = Ya.share2(this.$refs.social, this.param);
    }
  }
</script>

<style>
  @import "../../css/variables.css";

  .invite-friend-share {
    .ya-share2__list {
      width: 100%;

      & .ya-share2__item {
        width: 100%;
      }

      & .ya-share2__link {
        width: 100%;
      }

      & .ya-share2__badge {
        position: relative;
        width: 100%;
        min-height: 46px;
        border-radius: 3px;
        background-color: #3b5998;

        &::before {
          content: 'Facebook';
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          font-family: var(--base-font-family);
          font-size: 14px;
          line-height: 24px;
          font-weight: 400;
          color: #ffffff;

          @media (--tablet) {
            font-size: 16px;
          }
        }
      }

      & .ya-share2__icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 20px;
        width: 28px;
        height: 28px;
      }
    }
  }
</style>

<template>
  <div class="invite-friend">
    <application-container :showSideBar="showSideBar">
      <div slot="content">

        <div class="invite-friend__inner">

          <div class="invite-friend__title-wrapper">
            <i class="invite-friend__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 325 325">
                <rect width="325" height="325" fill="#f3ede1"/>
                <path d="M325,69.92a107.5,107.5,0,1,0,0,142.47Z" fill="#50a7bc"/>
                <path d="M96.23,130.56h132a0,0,0,0,1,0,0V246.81a33,33,0,0,1-33,33h-66a33,33,0,0,1-33-33V130.56A0,0,0,0,1,96.23,130.56Z" fill="#753c30"/>
                <path d="M118.73,130.65h82.5a0,0,0,0,1,0,0V232.53A32.46,32.46,0,0,1,168.77,265h-19.5a30.54,30.54,0,0,1-30.54-30.54V130.65A0,0,0,0,1,118.73,130.65Z" fill="#542821"/>
                <rect x="143.23" y="220.65" width="36" height="60.42" fill="#ffb889"/>
                <path d="M179.23,222.16l-36.17.26.19,17.34c4.15,5.06,13.56,6.89,19,6.89,4.46,0,13.5-1.66,17-5.82Z" fill="#f58d6c"/>
                <path d="M229.93,169a14.6,14.6,0,0,0-11.14-4.26l.41-57H106.7v57.26a14.66,14.66,0,1,0,2,28.27c8.35,32.15,40.21,46.76,54,46.47,16-.34,45.35-15,53.72-46A14.65,14.65,0,0,0,229.93,169Z" fill="#ffb889"/>
                <circle cx="102.58" cy="194.55" r="3.5" fill="#fff"/>
                <circle cx="222.29" cy="194.13" r="3.5" fill="#fff"/>
                <path d="M136.19,142c1.14-.32,10.48,9.2,59.48,2.77,0,0,14.5-2.69,17.39,17.6l10.17-11.17s-5.75-19.5-6-21-54.17,8.17-54.17,8.17Z" fill="#f58d6c"/>
                <path d="M235.73,322.57H87.06v-38a23,23,0,0,1,23-23l33.34-9,14.67,25.95a3.11,3.11,0,0,0,5.4,0l15.26-26,34,9a23,23,0,0,1,23,23Z" fill="#fff"/>
                <path d="M228.23,132.28a66,66,0,0,0-132-1h0v.13c0,.28,0,.55,0,.83h0v30a7.39,7.39,0,0,0,1.09,3.87,7.14,7.14,0,0,1,5.39.09c1.54.62,4.18,3.4,3.86,9.34,3.37-.74,4.66-9.71,4.66-13.3V150.4h0a12.32,12.32,0,0,1,12.3-11.75l.34,0c1.65.57,3.38,1.1,5.21,1.59a31.18,31.18,0,0,1,4.95-17.48s.15,13,2.29,19.13a141.56,141.56,0,0,0,26.38,2.37c14.5,0,27.71-2,37.69-5.23l.42,0a12.31,12.31,0,0,1,12.22,11v12.32c0,3.59,1.55,7.15,5.61,11,.13-1.83,1.5-7.08,2.75-7.64a5,5,0,0,1,3.31-.1,3.61,3.61,0,0,1,2.09.92,8.81,8.81,0,0,0,1.24-4.22V132.25Z" fill="#753c30"/>
                <path d="M157.39,188.15s5.32,5.26,11.12-.05" fill="none" stroke="#e87862" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/>
                <path d="M124.31,159.65c.14,0,7.3-9.12,24.05-3.75" fill="none" stroke="#753c30" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/>
                <path d="M201.36,159.65c-.14,0-7.3-9.12-24.05-3.75" fill="none" stroke="#753c30" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/>
                <path d="M143.43,169.64a4.2,4.2,0,1,1-4.2-4.2A4.2,4.2,0,0,1,143.43,169.64Z" fill="#753c30"/>
                <path d="M129.75,168.94a15.48,15.48,0,0,1,8.31-3.46,12.37,12.37,0,0,1,9.69,2.44" fill="none" stroke="#753c30" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
                <circle cx="187.16" cy="169.64" r="4.45" transform="translate(-33.97 47.54) rotate(-13.28)" fill="#753c30"/>
                <path d="M197.61,168.9s-2.93-2.85-8.8-3.67a13.14,13.14,0,0,0-10.26,2.59" fill="none" stroke="#753c30" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
                <path d="M149.36,206.49h28.5s-2.94,8.73-13.57,8.79C153,215.34,149.36,206.49,149.36,206.49Z" fill="#e5504c"/>
              </svg>
            </i>
            <span class="invite-friend__title">500 рублей для ваших друзей</span>
          </div>
          <p class="invite-friend__text">Первый заказ будет стоить на 500 рублей меньше вашим друзьям. Вы получите 500
            рублей после их первого заказа</p>
          <div class="invite-friend__links-wrapper">
            <div class="invite-friend__link-block">

              <span
              class="invite-friend__link-text"
              ref="inviteLink">{{ shareLink }}</span>

              <button
                class="invite-friend__copy-btn"
                @click.prevent="copyBtnClickHandler">
                Скопировать
              </button>
            </div>
            <invite-friend-share
              class="invite-friend__social-links"
              :param="socialParams"
            />
          </div>
          <p class="invite-friend__tip">Если опубликовать приглашение в Facebook больше друзей его увидят и смогут
            зарегистрироваться</p>

        </div>

      </div>
    </application-container>
  </div>
</template>

<script>
  import ApplicationContainer from '@/components/NewFullApplication/ApplicationContainer'
  import InviteFriendShare from './InviteFriendShare'
  import { mapMutations, mapState, mapActions } from 'vuex'
  import types from '@/store/types'
  import transform from '@/utils/transform'

  export default {
    name: 'InviteFriend',

    components: {
      ApplicationContainer,
      InviteFriendShare
    },

    data: () => ({
      showSideBar: false
    }),

    computed: {
      shareLink() {
        return `www.domovenok.su/?invite=${transform(this.$store.state.client.clientId)}`
      },

      socialParams() {
        return {
          content: {
            url: this.shareLink,
            title: 'Дарю скидку на первую уборку',
            description: 'Скидка для моих друзей. Делюсь с вами скидкой 500 рублей на первую уборку от Домовёнка',
            image: 'www.domovenok.su/media/general/stock/discount_on_cleaning.jpg'
          },
          theme: {
            services: "facebook"
          }
        }
      }
    },

    methods: {

      ...mapMutations({
        showAlert: types.SHOW_ALERT
      }),

      ...mapActions(['setPageOldView']),

      copyBtnClickHandler() {
        const range = document.createRange();
        range.selectNodeContents(this.$refs.inviteLink);
        window.getSelection().addRange(range);

        document.execCommand('copy');

        window.getSelection().removeAllRanges();
        this.showAlert({ view: 'message', text: `Ссылка была скопирована`, timer: 3000, type: 'success' })
      }
    },

    mounted() {
      this.setPageOldView(false)
    }
  }
</script>

<style scoped>
  @import "../../css/variables.css";

  .invite-friend {
    &__inner {
      box-sizing: border-box;
      margin-top: -82px;
      padding: 25px 20px;

      @media (--tablet) {
        margin-top: 0;
        padding: 0;
      }

      @media (--desktop) {
        padding: 20px;
      }
    }

    &__title-wrapper {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }

    &__icon {
      flex-shrink: 0;
      display: block;
      width: 47px;
      height: 47px;
      margin-right: 20px;
      border-radius: 50%;
      overflow: hidden;

      @media (--tablet) {
        margin-right: 30px;
      }
    }

    &__title {
      font-family: var(--base-font-family);
      font-size: 18px;
      line-height: 25px;
      font-weight: 400;
      color: #353535;

      @media (--tablet) {
        font-size: 24px;
        line-height: 33px;
      }
    }

    &__text {
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 24px;
      font-weight: 400;
      color: #353535;

      @media (--tablet) {
        font-size: 16px;
        line-height: 27px;
      }
    }

    &__links-wrapper {
      margin-top: 20px;
      margin-bottom: 20px;

      @media (--tablet) {
        display: flex;
      }
    }

    &__link-block {
      display: flex;
      box-sizing: border-box;
      width: 100%;
      max-height: 46px;
      margin-bottom: 20px;
      border: 1px solid #cbc9c9;
      border-radius: 3px;

      @media (--tablet) {
        width: calc(100% - 220px);
        margin-bottom: 0;
      }
    }

    &__link-text {
      display: block;
      width: calc(100% - 120px);
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 24px;
      font-weight: 400;
      color: #353535;

      @media (--tablet) {
        width: calc(100% - 115px);
        font-size: 16px;
      }
    }

    &__copy-btn {
      width: 120px;
      padding: 10px 20px 10px 10px;
      margin: 0;
      outline: none;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 24px;
      font-weight: 400;
      color: #ff5a19;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        width: 140px;
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

    &__social-links {
      @media (--tablet) {
        width: 250px;
        margin-left: 20px;
      }

      & .ya-social-links .ya-share2__item_service_facebook .ya-share2__badge {
        background-color: #3b5998;
      }
    }

    &__tip {
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 24px;
      font-weight: 400;
      color: #888888;

      @media (--tablet) {
        font-size: 16px;
        line-height: 27px;
      }
    }
  }
</style>


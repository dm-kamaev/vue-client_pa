<template>
  <nav class="main-header-menu">
    <ul class="main-header-menu__list">
      <li v-for="(item, index) in menu"
          :class="{'main-header-menu__item--active': item.active, 'main-header-menu__item--sub':item.list }" class="main-header-menu__item">
        <a v-if="item.href" :href="item.href" class="main-header-menu__link">{{item.name}}</a>
        <p @click="setActive(index)" v-else class="main-header-menu__link">{{item.name}}</p>

        <ul v-if="item.list" class="main-header-menu__list  main-header-menu__list--sub">
          <li v-for="subitem in item.list"
              :class="{'main-header-menu__item-sub--active': subitem.active}"
              class="main-header-menu__item-sub">
            <a v-if="subitem.href && !subitem.router"
               :href="subitem.href"
               class="main-header-menu__link-sub"
               @click="close">
              {{subitem.name}}
            </a>

            <router-link v-else-if="subitem.href && subitem.router" :to="subitem.href" class="main-header-menu__link-sub"  @click.native="close">{{subitem.name}}</router-link>

            <a v-else-if="subitem.action === 'signOut'"
               class="main-header-menu__link-sub"
               @click="signOut">
              {{subitem.name}}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import moment from 'moment'
  import PerfectScrollbar from 'perfect-scrollbar';
  import transform from '@/utils/transform'

  export default {
    name: 'MainHeaderMenu',

    data: () => ({
      listMenu: [
        {
          name: 'Поддерживающая уборка',
          href: '/podderzhka',
          router: false
        },
        {
          name: 'Генеральная уборка',
          href: '/generalnaya_uborka',
          router: false
        },
        {
          name: 'Мытье окон',
          href: '/mite_okon',
          router: false
        },
        {
          name: 'Физическим лицам',
          active: false,
          list: [
            {
              name: 'Домработница',
              href: '/domrabotnica',
              router: false
            },
            {
              name: 'Глажка',
              href: '/glazhka',
              router: false
            },
            {
              name: 'Уборка после ремонта',
              href: '/posle_remonta',
              router: false
            },
            {
              name: 'Уборка коттеджей',
              href: '/uborka-kottedzhej',
              router: false
            },
            {
              name: 'Химчистка',
              href: '/himchistka',
              router: false
            },
            {
              name: 'Домашний мастер',
              href: '/vizov_mastera_na_dom',
              router: false
            },
            {
              name: ' Обработка поверхностей',
              href: '/obrabotka_poverhnostey',
              router: false
            }
          ],
          router: false
        },
        {
          name: 'Юридическим лицам',
          active: false,
          list: [
            {
              name: 'Уборка офисов',
              href: '/uborka_ofisov',
              router: false
            },
            {
              name: 'Уборка производственных помещений',
              href: '/uborka-proizvodstvennyh-pomewenij',
              router: false
            },
            {
              name: 'Офисный мастер',
              href: '/ofisnyy-master',
              router: false
            },
            {
              name: 'Мытьё стекол',
              href: '/mite_stekol',
              router: false
            },
            {
              name: 'Мытьё фасадов',
              href: '/myte-fasadov',
              router: false
            },
            {
              name: 'Промышленный альпинизм',
              href: '/promyshlennyj-alpinizm',
              router: false
            },
            {
              name: ' Обработка поверхностей',
              href: '/obrabotka_poverhnostey',
              router: false
            }
          ],
          router: false
        },
        {
          name: 'О нас',
          active: false,
          list: [
            {
              name: 'Главная',
              href: '/',
              router: false
            },
            {
              name: 'О компании',
              href: '/about/',
              router: false
            },
            {
              name: 'Услуги',
              href: '/uslugi/',
              router: false
            },
            {
              name: 'Важно знать',
              href: '/vazhno_znat/',
              router: false
            },
            {
              name: 'Вопросы и ответы',
              href: '/faq/',
              router: false
            },
            {
              name: 'Новости',
              href: '/news/',
              router: false
            },
            {
              name: 'Статьи',
              href: '/articles/',
              router: false
            },
            {
              name: 'Специальные акции',
              href: '/skidki_akcii/',
              router: false
            },
            {
              name: 'Вакансии',
              href: '/vakansii/',
              router: false
            },
            {
              name: 'Обслуживание по графику',
              href: '/davay_druzhit/',
              router: false
            },
            {
              name: 'Отзывы',
              href: '/otzivi/',
              router: false
            },
            {
              name: 'Цены',
              href: '/price/',
              router: false
            }
          ],
          router: false
        },
        {
          name: 'Контакты',
          href: '/contacts/',
          router: false
        }
      ]
    }),

    computed: {
      menu() {
        const inviteHref = `/share/cln${transform(this.$store.state.client.clientId)}`

        const objects = []

        for (let key in this.$store.state.client.objects) {
          objects.push(this.$store.state.client.objects[key])
        }

        const ordersHref = `/adr${transform(objects[0].objectId)}`

        const clientMenu = {
          name: this.$store.state.client.fullTitle,
          active: true,
          list: [
            {
              name: 'Заказы',
              href: ordersHref,
              router: true,
              active: this.activeMenuOrders
            },
            {
              name: 'Профиль',
              href: '/profile',
              router: true,
              active: this.activeMenuProfile
            },
            {
              name: 'Уборки бесплатно',
              href: inviteHref,
              router: true,
              active: this.activeMenuInvitation
            }
          ]
        };

        if (this.$store.state.client.balanceChecked) {
          clientMenu.list.push({
            name: 'Детали платежей',
            href: `/psm${moment().format('YYYYMM')}`,
            router: true,
            active: this.activeMenuPayment
          })
        }

        if (this.$store.state.employee.employeeId && !this.$store.state.common.isApp) {
          clientMenu.list.push({
            name: 'ЛК сотрудника',
            href: '/staff/',
            router: false
          })
        }

        clientMenu.list.push({
          name: 'Выход',
          action: 'signOut'
        });

        if (this.$store.state.common.isApp) {
          return [
            clientMenu
          ]
        }

        return [
          clientMenu,
          ...this.listMenu
        ]
      },

      activeMenuOrders() {
        const regOfOrders = new RegExp('/adr')

        return regOfOrders.test(this.$store.state.route.fullPath)
      },

      activeMenuPayment() {
        const regOfPayment = new RegExp('/psm')

        return regOfPayment.test(this.$store.state.route.fullPath)
      },

      activeMenuInvitation() {
        const regOfInvitation = new RegExp('/share')

        return regOfInvitation.test(this.$store.state.route.fullPath)
      },

      activeMenuProfile() {
        const regOfInvitation = new RegExp('/profile')

        return regOfInvitation.test(this.$store.state.route.fullPath)
      }
    },

    methods: {

      ...mapActions(['signOut']),

      setActive(i) {
        this.menu.forEach((item) => {
          if (item.active) {
            item.active = false
          }
        })

        this.menu[i].active = true
      },

      close() {
        this.$emit('close')
      }
    },

    mounted() {
      new PerfectScrollbar(this.$el)
    }
  }
</script>

<style>
  @import "../../css/variables.css";
  @import "../../../node_modules/perfect-scrollbar/css/perfect-scrollbar.css";

  .main-header-menu {
    position: relative;

    &__list {
      box-sizing: border-box;
      margin: 0;
      padding: 30px 8% 30px 8%;

      @media (--tablet) {
        padding: 30px;
      }

      &--sub {
        margin-left: 10px;
        padding: 0;
        background-color: #ffffff;

        @media (--tablet) {
          padding: 0;
        }

        @media (--desktop) {
          padding-top: 0;
        }
      }
    }

    &__item {
      position: relative;
      margin-top: 25px;
      padding-left: 30px;
      list-style: none;
      font-size: var(--font-size-md);
      line-height: 20px;
      color: var(--text-color);
      letter-spacing: 1.5px;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      &:first-child {
        margin-top: 0;
      }

      &:hover .main-header-menu__link {
        @media (--tablet) {
          color: var(--new-text-color-orange);
        }
      }

      &--sub {
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          padding: 0;
          background-image: url('img/menu-check.svg');
          background-repeat: no-repeat;
          background-position: center 0;
        }

        &.main-header-menu__item--active {
          &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 20px;
            height: 20px;
            background-image: url('img/menu-check.svg');
            background-repeat: no-repeat;
            background-position: center -40px;
          }
        }
      }

      &--active .main-header-menu__link {
        color: var(--new-text-color-orange);
      }
    }

    &__item--active .main-header-menu__item-sub {
      display: block;
    }

    &__item-sub {
      display: none;
      margin-top: 10px;
      font-size: 16px;
      color: var(--new-border-color);

      &--exit {
        margin-top: 20px;
      }
    }

    &__item-sub--active .main-header-menu__link-sub {
      position: relative;
      z-index: 1;

      &::after {
        content: "";
        position: absolute;
        bottom: -4px;
        left: -2px;
        width: 100%;
        height: 2px;
        border-bottom: 1px solid rgba(105, 47, 35, 0.3);
      }
    }

    &__link {
      color: var(--new-text-color);
      outline: none;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      &:active {
        color: var(--new-text-color-orange);
      }

      &:hover {
        @media (--tablet) {
          color: var(--new-text-color-orange);
        }
      }

      &:focus {
        @media (--tablet) {
          color: var(--new-text-color-orange);
        }
      }
    }

    &__link-sub {
      outline: none;
      font-size: var(--font-size-sm);
      color: var(--new-color-light-grey);
      background-color: #ffffff;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      &:hover {
        @media (--tablet) {
          position: relative;
          z-index: 1;
          color: var(--new-text-color-orange);
        }
      }

      &:focus {
        @media (--tablet) {
          position: relative;
          z-index: 1;
          color: var(--new-text-color-orange);
        }
      }
    }

    &__item-sub--active .main-header-menu__link-sub:hover::after {
      border-color: var(--new-border-color-orange);
    }
  }

</style>

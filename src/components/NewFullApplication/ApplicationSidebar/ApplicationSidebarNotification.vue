<template>
   <div class="application-sidebar-notification">
     <p class="application-sidebar-notification__text">Цена зависит от даты уборки</p>
   </div>
</template>
<script>
	export default {
		name: 'ApplicationSidebarNotification',

		data: () => ({

		}),

		computed: {

		},

		methods: {

		}
	}
</script>

<style scoped>
  .application-sidebar-notification {
    min-height: 38px;
    padding-left: 25px;
    padding-right: 25px;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
    &__text {
      text-align: center;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 1.3em;
      font-weight: 400;
      color: #353535;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
    }
  }

</style>

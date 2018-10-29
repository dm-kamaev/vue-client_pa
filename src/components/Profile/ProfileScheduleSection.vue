<template>
  <div class="profile__schedule-wrapper">

    <profile-schedule-card v-for="item in schedule" key="item.name"/>
  </div>
</template>

<script>
  import ProfileScheduleCard from '@/components/Profile/ProfileScheduleCard'

	export default {
		name: 'ProfileScheduleSection',

    components: {
      ProfileScheduleCard
    },

		data: () => ({}),
		computed: {},
		methods: {}
	}
</script>
<style scoped>
</style>

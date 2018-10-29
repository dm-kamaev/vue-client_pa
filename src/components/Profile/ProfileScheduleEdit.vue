<template>
  <form class="profile__section">
    <h3 class="profile__section-title  profile__section-title--form">График уборок</h3>

    <div class="profile__form-group">
      <label class="profile__label" for="address">Адрес</label>
      <p class="profile__text  profile__text--form">Звёздный бульвар, 15с1, кв. 125</p>
      <input class="profile__input  hidden" id="address" type="text" name="address">
    </div>

    <div class="profile__form-group">
      <label class="profile__label" for="frequency">Частота</label>
      <p class="profile__text  profile__text--form">Раз в неделю (четверг)</p>
      <input class="profile__input  hidden" id="frequency" type="text" name="frequency">
    </div>
    <div class="profile__form-group">
      <label class="profile__label" for="time">Время</label>
      <p class="profile__text  profile__text--form">09:00</p>
      <input class="profile__input  hidden" id="time" type="text" name="services">
    </div>
    <div class="profile__form-group">
      <label class="profile__label" for="services">Услуги</label>
      <p class="profile__text  profile__text--form">
        <span>Поддерживающая уборка, 40 м2</span><br>
        <span class="profile__text">Глажка 1 час</span>
      </p>
      <input class="profile__input  hidden" id="services" type="text" name="services">
    </div>
    <div class="profile__form-group">
      <div class="profile__checkbox-wrapper">
        <input class="profile__checkbox" type="checkbox" name="key" id="key">
        <label class="profile__checkbox-label" for="key">Ключ в офисе (подробне)</label>
      </div>
      <div class="profile__checkbox-wrapper">
        <input class="profile__checkbox" type="checkbox" name="animal" id="animal">
        <label class="profile__checkbox-label" for="animal">Есть животное (подробнее)</label>
      </div>
    </div>
    <div class="profile__form-group">
      <textarea class="profile__textarea" placeholder="Пожелание по уборке"></textarea>
    </div>
    <button class="btn" type="submit">Сохранить</button>

  </form>
</template>

<script>
	export default {
		name: 'ProfileScheduleEdit',

		data: () => ({}),
		computed: {},
		methods: {}
	}
</script>
<style scoped>
</style>

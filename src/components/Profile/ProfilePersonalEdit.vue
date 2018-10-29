<template>
  <div>
    <h2 class="profile__title">Редактировать профиль</h2>

    <form class="profile__section">

      <div class="profile__form-group">
        <input class="profile__upload" type="file" id="images">
        <label class="profile__upload-label" for="images"></label>
      </div>
      <div class="profile__form-group  profile__form-group--row">
        <div class="profile__input-wrapper  profile__input-wrapper--row">
          <label class="profile__label" for="last-name">Фамилия</label>
          <input class="profile__input" id="last-name" type="text" name="name" placeholder="Черняк">
        </div>
        <div class="profile__input-wrapper  profile__input-wrapper--row">
          <label class="profile__label" for="name">Имя</label>
          <input class="profile__input" id="name" type="text" name="name" placeholder="Мария">
        </div>
      </div>
      <div class="profile__form-group  profile__form-group--tablet-row">
        <div class="profile__input-wrapper  profile__input-wrapper--tablet-row">
          <label class="profile__label" for="phone">Телефон</label>
          <input class="profile__input" id="phone" type="tel" name="phone" placeholder="8 (915) 456-84-55">
        </div>
        <div class="profile__input-wrapper  profile__input-wrapper--tablet-row">
          <label class="profile__label" for="email">Электоронная почта</label>
          <input class="profile__input" id="email" type="email" name="email" placeholder="Chernyak@gmail.com">
        </div>
      </div>
      <button class="btn  btn--small  profile__form-btn" type="submit">Сохранить</button>
    </form>

  </div>
</template>

<script>
	export default {
		name: 'ProfilePersonalEdit',

		data: () => ({}),

		computed: {},

		methods: {}
	}
</script>
<style scoped>
</style>

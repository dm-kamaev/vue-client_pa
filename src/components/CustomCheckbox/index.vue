<template>
  <label class="custom-checkbox">
    <input type="checkbox" class="custom-checkbox__input" :name="name" :checked="value" @change="change">
    <span class="custom-checkbox__text">{{ title }}
      <span class="custom-checkbox__note" v-if="note" @click.stop.prevent="openNote">?</span>
    </span>
    <span class="custom-checkbox__check"></span>
    <span class="custom-checkbox__indicator"></span>
  </label>
</template>

<script>
	export default {
		name: 'CustomCheckbox',

    props: {
		  title: {
		    type: String
      },

      value: {
		    type: Boolean,
        required: true
      },

      name: {
		    type: String,
        default: 'name'
      },

      note: {
		    type: String
      }
    },

    computed: {
		  changeValue() {
        return !this.value
      }
    },

		methods: {
		  change() {
		    this.$emit('input', this.changeValue)
      },

      openNote(e) {
        const coordinate = e.currentTarget.getBoundingClientRect()
		    this.$emit('openNote', this.note, coordinate)
      }
    }
	}
</script>

<style>
  @import "../../css/variables.css";

  .custom-checkbox {
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    line-height: 1.3em;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

    @media (--tablet) {
      font-size: 16px;
    }

    &:hover {
      & .custom-checkbox__indicator {
        border-color: #ff5a19;
      }
    }

    &__text {
      width: calc(100% - 40px);
      color: #353535;
    }

    &__indicator {
      position: relative;
      display: block;
      -webkit-align-self: center;
      -ms-grid-row-align: center;
      align-self: center;
      width: 20px;
      height: 20px;
      background-color: #ffff;
      border: 1px solid #cbc9c9;
      border-radius: 3px;
    }

    &__check {
      position: absolute;
      top: 5px;
      left: 5px;
      z-index: 1;
      width: 12px;
      height: 12px;
      background-repeat: no-repeat;
      background-position: center;
    }

    &__input {
      opacity: 0;
      position: absolute;
      left: 0;
      width: 22px;
      height: 22px;
      padding: 0;

      &:checked ~ .custom-checkbox__indicator {
        border-color: #ff5a19;
      }
      &:checked ~ .custom-checkbox__check {
        background-image: url("img/tick.svg");
      }
    }

    &__note {
      display: inline-block;
      text-align: center;
      transform: translateY(-12px)translateX(3px);
      width: 12px;
      height: 12px;
      outline: 0;
      border-radius: 50%;
      border: 1px solid #cbc9c9;
      color: #cbc9c9;
      font-family: var(--base-font-family);
      font-size: 8px;
      line-height: 12px;
      font-weight: 600;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);
    }

  }
</style>

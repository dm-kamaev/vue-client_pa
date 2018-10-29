<template>
  <custom-select :options="list" label="title" track-by="title" @select="select" :value="selected" maxHeight="110"/>
</template>

<script>
  import CustomSelect from "@/components/CustomSelect/index.vue";

  export default {
    name: 'BaseSelectTime',

    components: {
      CustomSelect
    },

    props: {
      list: {
        type: Array,
        required: true
      },

      active: {
        type: Number,
        required: true
      }
    },

    data: () => ({
      selected: null
    }),

    computed: {

    },

    methods: {
      select(value) {
        this.$emit('setActive', value.title)
      }
    },

    mounted() {
      this.selected = this.list[this.active]
      this.$emit('setActive', this.list[this.active].title)
    }
  }
</script>

<style>
  @import "../../../css/components/multiselect.css";
</style>

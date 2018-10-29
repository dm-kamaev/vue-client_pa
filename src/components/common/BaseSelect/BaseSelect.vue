<template>
  <multiselect
    v-model="selected"
    :options="list"
    track-by="title"
    label="title"
    @select="select"
    :clearOnSelect="true"
    :show-labels="false"
    :placeholder="placeholder"
    :searchable="searchable"
    :hideSelected="hideSelected"
    :allowEmpty="allowEmpty"
    :taggable="taggable"
    :tagPlaceholder="tagPlaceholder"
    :showPointer="true"
    :max-height="110"
    :props="props">
  </multiselect>
</template>

<script>
  import Multiselect from 'vue-multiselect'

  export default {
    name: 'BaseSelect',

    components: {
      Multiselect
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
      selected: null,
      searchable: false,
      placeholder: '',
      hideSelected: true,
      allowEmpty: false,
      taggable: true,
      tagPlaceholder: '',
      showPointer: false,
      props: {
        selectedLabel: ''
      }
    }),

    computed: {

    },

    methods: {
      select(value) {
        this.list.forEach((item, index) => {
          if (item.value === value.value) {
            this.$emit('setActive', index)
          }
        })
      }
    },

    mounted() {
      this.selected = this.list[this.active]
      this.$emit('setActive', this.active)
    }
  }
</script>

<style>
  @import "../../../css/components/multiselect.css";
</style>

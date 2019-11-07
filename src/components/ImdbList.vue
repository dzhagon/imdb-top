<template>
  <div>
    <div class="button" @click.stop="toggleOrder">
      <span v-show="!reversed">Order ↑</span>
      <span v-show="reversed">
        Order ↓
      </span>
    </div>
    <div class="imdb-list" v-if="items && orderedItems.length">
      <item v-for="(film, key) in orderedItems" :key="key" :item="film"></item>
    </div>
  </div>
</template>

<script>
import item from '@/components/ImdbListItem.vue'

export default {
  name: 'ImdbList',
  components: {
    item
  },
  data() {
    return {
      reversed: false
    }
  },
  props: {
    cardView: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array,
      default: null
    }
  },

  methods: {
    toggleOrder() {
      this.reversed = !this.reversed
    }
  },
  created() {},
  computed: {
    reversedItems() {
      return [...this.items].reverse()
    },
    orderedItems() {
      return this.reversed ? this.reversedItems : this.items
    }
  }
}
</script>

<style lang="scss" scoped>
.imdb-list {
  counter-reset: imdb-counter;
  display: grid;
  grid-template-columns: repeat(auto-fill, 10rem);
  grid-gap: 0.5rem;
  justify-content: space-around;
}
</style>

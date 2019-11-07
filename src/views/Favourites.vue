<template>
  <div class="favourites">
    <h1>My favourites</h1>
    <template v-if="favourites && favourites.length">
      <list :items="favourites"></list>
    </template>
    <template v-else>
      <p>There is no favourite films yet.</p>
      <p>Would you like to choose?</p>
      <router-link to="/" class="button">Choose favourite</router-link>
    </template>
  </div>
</template>

<script>
import list from '@/components/ImdbList.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    list
  },
  props: {
    items: {
      type: Array,
      default: null
    }
  },
  computed: {
    ...mapGetters(['favourites'])
  }
}
</script>

<style lang="css" scoped></style>

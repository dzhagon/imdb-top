<template>
  <div class="page-top100">
    <h1>IMDB films: Top 100</h1>
    <template v-if="top100.length">
      <list :items="top100"></list>
    </template>
    <template v-else>
      There is no data yet.
    </template>
  </div>
</template>

<script>
import list from '@/components/ImdbList.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Top100',
  components: {
    list
  },

  computed: {
    ...mapGetters(['top100'])
  }
}
</script>

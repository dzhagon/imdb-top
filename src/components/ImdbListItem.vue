<template>
  <div class="imdb-list__item" v-if="item">
    <div class="imdb-position">{{ item.position }}</div>
    <img :src="item.img" alt="" />
    <svg
      :class="{
        'favourite-btn': true,
        selected: selected
      }"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      @click="toggleFavourite"
    >
      <path
        d="M 25 47.300781 L 24.359375 46.769531 C 23.144531 45.753906 21.5 44.652344 19.59375 43.378906 C 12.167969 38.40625 2 31.601563 2 20 C 2 12.832031 7.832031 7 15 7 C 18.894531 7 22.542969 8.734375 25 11.699219 C 27.457031 8.734375 31.105469 7 35 7 C 42.167969 7 48 12.832031 48 20 C 48 31.601563 37.832031 38.40625 30.40625 43.378906 C 28.5 44.652344 26.855469 45.753906 25.640625 46.769531 Z"
      ></path>
    </svg>
    <div class="text">{{ item.title }}</div>
  </div>
</template>

<script>
export default {
  name: 'ImdbListItem',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  methods: {
    toggleFavourite() {
      this.$store.dispatch('toggleFavourite', this.item)
    }
  },
  computed: {
    selected() {
      return this.item.favourite ? this.item.favourite : false
    }
  }
}
</script>

<style lang="css" scoped>
.favourite-btn {
  display: block;
  width: 2.3rem;
  height: 2.3rem;
  fill: rgba(128, 128, 128, 0.5);
  right: 5px;
  top: 3px;
  position: absolute;
  cursor: pointer;
  stroke: black;
}
.favourite-btn:hover {
  fill: rgba(220, 42, 42, 0.75);
}

.favourite-btn.selected:hover,
.favourite-btn.selected {
  fill: rgb(239, 60, 60);
}
.imdb-list__item:hover .favourite-btn {
  display: block;
}
.imdb-position {
  content: counter(imdb-counter);
  counter-increment: imdb-counter;
  position: absolute;
  background: #ffffff;
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  line-height: 2.1rem;
  font-weight: bold;
  font-size: 0.9em;
  margin: 3px;
  border: 1px solid black;
  left: 3px;
  top: 3px;
}

.imdb-list__item {
  position: relative;
  overflow: hidden;
  height: 15rem;
  width: 10rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  background: black;
}
.imdb-list__item > img {
  height: 100%;
  align-self: center;
  object-fit: cover;
}
.text {
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: center;
    color: whitesmoke;
    background: rgba(0, 0, 0, 0.7);
    padding: .5rem;
    text-shadow: 1px 1px 3px black;
    width: 92%;
}
</style>

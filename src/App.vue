<template>
  <div id="app">
    <toast></toast>
    <header class="header">
      <div id="nav">
        <router-link to="/">TOP 100</router-link> |
        <router-link to="/favourites">Favourites</router-link>
      </div>
    </header>
    <div class="content">
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <footer class="footer">
      <div>
        created by <br />
        <a href="https://t.me/@andreyka_bonart">Andrey Proskurin</a>
      </div>
    </footer>
  </div>
</template>

<script>
import toast from '@/components/Toast.vue'
export default {
  components: {
    toast
  },
  beforeMount() {
    this.$store.dispatch('load')
    this.$store.dispatch('loadFavourites')
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-flow: column;
  min-height: 100vh;
}
.content {
  flex-grow: 1;
  margin: 1rem;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
footer {
  background: black;
  color: white;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
footer a {
  color: lightskyblue;
  text-decoration: none;
}
</style>

<template>
  <div :class="{ toast: true, show: toastVisible }">{{ toastText }}</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    time: {
      type: Number,
      default: 0.5
    }
  },
  computed: {
    ...mapState(['toastText', 'toastVisible'])
  }
}
</script>

<style lang="css" scoped>
.toast {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  z-index: 1000;
  display: none;
  animation: fadeOut .1s linear forwards;
}
.show {
  display: block;
  animation: fadeIn .1s linear forwards;
}
@keyframes fadeIn {
	0% 	{  transform: translateY(40px);}
	100% {  transform: translateY(0px);}
}
@keyframes fadeOut {
  0% {  transform: translateY(0px);}
  100% 	{  transform: translateY(40px);}
}
</style>

<template>
  <Lottie :options="defaultOptions" :height="220" :width="180" />
</template>

<script>
import Lottie from 'vue-lottie'
import * as animationData from '~/assets/user-lottie.json'

export default {
  components: {
    Lottie,
  },
  data() {
    return {
      defaultOptions: { animationData: animationData.default, loop: false },
    }
  },
}
</script>

<style></style>

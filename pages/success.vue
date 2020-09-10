<template>
  <div class="d-flex align-center justify-center mx-auto">
    <Lottie :options="lottieSucessOptions" :height="400" :width="400" />
  </div>
</template>

<script>
import Lottie from 'vue-lottie'
import * as success from '~/assets/success-man.json'
export default {
  components: {
    Lottie,
  },
  data() {
    return {
      lottieSucessOptions: { animationData: success.default, loop: false },
    }
  },
}
</script>

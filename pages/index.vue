<template>
  <div class="signup mx-auto">
    <v-row align="center">
      <v-col cols="12" md="6"><SignupLottie /></v-col>
      <v-col cols="12" md="6"><SignupForm /> </v-col>
    </v-row>
  </div>
</template>

<script>
import SignupForm from '~/components/SignupForm.vue'
import SignupLottie from '~/components/SignupLottie.vue'

export default {
  components: { SignupForm, SignupLottie },
}
</script>
<style scoped>
.signup {
  max-width: 750px;
  width: 100%;
}
</style>

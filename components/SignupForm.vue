<template>
  <div>
    <v-form ref="form" @submit.prevent="handleSubmit">
      <v-text-field
        v-model="firstName"
        :rules="nameRules"
        prepend-inner-icon="mdi-account-tie-outline"
        label="First Name"
        validate-on-blur
        required
        autofocus
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        :rules="nameRules"
        prepend-inner-icon="mdi-account-outline"
        label="Last Name"
        validate-on-blur
        required
      ></v-text-field>
      <div class="d-flex align-center">
        <v-text-field
          v-model="email"
          type="email"
          prepend-inner-icon="mdi-email-outline"
          :rules="emailRules"
          label="Your e-mail address"
          validate-on-blur
          required
          :error-messages="
            !serverValidEmail && emailChecked ? ['E-mail must be valid'] : ''
          "
          :error="!serverValidEmail && emailChecked"
        ></v-text-field>
        <v-progress-circular
          v-if="validatingEmail"
          color="#2CF66F"
          indeterminate
          size="30"
          class="mx-4"
        ></v-progress-circular>
        <v-tooltip
          v-if="!validatingEmail && emailChecked && serverValidEmail"
          right
        >
          <template v-slot:activator="{ on }">
            <div v-on="on">
              <Lottie :options="lottieSucessOptions" :height="60" :width="60" />
            </div>
          </template>
          <span>Valid Email</span>
        </v-tooltip>

        <v-tooltip
          v-if="!validatingEmail && emailChecked && !serverValidEmail"
          right
        >
          <template v-slot:activator="{ on }">
            <div v-on="on">
              <Lottie
                :options="lottieErrorOptions"
                :height="40"
                :width="40"
                class="mx-4"
              />
            </div>
          </template>
          <span>Invalid Email</span>
        </v-tooltip>
      </div>

      <v-text-field
        v-model="password"
        type="password"
        prepend-inner-icon="mdi-lock-outline"
        :rules="passwordRules"
        validate-on-blur
        label="Password"
        required
      ></v-text-field>
      <v-btn
        :loading="loading"
        :disabled="disabledButton"
        type="submit"
        block
        color="primary"
      >
        Sign Up
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import debounce from 'lodash/debounce'
import Lottie from 'vue-lottie'
import * as success from '~/assets/success.json'
import * as error from '~/assets/error.json'

export default {
  components: {
    Lottie,
  },
  data() {
    return {
      campaignUuid: '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a',
      loading: false,
      validatingEmail: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      serverValidEmail: false,
      emailChecked: false,
      nameRules: [],
      emailRules: [],
      passwordRules: [],
      lottieSucessOptions: { animationData: success.default, loop: false },
      lottieErrorOptions: { animationData: error.default, loop: false },
    }
  },
  computed: {
    validEmailFormat() {
      return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
    },
    disabledButton() {
      return !this.firstName || !this.lastName || !this.email || !this.password
    },
  },
  watch: {
    email(newVal, oldVal) {
      if (this.validEmailFormat) {
        this.validateEmail()
      } else {
        this.serverValidEmail = false
      }
    },
  },
  methods: {
    validateEmail: debounce(async function () {
      this.validatingEmail = true
      try {
        const res = await this.$axios.$post(
          'https://api.raisely.com/v3/check-user ',
          {
            campaignUuid: this.campaignUuid,
            data: {
              email: this.email,
            },
          }
        )

        this.validatingEmail = false
        this.emailChecked = true
        this.serverValidEmail = res.data.status !== 'EXISTS'
      } catch (error) {
        this.validatingEmail = false
        this.$toast.error(error.response.data.errors[0].message, {
          icon: 'times-circle',
        })
      }
    }, 100),

    async submit() {
      this.loading = true
      try {
        const res = await this.$axios.$post(
          'https://api.raisely.com/v3/signup',
          {
            campaignUuid: this.campaignUuid,
            data: {
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              password: this.password,
            },
          }
        )
        this.$toast.success(res.message, {
          icon: 'check-circle',
        })
        Cookies.set('token', res.token)
        this.$router.push({ name: 'success' })
        this.loading = false
      } catch (error) {
        this.loading = false
        this.$toast.error(error.response.data.errors[0].message, {
          icon: 'times-circle',
        })
      }
    },
    handleSubmit() {
      this.nameRules = [(v) => !!v.trim() || 'Please enter a valid name']
      this.emailRules = [
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid',
      ]
      this.passwordRules = [
        (v) => v.length > 5 || 'Password must at least 6 characters',
      ]
      setTimeout(() => {
        if (this.$refs.form.validate()) {
          this.serverValidEmail && this.submit()
        }
      })
    },
  },
}
</script>

<style></style>

<template>
  <v-app>
    <v-main>
      <v-container fill-height>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
<style>
.toasted {
  justify-content: flex-start !important;
  padding: 20px 30px !important;
  font-size: 18px !important;
  font-weight: 400 !important;
  box-shadow: 0 12px 20px -10px rgba(255, 255, 255, 0.28),
    0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 255, 255, 0.2) !important;
  border-radius: 10px !important;
}

.toasted > svg:first-child {
  margin-right: 30px;
  font-size: 28px;
}
</style>

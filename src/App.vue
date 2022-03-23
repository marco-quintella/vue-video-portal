<template>
  <v-app>
    <router-view name="NavBar"></router-view>
    <router-view name="StudioNavBar"></router-view>
    <v-content
      :class="{
        'content-bg': ![
          'SignIn',
          'SignUp',
          'Dashboard',
          'Video',
          'Detail'
        ].includes(this.$route.name)
          ? true
          : false
      }"
    >
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
body {
  font-size: 14px;
}

a {
  text-decoration: inherit;
  color: inherit;
}
h3, .h3 {
  display: block;
  font-size: 1.17em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
.content-bg {
  background-color: #f9f9f9;
}
.card {
  background: #f9f9f9 !important;
}
.text-primary {
  color: #030303 !important;
}
</style>

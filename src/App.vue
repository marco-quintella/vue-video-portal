<template>
  <v-app>
    <router-view name="NavBar"></router-view>
    <router-view name="StudioNavBar"></router-view>
    <v-main
      :class="{
        'content-bg': ![
          'SignIn',
          'SignUp',
          'Dashboard',
          'Video',
          'Detail',
        ].includes(this.$route.name)
          ? true
          : false,
      }"
    >
      <router-view></router-view>
    </v-main>
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

.v-application a {
  color: currentColor;
  text-decoration: none;
}

.subhead,
h1,
h2,
h3,
h4 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  max-height: 30px;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 17.5px;
  text-overflow: ellipsis;
  font-weight: 400;
}

h3,
.h3 {
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

.small-text {
  font-size: 12px;
}
</style>

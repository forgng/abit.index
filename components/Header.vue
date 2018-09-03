<template>
  <header class="header">
    <nav class="nav">
      <div>
        <nuxt-link to="/" class="align-items" v-if="$nuxt.$route.path !== '/'">
          abitindex
        </nuxt-link>
      </div>
      <div class="links">
          <nuxt-link to="/indices" class="nav-link">indices</nuxt-link>
      </div>
    </nav>
    <div class="index-tumbnails-container">

    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';
.nav {
  padding: 0 20px;
  margin: auto;
  max-width: 1000px;
  min-height: $navbarHeight;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.links {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
}
.nav-link {
  margin: 0 15px;
}
</style>


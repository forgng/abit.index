<template>
  <div>
    <Header/>
    <main>
      <nuxt/>
    </main>
    <Footer />
  </div>
</template>

<script>
import { Header, Footer } from '~/components';

export default {
  components: {
    Header,
    Footer,
  },
};
</script>
<style lang="scss">
@import '~/assets/styles/variables.scss';
*,
*:after,
*:before {
  box-sizing: border-box;
  margin: 0;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto Mono', monospace;
  -webkit-font-smoothing: antialiased;
  color: $baseTextColor;
  letter-spacing: 1px;
}

::-webkit-scrollbar {
  display: none;
}

main {
  min-height: 100vh;
}
</style>

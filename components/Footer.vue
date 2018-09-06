<template>
  <footer :class="['footer', { 'dark':$nuxt.$route.path === '/indices'}]">
    <div class="container">
      <!-- <div>
        Made by&nbsp;<a href="https://abit.company" target="_blank" rel="noopener noreferrer">abitcompany</a>
      </div>
      <a href="https://abit.company" target="_blank" rel="noopener noreferrer">
        <img src="https://abitcompany-cdn.sirv.com/abitcompany/abitlogo-small.png" alt="abitlogo" class="logo"/>
      </a> -->
      <div>&copy; 2018 abitindex</div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';
.footer {
  min-height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &.dark {
    background-color: $lighDark;
    color: $baseTextColorLight;
  }
}
.abitlogo {
  height: 30px;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logo {
  height: 40px;
  width: 40px;
  margin-top: 10px;
}
</style>

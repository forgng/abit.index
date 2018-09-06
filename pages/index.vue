<template>
    <div class="page">
      <div class="hero"/>
      <div class="hero-message">
        <div style="display: inline-block">
          <h1 class="title">abitindex</h1>
          <h6 style="margin: 0; text-align: end">Beta</h6>
        </div>
        <h2 class="subtitle">Crypto market indices</h2>
        <!-- <div style="display: flex; align-items: center">
          <nuxt-link to="/indices">go to indices</nuxt-link>
          <button style="margin-left: 10px;" class="btn-arrow left dark" />
        </div> -->
      </div>
      <section class="section">
      <div class="about">
        <h3 class="section-title">About</h3>
        <p>abitindex is a collection of indices for the crypto market</p>
      </div>
    </section>
    <section class="section">
      <h3 class="section-title">What is a market index</h3>
      <p>
        A (crypto) market indices is a  weighted average of the performance of a group of cryptocurrencies.
      </p>
    </section>
    <section class="section">
      <h3 class="section-title">Why market indices</h3>
      <p>Market indexes are foundamentals for getting quality information
        regarding the performance of a market. This serves as an overview and
        for a benchmark for a portfolio.
      </p>
    </section>
    </div>
</template>
<style lang="scss" scoped>
.hero-message {
  padding-top: 70px;
  height: 700px;
}
.title {
  font-size: 4.2rem;
  font-weight: 400;
}
.subtitle {
  font-size: 2.2rem;
  font-weight: 400;
  margin-top: 15px;
}
.page {
  max-width: 780px;
  margin: 0 auto;
  padding: 0 20px;
}
.hero {
  width: 100%;
  min-height: 700px;
  z-index: -1;
  background-image: url('~/assets/hero.svg');
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
}
.description {
  font-size: 1.2rem;
}
.section-title {
  font-size: 2rem;
  margin: 10px 0;
}
.section {
  margin: 4rem 0;
}
</style>


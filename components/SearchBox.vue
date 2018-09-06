<template>
  <div class="search-box">
    <input class="base-input search-input"
          type="text"
          :placeholder="`Search ${name}`"
          :value="filter"
          @input="$emit('update:filter', $event.target.value)"/>
    <i class="material-icons search-icon">search</i>
    <i class="material-icons search-clear-icon" @click="$emit('clear-search-box')">close</i>
  </div>
</template>
<script>
export default {
  name: 'SearchBox',
  props: ['filter', 'name'],
};
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';
.search-clear-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  color: $baseTextColorLight;
  &:hover {
    cursor: pointer;
  }
}
.search-box {
  padding: 10px 10px 10px 50px;
  position: relative;
  transition: 0.3s;
  background-color: $darkBackground;
  .search-icon {
    position: absolute;
    top: 20px;
    left: 10px;
    color: $baseTextColorLight;
    transition: 0.3s;
  }
  input {
    transition: all 0.3s;
    font-weight: 400;
    color: $baseTextColorLight;
    margin-bottom: 5px !important;
    height: 2.5rem !important;
    &:focus {
      transition: 0.3s;
      box-shadow: 0 1px 0 0 $mainColor !important;
      border-bottom: 1px solid $mainColor !important;
      ~ i {
        transition: 0.3s;
        color: $mainColor;
      }
    }
  }
}
</style>


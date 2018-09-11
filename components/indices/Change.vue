<template>
  <div class="change">
      <div :class="['timespan-container', {'selected': isSelected}]" @click.stop="$emit('selected-timespan', timeSpan)">
        <h6 class="time-frame">{{ timeSpan }}</h6>
      </div>
      <div class="perc-change">
        <span :data-positive="Math.sign(changePerc)">{{ changePerc }}%</span>
      </div>
  </div>
</template>
<script>
export default {
  name: 'change',
  props: ['timeSpan', 'changePerc', 'isSelected'],
};
</script>
<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';
.change {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  @media screen and (max-width: $break-card-small) {
    margin: 0 3px;
  }
}
.timespan-container {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: $break-card) {
    width: 30px;
    height: 30px;
  }
  @media screen and (max-width: $break-card-small) {
    width: 25px;
    height: 25px;
  }
  &:hover {
    cursor: pointer;
  }
  &.selected {
    background-color: $mainColor;
    color: $baseTextColorLight;
  }
}
.time-frame {
  text-align: center;
  font-size: 0.8rem;
  margin: 0;
  @media screen and (max-width: $break-card) {
    font-size: 0.7rem;
  }
  @media screen and (max-width: $break-card-small) {
    font-size: 0.6rem;
  }
}

.perc-change {
  text-align: center;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 4px 0;
  @media screen and (max-width: $break-card) {
    font-size: 0.65rem;
  }
  @media screen and (max-width: $break-card-small) {
    font-size: 0.55rem;
  }
}
</style>

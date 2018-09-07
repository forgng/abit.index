<template>
  <div class="change">
      <div :class="['timeframe-container', {'selected': isSelected}]" @click.stop="$emit('selected-timeframe', timeFrame)">
        <h6 class="time-frame">{{ timeFrame }}</h6>
      </div>
      <div class="perc-change">
        <span :data-positive="Math.sign(changePerc)">{{ changePerc }}%</span>
      </div>
  </div>
</template>
<script>
export default {
  name: 'change',
  props: ['timeFrame', 'changePerc', 'isSelected'],
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
}
.timeframe-container {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
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
}

.perc-change {
  text-align: center;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 4px 0;
}
</style>

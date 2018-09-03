<template>
  <div class="change">
      <div>
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
  props: ['timeFrame', 'changePerc'],
};
</script>
<style lang="scss" scoped>
.change {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
}
.time-frame {
  text-align: center;
  margin-top: 0;
  font-size: 0.8rem;
}
.perc-change {
  text-align: center;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>


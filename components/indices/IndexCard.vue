<template>
  <div class="index-card" @click="$emit('open-index-modal', indexName)">
    <div class="header">
      <div>
        <h5 class="index-name" style="margin-top: 0; padding-top: 8px;">{{ indexName }}</h5>
        <h4 class="last-value">{{ lastValue }}</h4>
      </div>
      <div class="changes-container">
        <Change
          v-for="timeFrame in timeFrames"
          :key="timeFrame"
          :time-frame="timeFrame"
          :change-perc="changesPerc[timeFrame] !== 'NaN' ?  changesPerc[timeFrame] : '?'"
        />
      </div>
    </div>
    <div>
      <LineChart :values="valueList" :index-name="indexName"/>
    </div>
  </div>
</template>
<script>
import Change from './Change';
import LineChart from './LineChart';
import Coin from './Coin';
import { roundTo, getReadableDate } from '../helpers';

export default {
  name: 'IndexCard',
  components: {
    Change,
    LineChart,
    Coin,
  },
  props: ['indexName', 'values', 'coins', 'changesPerc'],
  data: () => ({
    timeFrames: ['1h', '1d', '7d'],
  }),
  computed: {
    lastValue() {
      if (this.values) {
        return this.values[this.values.length - 1][1];
      } else {
        return '?';
      }
    },
    valueList() {
      return this.values;
    },
    lastTimestamp() {
      if (this.values) {
        return this.values[this.values.length - 1][1];
      } else {
        return '?';
      }
    },
    lastTimestampFormatted() {
      if (this.values) {
        return getReadableDate(this.lastTimestamp);
      } else {
        return '?';
      }
    },
  },
  methods: {
    changePerc(timeFrame) {
      // return '?';
      console.log('start');
      const oldVal = this.values.filter(
        el =>
          el.timestamp === this.lastTimestamp - this.timeFrameToDelta(timeFrame)
      );
      console.log('t1');
      if (oldVal.length > 0) {
        return roundTo(
          (this.lastValue - oldVal[0].value) / oldVal[0].value * 100,
          2
        );
      } else {
        return '?';
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.index-card {
  width: 400px;
  background-color: #424242;
  border-radius: 2px;
  // margin: 20px;
  transition: all 0.3 ease;
  color: #fff;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 20px 0px;
    transform: scale(1.01, 1.01);
    transition: all 300ms ease;
    cursor: pointer;
  }
}
.header {
  display: flex;
  flex-direction: row;
  padding: 8px;
}
.index-name {
  // text-align: center;
  font-weight: 200;
}
.last-value {
  // text-align: center;
  // font-size: 4rem;
  font-weight: 200;
  margin: 0;
}
.changes-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  width: 100%;
}
.timestamp {
  text-align: center;
}
</style>


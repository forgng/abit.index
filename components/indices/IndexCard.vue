<template>
  <div class="index-card" @click="$emit('open-index-modal', indexName)">
    <LineLoading v-if="isUpdating"/>
    <!-- <LineLoading /> -->
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
          :is-selected="selectedTimeframe === timeFrame"
          @selected-timeframe="(timeFrame) => selectedTimeframe = timeFrame"
        />
      </div>
    </div>
    <div>
      <LineChart :values="valuesSelected" :valuesUpdate="valuesUpdate" :index-name="indexName"/>
    </div>
  </div>
</template>
<script>
import Change from './Change';
import LineChart from './LineChart';
import Coin from './Coin';
import LineLoading from '../LineLoading';
import { getReadableDate, convertToJsTimestamp } from '../helpers';

export default {
  name: 'IndexCard',
  components: {
    Change,
    LineChart,
    Coin,
    LineLoading,
  },
  props: ['indexName', 'values', 'coins', 'changesPerc'],
  data: () => ({
    timeFrames: ['1h', '1d', '7d'],
    selectedTimeframe: '7d',
    isUpdating: false,
    valuesUpdate: [],
  }),
  computed: {
    lastValue() {
      if (this.values) {
        return this.values[this.values.length - 1][1];
      } else {
        return '?';
      }
    },
    valuesSelected() {
      const now = new Date().getTime();
      let oldTs;
      switch (this.selectedTimeframe) {
        case '1h':
          oldTs = now - 60 * 60 * 1000;
          this.updateData('1h');
          return this.values.filter(el => el[0] >= oldTs);
        case '1d':
          oldTs = now - 60 * 60 * 24 * 1000;
          this.updateData('1d');
          return this.values.filter(el => el[0] >= oldTs);
        case '7d':
          oldTs = now - 60 * 60 * 24 * 7 * 1000;
          return this.values.filter(el => el[0] >= oldTs);
        default:
          return this.values;
      }
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
    valueInCache() {
      const valuesCached =
        JSON.parse(localStorage.getItem(this.indexName)) || {};
    },

    async updateData(timeFrame) {
      console.log('update data');
      const now = (new Date().getTime() / 1000) | 0;
      let startTime;
      let timeFrameInSec;
      let cache = {};
      // try {
      cache = JSON.parse(localStorage.getItem(this.indexName)) || {};
      //   console.log(cache);
      // } catch (error) {
      //   console.log('an invalid json was cached, should report');
      //   cache = {};
      // }
      console.log(cache);
      const valuesCachedTimeFrame = cache[timeFrame];
      console.log(valuesCachedTimeFrame);
      switch (timeFrame) {
        case '1h':
          if (
            valuesCachedTimeFrame &&
            valuesCachedTimeFrame.length &&
            now -
              valuesCachedTimeFrame[valuesCachedTimeFrame.length - 1][0] /
                1000 <=
              300
          ) {
            console.log('using cache');
            this.valuesUpdate = valuesCachedTimeFrame;
            return;
          }
          startTime = now - 60 * 60;
          timeFrameInSec = 300;
          break;
        case '1d':
          if (
            valuesCachedTimeFrame &&
            valuesCachedTimeFrame.length &&
            now -
              valuesCachedTimeFrame[valuesCachedTimeFrame.length - 1][0] /
                1000 <=
              600
          ) {
            console.log('using cache');
            this.valuesUpdate = valuesCachedTimeFrame;
            return;
          }
          startTime = now - 60 * 60 * 24;
          timeFrameInSec = 600;
          break;
        default:
          startTime = now - 60 * 60 * 24 * 7;
          timeFrameInSec = 1800;
          break;
      }
      console.log('NOT USING CACHE');
      this.isUpdating = true;
      try {
        const { data } = await this.$axios.get(
          `/api/abitindex/rest/v1/last?timeframe=${timeFrameInSec}&indices=ABIT20&start=${startTime}`
        );
        console.log(data.abitindex.indices[0]);
        const indicesConverted = convertToJsTimestamp(data.abitindex.indices);
        const newValues = indicesConverted[0].values;
        this.valuesUpdate = newValues;
        if (newValues.length) {
          console.log('SAVING NEW VALUES TO CACHE');
          // console.log(indicesConverted[0].values);
          cache[timeFrame] = newValues;
          console.log(cache);
          localStorage.setItem(this.indexName, JSON.stringify(cache));
        }
        console.log('after fetch');
      } catch (error) {
        console.log(error);
        return;
      } finally {
        this.isUpdating = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';
.index-card {
  width: 400px;
  background-color: #424242;
  border-radius: 2px;
  margin: 10px;
  transition: all 0.3 ease;
  color: #fff;
  position: relative;
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


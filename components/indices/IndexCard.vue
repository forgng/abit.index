<template>
  <div class="index-card" @click="$emit('open-index-modal', index.name)">
    <LineLoading v-if="isIndexUpdating[index.name]"/>
    <div class="header">
      <div>
        <h5 class="index-name" style="margin-top: 0; padding-top: 8px;">{{ index.name }}</h5>
        <h4 class="last-value">{{ lastValue }}</h4>
      </div>
      <div class="changes-container" v-if="index.values">
        <Change
          v-for="timeSpan in timesSpan"
          :key="timeSpan"
          :time-span="timeSpan"
          :change-perc="index.getChangePerc(timeSpan) !== 'NaN' ?  index.getChangePerc(timeSpan) : '?'"
          :is-selected="selectedTimeSpan === timeSpan"
          @selected-timespan="(timeSpan) => selectedTimeSpan = timeSpan"
        />
      </div>
    </div>
    <div v-if="index.values">
      <LineChart :values="valuesSelected" :index-name="index.name" theme="dark"/>
    </div>
  </div>
</template>
<script>
import Change from './Change';
import LineChart from './LineChart';
import Coin from './Coin';
import LineLoading from '../LineLoading';
import { timeSpanToTimeFrame } from '../../helpers';
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  name: 'IndexCard',
  components: {
    Change,
    LineChart,
    Coin,
    LineLoading,
  },
  props: ['index'],
  data: () => ({
    timesSpan: ['1h', '24h', '7d'],
    selectedTimeSpan: '7d',
  }),
  computed: {
    ...mapState(['isIndexUpdating']),
    ...mapGetters(['getIndex']),
    lastValue() {
      return this.index.lastValue || '?';
    },
    valuesSelected() {
      const timeFrame = timeSpanToTimeFrame(this.selectedTimeSpan);
      const now = (new Date().getTime() / 1000) | 0;
      switch (this.selectedTimeSpan) {
        case '1h':
          if (this.index.shoudlUpdateValues(timeFrame)) {
            const oneHourAgo = now - 60 * 60;
            this.downloadData({
              timeFrame,
              indices: [this.index.name],
              startTime: oneHourAgo,
            });
          }
          return this.index.getValues(timeFrame);
        case '24h':
          if (this.index.shoudlUpdateValues(timeFrame)) {
            const oneDayAgo = now - 60 * 60 * 24;
            this.downloadData({
              timeFrame,
              indices: [this.index.name],
              startTime: oneDayAgo,
            });
          }
          return this.index.getValues(timeFrame);
        case '7d':
          return this.index.getValues(timeFrame);
      }
    },
  },
  methods: {
    ...mapActions(['downloadData']),
  },
};
</script>
<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';
.index-card {
  display: flex;
  flex-direction: column;
  background-color: #424242;
  border-radius: 2px;
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
  @media screen and (max-width: $break-card) {
    font-size: 1rem;
  }
  @media screen and (max-width: $break-card-small) {
    font-size: 0.8rem;
  }
}
.last-value {
  // text-align: center;
  // font-size: 4rem;
  font-weight: 200;
  margin: 0;
  @media screen and (max-width: $break-card) {
    font-size: 1rem;
  }
  @media screen and (max-width: $break-card-small) {
    font-size: 0.8rem;
  }
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


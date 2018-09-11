<template>
  <modal @close="$emit('close-modal')" v-cloak>
     <h4 slot="header">
       <LineLoading v-if="isIndexUpdating[index.name]"/>
       <div style="display: flex; flex-direction: column">
        <h3 class="title">{{ index.name }}</h3>
        <h1 class="value">{{ lastValue }}</h1>
       </div>
     </h4>
     <div slot="body">
      <div class="coin-list">
        <div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center">
          <div v-for="coin in coinsOrdered" :key="coin.coinCode" class="coin-container">
            <Coin  :symbol="coin.coinCode.toLowerCase()" />
            <span class="coin-perc">{{ coin.perc }}%</span>
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: center">
        <hr class="half"/>
      </div>
      <div class="changes-container">
        <Change
            v-for="timeSpan in timeSpans"
            :key="timeSpan"
            :time-span="timeSpan"
            :change-perc="index.changesPerc[timeSpan] !== 'NaN' ?  index.changesPerc[timeSpan] : '?'"
            :is-selected="selectedTimeSpan === timeSpan"
            @selected-timespan="(timeSpan) => selectedTimeSpan = timeSpan"
          />
        </div>
      <div class="chart-container">
        <LineChart :values="valuesSelected"
          :index-name="`${index.name}-modal`"
          :verbose="true"
          :animation="true"
          theme="light"
          />
      </div>
     </div>
   </modal>
</template>
<script>
import Modal from './Modal.vue';
import { LineChart, Coin, Change } from '../indices';
import LineLoading from '../LineLoading';

import { timeSpanToTimeFrame } from '../../helpers';
import { mapActions, mapState } from 'vuex';

export default {
  props: ['index'],
  components: {
    Modal,
    LineChart,
    Coin,
    Change,
    LineLoading,
  },
  data: () => ({
    timeSpans: ['1h', '24h', '7d'],
    selectedTimeSpan: '7d',
  }),
  computed: {
    ...mapState(['isIndexUpdating']),
    lastValue() {
      return this.index.getlastValue();
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
          if (this.index.shoudlUpdateValues('10m')) {
            const oneDayAgo = now - 60 * 60 * 24;
            this.downloadData({
              timeFrame,
              indices: [this.index.name],
              startTime: oneDayAgo,
            });
          }
          return this.index.getValues('10m');
        case '7d':
          return this.index.getValues('30m');
      }
    },
    coinsOrdered() {
      return this.index.coins
        .map(el => ({ ...el }))
        .sort((a, b) => b.perc - a.perc);
    },
  },
  methods: {
    ...mapActions(['downloadData']),
  },
};
</script>
<style lang="scss">
@import '~/assets/styles/variables.scss';

.coin-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.coin-perc {
  font-size: 0.7rem;
}
.coin-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;
}
.title {
  margin: 0;
}
.value {
  margin: 0;
}
.changes-container {
  display: flex;
  justify-content: center;
  margin: 10px 0;
  // max-width: 200px;
  // padding: 5px;
  // border-radius: 2px;
}
.chart-container {
  margin: auto;
  // max-width: 80%;
}
</style>

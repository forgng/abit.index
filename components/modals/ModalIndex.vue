<template>
  <modal @close="$emit('close-modal')" v-cloak>
     <h4 slot="header">
       <div style="display: flex; flex-direction: column">
        <h3 class="title">{{ index.name }}</h3>
        <h1 class="value">{{ lastValue }}</h1>
       </div>
     </h4>
     <div slot="body">
      <div class="coin-list">
        <div style="display: flex; flex-direction: row">
          <div v-for="coin in coinsOrdered" :key="coin.coinCode" class="coin-container">
            <Coin  :symbol="coin.coinCode.toLowerCase()" />
            <span class="coin-perc">{{ coin.perc }}%</span>
          </div>
        </div>
      </div>
      <div class="changes-container">
        <Change
            v-for="timeFrame in timeFrames"
            :key="timeFrame"
            :time-frame="timeFrame"
            :change-perc="index.changesPerc[timeFrame] !== 'NaN' ?  index.changesPerc[timeFrame] : '?'"
            :is-selected="selectedTimeframe === timeFrame"
            @selected-timeframe="(timeFrame) => selectedTimeframe = timeFrame"
          />
        </div>
      <div class="chart-container">
        <LineChart :values="valueList" :index-name="`${index.name}-modal`" :light="true" :verbose="true" :animation="true"/>
      </div>
     </div>
   </modal>
</template>
<script>
import Modal from './Modal.vue';
import { LineChart, Coin, Change } from '../indices';

export default {
  props: ['index'],
  components: {
    Modal,
    LineChart,
    Coin,
    Change,
  },
  data: () => ({
    timeFrames: ['1h', '1d', '7d'],
    selectedTimeframe: '7d',
  }),
  computed: {
    valueList() {
      return this.index.values;
    },
    lastValue() {
      return this.index.values[this.index.values.length - 1][1];
    },
    lastTimestamp() {
      return this.index.values[this.index.values.length - 1][0];
    },
    coinsOrdered() {
      return this.index.coins
        .map(el => ({ ...el }))
        .sort((a, b) => b.perc - a.perc);
    },
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
  margin: 0 5px;
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
  max-width: 80%;
}
</style>

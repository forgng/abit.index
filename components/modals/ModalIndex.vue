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
      <div>
        <LineChart :values="valueList" :index-name="`${index.name}-modal`" />
      </div>
     </div>
   </modal>
</template>
<script>
import Modal from './Modal.vue';
import { LineChart, Coin } from '../indices';

export default {
  props: ['index'],
  components: {
    Modal,
    LineChart,
    Coin,
  },
  computed: {
    valueList() {
      return this.index.values;
    },
    lastValue() {
      return this.index.values[this.index.values.length - 1].value;
    },
    lastTimestamp() {
      return this.index.values[this.index.values.length - 1].timestamp;
    },
    coinsOrdered() {
      return this.index.coins
        .map(el => ({ ...el }))
        .sort((a, b) => b.perc - a.perc);
    },
  },
};
</script>
<style>
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
</style>

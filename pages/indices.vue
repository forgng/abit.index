<template>
  <div class="indices-page">
    <div class="search-box-wrapper">
      <div class="search-box-container">
        <search-box
        :filter.sync="searchString"
        @clear-search-box="searchString = ''"
        name="index"
        />
      </div>
    </div>
    <div class="page-content">
      <div v-if="loading">Loading</div>
      <div v-else-if="error || !indices">
        <div class="page">
          <h3 style="text-align: center">Something went wrong, retry later</h3>
        </div>
      </div>
      <div v-else-if="!indices.length">
        <div class="page">
          <h3 style="text-align: center">There are no indices available at the moment</h3>
        </div>
      </div>
      <div v-else-if="!indicesFiltered.length">
        <div class="page">
          <h3 style="text-align: center">No index matches the search</h3>
        </div>
      </div>
      <transition-group  v-else name="list-complete" tag="div" class="content" appear>
        <div v-for="index in indicesFiltered" :key="index.name" class="cell list-complete-item">
          <IndexCard
            :index-name="index.name"
            :values="index.values"
            :coins="index.coins"
            :changes-perc="index.changesPerc"
            @open-index-modal="(indexName) => indexSelected = indexName"
          />
        </div>
      </transition-group>
    </div>
    <ModalIndex v-if="indexSelected" :index="indexSelectedValues" @close-modal="indexSelected = ''"/>
  </div>
</template>

<script>
// import io from 'socket.io-client';
import { IndexCard, ModalIndex, SearchBox } from '../components';
import { convertToJsTimestamp } from '../components/helpers.js';

export default {
  components: {
    IndexCard,
    ModalIndex,
    SearchBox,
  },
  async asyncData({ app }) {
    if (process.browser && parseInt(process.env.USE_CACHE)) {
      console.log(process.env.USE_CACHE);
      console.log('browser');
      const indices = JSON.parse(localStorage.getItem('indices'));
      if (indices && indices.length) {
        console.log('usingCache');
        const currentTs = Math.floor(new Date().getTime() / 1000);
        const lastTs = indices[0].values[indices[0].values.length - 1][0];
        if (currentTs - lastTs < process.env.CACHING_TIME) {
          return { indices, loading: false };
        }
      }
    }
    try {
      console.log('donwload');
      const { data } = await app.$axios.get(
        `/api/abitindex/rest/v1/last?timeframe=1800&indices=${
          process.env.INDICES
        }`
      );
      const indicesConverted = convertToJsTimestamp(data.abitindex.indices);
      return {
        indices: indicesConverted,
        error: false,
        loading: false,
        lastTimestamp: data.abitindex.timestamp,
      };
    } catch (e) {
      // console.log(e);
      return { error: true, indices: [], loading: false };
    }
  },
  data: function() {
    return {
      indexSelected: '',
      searchString: '',
      error: false,
      socket: null,
      indices: null,
      loading: true,
    };
  },
  mounted() {
    if (this.indices.length) {
      localStorage.setItem('indices', JSON.stringify(this.indices));
    }
  },
  beforeDestroy: function() {
    // this.socket.emit('end');
  },
  computed: {
    indexSelectedValues() {
      return this.indices.filter(el => el.name == this.indexSelected)[0];
    },
    indicesFiltered() {
      return this.indices.filter(el =>
        el.name.toLowerCase().includes(this.searchString.toLowerCase())
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';

.cell {
  margin: auto;
  max-width: 400px;
}
.search-box-wrapper {
  max-width: 80%;
  margin: auto;
  @media only screen and (max-width: 500px) {
    max-width: 90%;
  }
}
.indices-page {
  background-color: $darkBackground;
  color: $baseTextColorLight;
}
.page-content {
  margin: 0 auto;
  padding: 0 20px;
  min-height: 100vh;
  color: $baseTextColorLight;
}
.content {
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 1rem;
  // display: flex;
  // flex-direction: row;
  // flex-wrap: wrap;
  // justify-content: center;
}

.list-complete-item {
  transition: all 0.8s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>

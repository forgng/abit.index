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
      <div v-if="isLoading">Just a sec...</div>
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
            :index="index"
            @open-index-modal="(indexName) => indexSelectedName = indexName"
          />
        </div>
      </transition-group>
    </div>
    <ModalIndex v-if="indexSelectedName" :index="indexSelected" @close-modal="indexSelectedName = ''"/>
  </div>
</template>

<script>
import { IndexCard, ModalIndex, SearchBox } from '../components';
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'IndicesPage',
  components: {
    IndexCard,
    ModalIndex,
    SearchBox,
  },
  data: function() {
    return {
      indexSelectedName: '',
      searchString: '',
      error: false,
      socket: null,
      isLoading: false,
      timeFrame: '30m',
    };
  },
  mounted() {
    this.loadCache({ indices: process.env.INDICES.split(',') });
    if (this.shouldGlobalUpdate) {
      console.log('MUST UPDATE');
      this.downloadData({
        timeFrame: this.timeFrame,
        indices: process.env.INDICES.split(','),
      });
    }
  },

  computed: {
    ...mapState(['indices']),
    ...mapGetters(['shouldGlobalUpdate']),
    indexSelected() {
      return this.indices.filter(el => el.name === this.indexSelectedName)[0];
    },
    indicesFiltered() {
      return this.indices.filter(el =>
        el.name.toLowerCase().includes(this.searchString.toLowerCase())
      );
    },
  },
  methods: {
    ...mapActions(['downloadData', 'loadCache']),
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

import Vuex from 'vuex';
import { convertToJsTimestamp, timeFrameToSec } from '../helpers';
import Index from './AbitIndex';

const createStore = () => {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    state: {
      indices: [],
      isIndexUpdating: {},
      numOfRetries: 0,
    },
    getters: {
      maxNumOfRetriesReached: state => {
        return state.numOfRetries >= 1;
      },
      shouldGlobalUpdate: state => {
        if (!state.indices.length) return true;
        const now = (new Date().getTime() / 1000) | 0;
        const lastTs = state.indices[0].getLastTimestamp('30m');
        return now - lastTs > timeFrameToSec('30m');
      },
    },
    mutations: {
      restoreCache(state, newIndices) {
        state.indices = newIndices;
      },
      initIndices(state, indices) {
        state.indices = indices;
      },
      updateAll(state, { indices, timeFrame }) {
        const indicesUpdated = indices.map(index => index.name);

        const newIndices = indices.map(newIndex => {
          const savedIndex = state.indices.find(
            index => index.name === newIndex.name
          );
          const oldValues = savedIndex ? { ...savedIndex.values } : {};
          return new Index(
            newIndex.name,
            newIndex.changesPerc,
            newIndex.coins,
            { ...oldValues, [timeFrame]: newIndex.values },
            newIndex.lastValue
          );
        });
        const allOtherIndices = state.indices.filter(
          index => !indicesUpdated.includes(index.name)
        );
        const allIndices = [...allOtherIndices, ...newIndices].sort(
          (a, b) => (b.name > a.name ? 1 : -1)
        );

        state.indices = allIndices;
      },

      setLoading(state, loadingMap) {
        state.isIndexUpdating = Object.assign(
          {},
          { ...state.isIndexUpdating, ...loadingMap }
        );
      },
      updateCache(state) {
        localStorage.setItem('indices', JSON.stringify(state.indices));
      },
      incrementRetries(state) {
        state.numOfRetries = state.numOfRetries + 1;
      },
    },
    actions: {
      loadCache({ commit }, { indices }) {
        const indicesCached = JSON.parse(localStorage.getItem('indices'));
        // const indicesCached = false;
        if (indicesCached) {
          const envIndicesSet = new Set(indices);
          const currentIndicesSet = new Set(indicesCached.map(el => el.name));
          let invalidateCache = false;
          if (envIndicesSet.size !== currentIndicesSet.size)
            invalidateCache = true;
          for (const a of envIndicesSet)
            if (!currentIndicesSet.has(a)) invalidateCache = true;

          if (invalidateCache) {
            localStorage.removeItem('indices');
            const newIndices = indices
              .map(indexName => new Index(indexName, {}, [], {}, 0))
              .sort((a, b) => (b.name > a.name ? 1 : -1));
            commit('initIndices', newIndices);
            return;
          }
          const newIndices = indicesCached
            .map(index => {
              return new Index(
                index.name,
                index.changesPerc,
                index.coins,
                index.values,
                index.lastValue
              );
            })
            .sort((a, b) => b.name - a.name);
          commit('restoreCache', newIndices);
        } else {
          const newIndices = indices
            .map(indexName => new Index(indexName, {}, [], {}, 0))
            .sort((a, b) => (b.name > a.name ? 1 : -1));
          commit('initIndices', newIndices);
        }
      },

      async downloadData({ commit }, { timeFrame, indices, startTime = '' }) {
        const loadingMap = indices.reduce((prev, indexName) => {
          return { ...prev, [indexName]: true };
        }, {});
        commit('setLoading', loadingMap);
        try {
          let urlPrefix =
            process.env.NODE_ENV === 'development' ? '/api' : '/api';
          const url = `${urlPrefix}/abitindex/rest/v1/last?timeframe=${timeFrame}&indices=${indices.join()}&start=${startTime}`;
          const { data } = await this.$axios.get(url);
          const indicesConverted = data.abitindex.indices.map(
            convertToJsTimestamp
          );
          commit('updateAll', {
            indices: indicesConverted,
            timeFrame: data.abitindex.timeframe,
          });
          commit('updateCache');
        } catch (error) {
          console.error(error);
          commit('incrementRetries');
          commit('updateAll', {
            indices: [],
          });
        } finally {
          const loadingMapFalse = indices.reduce((prev, indexName) => {
            return { ...prev, [indexName]: false };
          }, {});
          commit('setLoading', loadingMapFalse);
        }
      },
    },
  });
};

export default createStore;

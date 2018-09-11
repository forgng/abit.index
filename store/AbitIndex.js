import { timeFrameToSec } from '../helpers';

export default class Index {
  constructor(name, changesPerc, coins, values, lastValue) {
    this.name = name;
    this.changesPerc = changesPerc;
    this.coins = coins;
    this.values = values;
    this.lastValue = lastValue;
  }

  getlastValue() {
    if (!this.lastValue) return '?';
    return this.lastValue;
  }

  getLastTimestamp(timeFrame) {
    if (!this.hasValues(timeFrame)) return 0;
    const valuesTf = this.getValues(timeFrame);
    if (!valuesTf.length) return 0;
    return valuesTf[valuesTf.length - 1][0] / 1000;
  }

  hasValues(timeFrame) {
    if (!this.values[timeFrame]) return false;
    return this.values[timeFrame].length || false;
  }

  shoudlUpdateValues(timeFrame) {
    if (!this.hasValues(timeFrame)) return true;
    const now = (new Date().getTime() / 1000) | 0;
    const lastTs = this.getLastTimestamp(timeFrame);
    return now - lastTs > timeFrameToSec(timeFrame);
  }

  getValues(timeFrame) {
    if (!this.hasValues(timeFrame)) return [];
    return this.values[timeFrame].map(el => el);
  }

  getChangePerc(timeFrame) {
    return this.changesPerc[timeFrame] || '?';
  }
}

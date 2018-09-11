<template>
  <div :id="`container-${indexName}`" style="width:100%; height:100%;" class="container-chart"></div>
</template>
<script>
import Highcharts from 'highcharts';

export default {
  props: [
    'values',
    'valuesUpdate',
    'indexName',
    'verbose',
    'animation',
    'theme',
  ],
  data: function() {
    return {
      chart: null,
    };
  },
  watch: {
    values: function(newValues) {
      if (!newValues || !newValues.length) {
        this.chart.series[0].setData(newValues, true);
      } else {
        const zones = [
          {
            value: newValues[0][1],
            color: '#ee6e73',
          },
          {
            color: '#67d5b5',
          },
        ];
        this.chart.series[0].update({
          zones: zones,
        });
        this.chart.yAxis[0].options.plotLines[0].value = newValues[0][1];
        this.chart.yAxis[0].update();
        this.chart.series[0].setData(newValues, true);
      }
    },
  },
  mounted() {
    const that = this;
    Highcharts.setOptions({ global: { useUTC: false } });
    this.chart = Highcharts.chart({
      chart: {
        renderTo: `container-${this.indexName}`,
        type: 'line',
        height: 9 / 16 * 100 + '%', // 16:9 ratio
        backgroundColor: that.theme == 'light' ? '#fff' : '#424242',
        style: {
          fontFamily: 'Roboto Mono',
        },
      },
      tooltip: {
        borderColor: '#424242',
        borderRadius: 0,
        borderWidth: 0,
        backgroundColor: that.theme == 'light' ? '#fff' : '#424242',
        style: {
          color: that.theme == 'light' ? '#212121' : '#fff',
        },
      },
      plotOptions: {
        series: {
          color: '#3bd0d6',
          animation: that.animation,
        },
      },
      credits: {
        enabled: false,
      },
      title: {
        text: false,
        subtitle: false,
      },
      yAxis: {
        title: false,
        crosshair: true,
        labels: {
          style: {
            color: that.theme == 'light' ? '#161338' : '#e0e0e0',
          },
        },
        plotLines: [
          {
            value:
              that.values && that.values && that.values.length
                ? that.values.map(el => el)[0][1]
                : 0,
            color: '#3bd0d6',
            dashStyle: 'shortdash',
            width: 1,
            label: that.verbose
              ? {
                  text: 'Week',
                  style: {
                    color: '#161338',
                  },
                }
              : false,
          },
        ],
      },
      xAxis: {
        type: 'datetime',
        crosshair: true,
        labels: {
          style: {
            color: that.theme == 'light' ? '#161338' : '#e0e0e0',
          },
        },
      },
      series: [
        {
          showInLegend: false,
          data:
            that.values && that.values.length ? that.values.map(el => el) : [],
          zones: [
            {
              value:
                that.values && that.values.length
                  ? that.values.map(el => el)[0][1]
                  : 0,
              color: '#ee6e73',
            },
            {
              color: '#67d5b5',
            },
          ],
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                enabled: 'false',
              },
            },
          },
        ],
      },
    });
  },
};
</script>
<style lang="scss">
@import '~/assets/styles/variables.scss';
.highcharts-plot-line-label {
  transform: translate(90%, 0);
}

.highcharts-tracker {
  @media screen and (max-width: $break-card) {
    display: none;
  }
  @media screen and (max-width: $break-card-small) {
    margin: 0 3px;
    .highcharts-axis-labels.highcharts-xaxis-labels {
      text {
        font-size: 10px;
      }
    }
  }
}
</style>

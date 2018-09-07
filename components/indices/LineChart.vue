<template>
  <div :id="`container-${indexName}`" style="width:100%; height:100%;"></div>
</template>
<script>
import Highcharts from 'highcharts';

export default {
  props: ['values', 'indexName', 'light', 'verbose', 'animation', 'timeframe'],
  data: function() {
    return {
      chart: null,
    };
  },
  watch: {
    values: function(newValues) {
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
        backgroundColor: that.light ? '#fff' : '#424242',
        style: {
          fontFamily: 'Roboto Mono',
        },
      },
      tooltip: {
        borderColor: '#424242',
        borderRadius: 0,
        borderWidth: 0,
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
            color: '#e0e0e0',
          },
        },
        plotLines: [
          {
            value: that.values[0][1],
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
            color: '#e0e0e0',
          },
        },
      },
      series: [
        {
          showInLegend: false,
          data: that.values,
          // animation: {
          // duration: 1000,
          // Uses Math.easeOutBounce
          // easing: 'easeOutBounce'
          // },
          zones: [
            {
              value: that.values[0][1],
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
.highcharts-tooltip-box {
  fill: $baseTextColorLight;
  fill-opacity: 0.6;
  stroke-width: 0;
}

.highcharts-tooltip text {
  fill: white;
  // text-shadow: 0 0 3px black;
}
</style>

<template>
  <div :id="`container-${indexName}`" style="width:100%; height:100%;"></div>
</template>
<script>
import Highcharts from 'highcharts';

export default {
  props: ['values', 'indexName'],
  data: function() {
    return {
      chart: null,
    };
  },
  watch: {
    values: function(newList) {
      this.chart.series[0].addPoint(newList[newList.length - 1]);
    },
  },
  mounted() {
    Highcharts.setOptions({ global: { useUTC: false } });
    this.chart = Highcharts.chart({
      chart: {
        renderTo: `container-${this.indexName}`,
        type: 'line',
        height: 9 / 16 * 100 + '%', // 16:9 ratio
        animation: false,
      },
      plotOptions: {
        series: {
          color: '#3bd0d6',
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
      },
      xAxis: {
        type: 'datetime',
      },
      series: [
        {
          showInLegend: false,
          data: this.values,
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


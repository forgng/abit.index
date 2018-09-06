<template>
  <div :id="`container-${indexName}`" style="width:100%; height:100%;"></div>
</template>
<script>
import Highcharts from 'highcharts';

export default {
  props: ['values', 'indexName', 'light'],
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
    const that = this;
    // console.log(this.values);
    Highcharts.setOptions({ global: { useUTC: false } });
    this.chart = Highcharts.chart({
      chart: {
        renderTo: `container-${this.indexName}`,
        type: 'line',
        height: 9 / 16 * 100 + '%', // 16:9 ratio
        animation: false,
        backgroundColor: that.light ? '#fff' : '#424242',
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
            width: 2,
          },
          {
            value: that.values[100][1],
            color: '#3bd0d6',
            dashStyle: 'shortdash',
            width: 1,
          },
        ],
      },
      xAxis: {
        type: 'datetime',
        labels: {
          style: {
            color: '#e0e0e0',
          },
        },
      },
      series: [
        {
          showInLegend: false,
          data: this.values,
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


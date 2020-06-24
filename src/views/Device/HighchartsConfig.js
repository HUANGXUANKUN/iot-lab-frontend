export default function (currentDataSet) {
  return {
    title: {
      text: ''
    },

    yAxis: {
      title: {
        text: 'Iot Value'
      }
    },
    xAxis: { type: 'linear' },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        animation: false,
        label: {
          connectorAllowed: false
        },
      }
    },

    series: currentDataSet,

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  };
}

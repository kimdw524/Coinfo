import { ApexOptions } from 'apexcharts';

export const chartOptions: ApexOptions = {
  chart: {
    type: 'area',
    height: 350,
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: '#D50000',
        downward: '#3b5bc5',
      },
    },
  },
  stroke: {
    width: 2,
    curve: 'straight',
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [20, 100, 100, 100],
    },
  },
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    labels: {
      formatter: (value: number) => value.toLocaleString(),
    },
  },
  tooltip: {
    x: {
      format: 'yyyy/MM/dd HH:mm',
    },
  },
};

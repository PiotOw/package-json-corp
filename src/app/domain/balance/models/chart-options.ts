import {
    ApexAxisChartSeries,
    ApexChart,
    ApexFill,
    ApexMarkers,
    ApexStroke,
    ApexTitleSubtitle, ApexTooltip,
    ApexXAxis, ApexYAxis
} from 'ng-apexcharts';

export interface ChartOptions {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    title: ApexTitleSubtitle;
    xaxis: ApexXAxis;
    fill: ApexFill;
    stroke: ApexStroke;
    markers: ApexMarkers;
    yaxis: ApexYAxis;
    tooltip: ApexTooltip;
}

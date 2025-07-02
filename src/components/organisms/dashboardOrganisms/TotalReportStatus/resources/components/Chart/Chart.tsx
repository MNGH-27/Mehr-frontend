import React, { type FC } from 'react'

import { SChart } from '@atoms/SChart'

import { type IChartProps, type TChartSeries } from './resources'

const options = (series: TChartSeries[]): Highcharts.Options => ({
    chart: {
        type: 'bar'
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: series.map((item) => item.name),
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    legend: {
        enabled: true
    },
    plotOptions: {
        series: {
            stacking: 'normal',
            dataLabels: {
                enabled: false
            }
        }
    },
    series: series
})

const Chart: FC<IChartProps> = ({ series, className = '' }) => {
    return (
        <div className={`grid ${className}`}>
            <SChart options={options(series)} />
        </div>
    )
}

export default Chart

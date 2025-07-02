import React, { type FC } from 'react'

import { SChart } from '@atoms/SChart'

import { type IChartProps, type TChartCenterText, type TChartSeries } from './resources'

declare module 'highcharts' {
    interface Chart {
        // add new custom type for highChart
        customText?: Highcharts.SVGElement
    }
}

const options = (series: TChartSeries, centerText: TChartCenterText): Highcharts.Options => ({
    chart: {
        type: 'pie',
        events: {
            render() {
                const chart = this as Highcharts.Chart
                // Ensure text is only added once
                if (!chart.customText) {
                    chart.customText = chart.renderer
                        .text(centerText, chart.plotWidth / 2 + chart.plotLeft, chart.plotHeight / 2 + chart.plotTop)
                        .css({
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#333333',
                            textAlign: 'center'
                        })
                        .attr({
                            align: 'center',
                            zIndex: 5
                        })
                        .add()
                }
            }
        }
    },
    title: {
        text: ''
    },
    plotOptions: {
        pie: {
            innerSize: '85%', // Adjust to create the donut effect
            depth: 45, // Adds a 3D effect if desired
            dataLabels: {
                enabled: false
            }
        }
    },
    series: [series]
})

const Chart: FC<IChartProps> = ({ centerText, series, className = '' }) => {
    return (
        <div className={`grid ${className}`}>
            <SChart options={options(series, centerText)} />
        </div>
    )
}

export default Chart

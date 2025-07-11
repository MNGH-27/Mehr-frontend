'use client'

import { type FC } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

interface ISBasicBarChartProps {
    chartName: string
}

const SBasicBarChart: FC<ISBasicBarChartProps> = ({ chartName }) => {
    const options: Highcharts.Options = {
        chart: {
            type: 'bar' // Use 'column' for vertical bars
        },
        title: {
            text: chartName
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges'],
            title: {
                text: 'Fruits'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Quantity',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' units'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [
            {
                name: '2025',
                type: 'bar',
                data: [107, 31, 635]
            },
            {
                name: '2024',
                type: 'bar',
                data: [133, 156, 947]
            }
        ]
    }

    return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default SBasicBarChart

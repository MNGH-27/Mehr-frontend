'use client'

import { type FC } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { type TReportChartItemType } from '@core/types/api/report.type'

interface SBasicColumnChartProps {
    chartName: string
    data?: TReportChartItemType[]
}

const SBasicColumnChart: FC<SBasicColumnChartProps> = ({ chartName, data = [] }) => {
    const hasState = data.some((item) => item.stateId)
    const hasRegion = !hasState && data.some((item) => item.regionId)

    let categories: string[] = []
    let seriesData: number[] = []

    if (hasState) {
        const grouped = new Map<string, number>()
        data.forEach((item) => {
            const key = item.stateName
            grouped.set(key as string, (grouped.get(key as string) || 0) + item.sumTotal)
        })
        categories = [...grouped.keys()]
        seriesData = [...grouped.values()]
    } else if (hasRegion) {
        const grouped = new Map<string, number>()
        data.forEach((item) => {
            const key = item.regionName
            grouped.set(key as string, (grouped.get(key as string) || 0) + item.sumTotal)
        })
        categories = [...grouped.keys()]
        seriesData = [...grouped.values()]
    } else {
        categories = ['مجموع کل']
        seriesData = [data.reduce((sum, item) => sum + item.sumTotal, 0)]
    }

    const options: Highcharts.Options = {
        chart: {
            type: 'column'
        },
        title: {
            text: chartName
        },
        xAxis: {
            categories,
            title: {
                text: 'دسته‌ها'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'مقدار کل',
                align: 'high'
            },
            labels: {
                overflow: 'justify',
                formatter: function () {
                    const val = this.value as number
                    return `${Highcharts.numberFormat(val / 1000, 0)} هزار`
                }
            }
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                const val = this.y as number
                const label = this.x as string
                return `
          <div style="text-align: right;">
            <strong>${Highcharts.numberFormat(val / 1000, 0)} هزار واحد</strong><br/>
            <span style="font-size: 12px; color: #666;">${label}</span>
          </div>
        `
            }
        },
        plotOptions: {
            column: {
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
                name: 'مقدار',
                type: 'column',
                data: seriesData
            }
        ]
    }

    return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default SBasicColumnChart

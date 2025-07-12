'use client'

import { type FC } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { type TReportChartItemType } from '@core/types/api/report.type'

interface SPieChartProps {
    chartName: string
    data?: TReportChartItemType[]
}

const SPieChart: FC<SPieChartProps> = ({ chartName, data = [] }) => {
    const hasRegion = data.some((item) => item.regionId)
    const hasState = !hasRegion && data.some((item) => item.stateId)

    let pieData: Highcharts.PointOptionsObject[] = []

    if (hasRegion) {
        const grouped = new Map<string, number>()
        data.forEach((item) => {
            const key = item.regionName
            grouped.set(key as string, (grouped.get(key as string) || 0) + item.sumTotal)
        })
        pieData = Array.from(grouped.entries()).map(([name, value]) => ({
            name,
            y: value
        }))
    } else if (hasState) {
        const grouped = new Map<string, number>()
        data.forEach((item) => {
            const key = item.stateName
            grouped.set(key as string, (grouped.get(key as string) || 0) + item.sumTotal)
        })
        pieData = Array.from(grouped.entries()).map(([name, value]) => ({
            name,
            y: value
        }))
    } else {
        const total = data.reduce((sum, item) => sum + item.sumTotal, 0)
        pieData = [
            {
                name: 'مجموع کل',
                y: total
            }
        ]
    }

    const options: Highcharts.Options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: chartName
        },
        tooltip: {
            useHTML: true,
            formatter: function () {
                const val = this.y as number
                const percentage = this.percentage?.toFixed(1)
                return `
          <div style="text-align: right;">
            <strong>${Highcharts.numberFormat(val / 1000, 0)} هزار واحد</strong><br/>
            <span style="color:#666;">${percentage}% از کل</span>
          </div>
        `
            }
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [
            {
                name: 'مقدار',
                type: 'pie',
                data: pieData
            }
        ]
    }

    return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default SPieChart

'use client'

import { type FC } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { type TReportChartItemType } from '@core/types/api/report.type'

interface SAreaChartProps {
    chartName: string
    data?: TReportChartItemType[]
}

const SAreaChart: FC<SAreaChartProps> = ({ chartName, data = [] }) => {
    const hasRegion = data.some((item) => item.regionId)
    const hasState = !hasRegion && data.some((item) => item.stateId)

    // استخراج تاریخ‌ها برای محور X
    const dateMap = new Map<string, number>()
    data.forEach((item) => {
        if (!dateMap.has(item.date)) {
            dateMap.set(item.date, 1)
        }
    })
    const dates = Array.from(dateMap.keys()).sort()

    // گروه‌بندی داده‌ها
    const groupByKey = (key: keyof TReportChartItemType) => {
        const grouped = new Map<string, { [date: string]: number }>()
        data.forEach((item) => {
            const groupName = item[key] as string
            if (!grouped.has(groupName)) {
                grouped.set(groupName, {})
            }
            const group = grouped.get(groupName)!
            group[item.date] = (group[item.date] || 0) + item.sumTotal
        })

        return Array.from(grouped.entries()).map(([name, values]) => ({
            name,
            type: 'area' as const,
            data: dates.map((date) => values[date] || 0)
        }))
    }

    let series: Highcharts.SeriesOptionsType[] = []

    if (hasRegion) {
        series = groupByKey('regionName')
    } else if (hasState) {
        series = groupByKey('stateName')
    } else {
        const totalByDate: { [date: string]: number } = {}
        data.forEach((item) => {
            totalByDate[item.date] = (totalByDate[item.date] || 0) + item.sumTotal
        })
        series = [
            {
                name: 'مجموع کل',
                type: 'area',
                data: dates.map((date) => totalByDate[date] || 0)
            }
        ]
    }

    const options: Highcharts.Options = {
        chart: {
            type: 'area'
        },
        title: {
            text: chartName
        },
        xAxis: {
            categories: dates,
            title: {
                text: 'تاریخ'
            }
        },
        yAxis: {
            title: {
                text: 'مقدار'
            },
            labels: {
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
                const date = this.x as string
                return `
          <div style="text-align: right;">
            <strong>${Highcharts.numberFormat(val, 0)} واحد</strong><br/>
            <span style="font-size: 12px; color: #666;">${date}</span>
          </div>
        `
            }
        },
        plotOptions: {
            area: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            }
        },
        credits: {
            enabled: false
        },
        series
    }

    return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default SAreaChart

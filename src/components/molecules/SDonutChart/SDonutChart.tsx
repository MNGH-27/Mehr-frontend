'use client'

import { type FC } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { type TReportChartItemType } from '@core/types/api/report.type'
import { type TCriticalAny } from '@core/types/type-any'

interface SDonutChartProps {
    chartName: string
    data?: TReportChartItemType[]
}

const SDonutChart: FC<SDonutChartProps> = ({ chartName, data = [] }) => {
    const hasRegion = data.some((item) => item.regionId)
    const hasState = !hasRegion && data.some((item) => item.stateId)

    let pieData: Highcharts.PointOptionsObject[] = []
    let total = 0

    if (hasRegion) {
        const grouped = new Map<string, number>()
        data.forEach((item) => {
            const key = item.regionName
            grouped.set(key as string, (grouped.get(key as string) || 0) + item.sumTotal)
        })
        pieData = Array.from(grouped.entries()).map(([name, value]) => {
            total += value
            return { name, y: value }
        })
    } else if (hasState) {
        const grouped = new Map<string, number>()
        data.forEach((item) => {
            const key = item.stateName
            grouped.set(key as string, (grouped.get(key as string) || 0) + item.sumTotal)
        })
        pieData = Array.from(grouped.entries()).map(([name, value]) => {
            total += value
            return { name, y: value }
        })
    } else {
        total = data.reduce((sum, item) => sum + item.sumTotal, 0)
        pieData = [{ name: 'مجموع کل', y: total }]
    }

    const options: Highcharts.Options = {
        chart: {
            type: 'pie',
            events: {
                load() {
                    const chart = this as TCriticalAny
                    const width = chart.plotWidth
                    const height = chart.plotHeight
                    const centerX = chart.plotLeft + width / 2
                    const centerY = chart.plotTop + height / 2

                    const formattedTotal = Highcharts.numberFormat(total, 0)

                    chart.renderer
                        .text(`${formattedTotal} واحد`, centerX, centerY)
                        .css({
                            color: '#000',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        })
                        .attr({
                            align: 'center'
                        })
                        .add()
                        .toFront()
                }
            }
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
            <strong>${Highcharts.numberFormat(val, 0)} واحد</strong><br/>
            <span style="color:#666;">${percentage}% از کل</span>
          </div>
        `
            }
        },
        plotOptions: {
            pie: {
                innerSize: '60%',
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

export default SDonutChart

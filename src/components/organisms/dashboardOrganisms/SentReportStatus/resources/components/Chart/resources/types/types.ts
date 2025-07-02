type TChartSeries = {
    type: 'pie'
    name: string
    data: { name: string; y: number; color: string }[]
}

type TChartCenterText = string

interface IChartProps {
    series: TChartSeries
    centerText: TChartCenterText
    className?: string
}

export type { IChartProps, TChartCenterText, TChartSeries }

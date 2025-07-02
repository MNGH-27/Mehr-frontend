type TChartSeries = {
    type: 'bar'
    name: string
    data: number[]
    color: string
}

interface IChartProps {
    series: TChartSeries[]
    className?: string
}

export type { IChartProps, TChartSeries }

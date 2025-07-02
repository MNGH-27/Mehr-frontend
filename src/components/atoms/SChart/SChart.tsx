import { type FC } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact, { type HighchartsReactProps } from 'highcharts-react-official'

const SChart: FC<HighchartsReactProps> = ({ ...rest }) => {
    return <HighchartsReact highcharts={Highcharts} {...rest} />
}

export default SChart

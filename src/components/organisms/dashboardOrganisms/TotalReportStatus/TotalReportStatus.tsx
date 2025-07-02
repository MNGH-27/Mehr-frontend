'use client'

import { Chart } from './resources'

const TotalReportStatus = () => {
    return (
        <div>
            <Chart
                series={[
                    {
                        color: '#253038',
                        data: [26, 0, 0],
                        name: 'حسابرسی شده',
                        type: 'bar'
                    },
                    {
                        color: '#FFA34D',
                        data: [0, 83, 0],
                        name: 'موعد تحویل',
                        type: 'bar'
                    },
                    {
                        color: '#00BA88',
                        data: [0, 0, 81],
                        name: 'حسابرسی نشده',
                        type: 'bar'
                    }
                ]}
            />
        </div>
    )
}

export default TotalReportStatus

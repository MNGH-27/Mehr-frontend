'use client'

import { STable } from '@molecules/STable'

import { DUMMY_DATA, TABLE_HEAD } from './resources'

const CooperateCompanies = () => {
    return (
        <div>
            <STable TABLE_HEAD={TABLE_HEAD}>
                {DUMMY_DATA.map((data, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td>{data.title} </STable.Td>
                        <STable.Td>{data.date}</STable.Td>
                        <STable.Td className='!text-primary'>{data.count}</STable.Td>
                    </STable.Tr>
                ))}
            </STable>
        </div>
    )
}

export default CooperateCompanies

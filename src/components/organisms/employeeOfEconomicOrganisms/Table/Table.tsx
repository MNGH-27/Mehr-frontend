'use client'

import { type FC, useState } from 'react'
import { Building2 } from 'lucide-react'

import { STable } from '@molecules/STable'

import { SBadge } from '@atoms/SBadge'
import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { type TKarkonanEghtesadiUserType } from '@core/types/api/user/karkonan-eghtesadi-user'
import { type TModalStateType } from '@core/types/modal-state-types'

import { AssignModal, type IEmployeeOfEconomicTableProps, TABLE_HEAD } from './resources'

const EmployeeOfEconomicTable: FC<IEmployeeOfEconomicTableProps> = ({ data }) => {
    const [assignModal, setAssignModal] = useState<TModalStateType<TKarkonanEghtesadiUserType>>({ isShow: false })

    return (
        <>
            <STable TABLE_HEAD={TABLE_HEAD}>
                {data?.map((data, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td>{data.firstName + ' ' + data.lastName} </STable.Td>
                        <STable.Td>{data.roleName}</STable.Td>
                        <STable.Td>
                            <div className='flex items-center justify-center gap-1 flex-wrap max-w-[250px] mx-auto'>
                                {data.myCompanies.map((item, index) => (
                                    <SBadge key={index} variant='light'>
                                        {' '}
                                        {item.companyName}
                                    </SBadge>
                                ))}
                            </div>
                        </STable.Td>
                        <STable.Td>
                            <SButton
                                onClick={() =>
                                    setAssignModal({
                                        isShow: true,
                                        data
                                    })
                                }
                                size='None'
                                variant='TextSecondary'
                            >
                                اضافه کردن شرکت
                                <Building2 size={20} />
                            </SButton>
                        </STable.Td>
                    </STable.Tr>
                ))}
            </STable>

            <SModal
                onClose={() => setAssignModal({ isShow: false })}
                opened={assignModal.isShow}
                topSection={{
                    icon: <Building2 />,
                    title: 'اضافه کردن شرکت به کارمند معاونت اقتصادی',
                    description: 'با اضافه کردن کارمند به هر شرکت دسترسی های لازم به آن کارمند داده خواهد شد'
                }}
            >
                <AssignModal data={assignModal.data} onClose={() => setAssignModal({ isShow: false })} />
            </SModal>
        </>
    )
}

export default EmployeeOfEconomicTable

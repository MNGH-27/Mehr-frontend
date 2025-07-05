'use client'

import { type FC, useState } from 'react'
import { Building2, MinusSquare } from 'lucide-react'

import { STable } from '@molecules/STable'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { type TIdNameType } from '@core/types/id-name/types'
import { type TModalStateType } from '@core/types/modal-state-types'

import { DeleteOrganTypeModal, type IManageOrganTypeTableProps, TABLE_HEAD } from './resources'

const ManageOrganTypeTable: FC<IManageOrganTypeTableProps> = ({ data }) => {
    const [deleteModal, setDeleteModal] = useState<TModalStateType<TIdNameType>>({ isShow: false })

    return (
        <>
            <STable TABLE_HEAD={TABLE_HEAD}>
                {data?.map((data, index) => (
                    <STable.Tr index={index} key={index}>
                        <STable.Td>{index + 1}</STable.Td>
                        <STable.Td>{data.name} </STable.Td>

                        <STable.Td>
                            <div className='flex items-center justify-center gap-x-5'>
                                <SButton
                                    onClick={() => setDeleteModal({ isShow: true, data })}
                                    size='None'
                                    variant='TextError'
                                >
                                    <Building2 size={20} />
                                    حذف
                                </SButton>
                            </div>
                        </STable.Td>
                    </STable.Tr>
                ))}
            </STable>

            <SModal
                topSection={{
                    title: 'حذف سازمان',
                    description: 'با حذف سازمان، دسترسی های آن سازمان از دست خواهد رفت',
                    icon: <MinusSquare size={20} />
                }}
                onClose={() => setDeleteModal({ isShow: false })}
                opened={deleteModal.isShow}
            >
                <DeleteOrganTypeModal onClose={() => setDeleteModal({ isShow: false })} data={deleteModal.data} />
            </SModal>
        </>
    )
}

export default ManageOrganTypeTable

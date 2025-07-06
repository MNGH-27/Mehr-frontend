'use client'

import { useState } from 'react'
import { ChartArea } from 'lucide-react'
import { StringParam, useQueryParams } from 'use-query-params'
import { useDisclosure } from '@mantine/hooks'

import { SSearchWithDelay } from '@molecules/SSearchWithDelay'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { AddOrganModal } from './resources'

const CreateReportFilter = () => {
    const [isShowAddModal, { close: onCloseAddModal, open: onOpenAddModal }] = useDisclosure(false)

    const [query, setQuery] = useQueryParams({
        name: StringParam
    })
    const [Search, setSearch] = useState(query.name ?? '')

    const onChangeFilter = (value: string | null) => {
        setQuery({ name: value })
    }

    return (
        <div className='flex flex-col items-start justify-center gap-y-5'>
            <div className='w-full flex items-center justify-center gap-x-5'>
                <SSearchWithDelay
                    value={Search}
                    onChange={(e) => setSearch(e.target.value)}
                    onDelayChange={onChangeFilter}
                />

                <div className='flex flex-col sm:flex-row items-center justify-center gap-y-3 gap-x-5 whitespace-nowrap w-full lg:w-fit'>
                    <SButton onClick={onOpenAddModal} size='SM' variant='FilledPrimary'>
                        <ChartArea />
                        افزودن گزارش
                    </SButton>
                </div>
            </div>

            <SModal
                onClose={onCloseAddModal}
                opened={isShowAddModal}
                topSection={{
                    title: 'ایجاد گزارش',
                    description: 'مشخصات گزارش جدید را وارد کنید:',
                    icon: <ChartArea />
                }}
            >
                <AddOrganModal onClose={onCloseAddModal} />
            </SModal>
        </div>
    )
}

export default CreateReportFilter

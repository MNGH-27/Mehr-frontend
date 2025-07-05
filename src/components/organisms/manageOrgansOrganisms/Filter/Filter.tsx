'use client'

import { useState } from 'react'
import { Building2 } from 'lucide-react'
import { NumberParam, StringParam, useQueryParams } from 'use-query-params'
import { useDisclosure } from '@mantine/hooks'

import { SSearchWithDelay } from '@molecules/SSearchWithDelay'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { AddOrganModal } from './resources'

const ManageOrgansFilter = () => {
    const [isShowAddModal, { close: onCloseAddModal, open: onOpenAddModal }] = useDisclosure(false)

    const [query, setQuery] = useQueryParams({ name: StringParam, page: NumberParam })
    const [Search, setSearch] = useState(query.name ?? '')

    const onChangeFilter = (value: string | null) => {
        setQuery({ name: value, page: 1 })
    }

    return (
        <div className='flex flex-col lg:flex-row items-start justify-center gap-x-10 gap-y-3'>
            <SSearchWithDelay
                value={Search}
                onChange={(e) => setSearch(e.target.value)}
                onDelayChange={onChangeFilter}
            />

            <div className='flex flex-col sm:flex-row items-center justify-center gap-y-3 gap-x-5 whitespace-nowrap w-full lg:w-fit'>
                <SButton onClick={onOpenAddModal} size='SM' variant='FilledPrimary'>
                    <Building2 />
                    افزودن سازمان
                </SButton>
            </div>

            <SModal
                onClose={onCloseAddModal}
                opened={isShowAddModal}
                topSection={{
                    title: 'ایجاد سازمان',
                    description: 'مشخصات سازمان جدید را وارد کنید:'
                }}
            >
                <AddOrganModal onClose={onCloseAddModal} />
            </SModal>
        </div>
    )
}

export default ManageOrgansFilter

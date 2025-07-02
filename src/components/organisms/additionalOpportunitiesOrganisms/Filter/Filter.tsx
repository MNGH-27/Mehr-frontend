'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { NumberParam, StringParam, useQueryParams } from 'use-query-params'
import { useDisclosure } from '@mantine/hooks'

import { SSearchWithDelay } from '@molecules/SSearchWithDelay'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { AddNewAdditionalModal } from './resources'

const AdditionalOpportunitiesFilter = () => {
    const [isShowModal, { open: onOpenModal, close: onCloseModal }] = useDisclosure(false)
    const [query, setQuery] = useQueryParams({ name: StringParam, page: NumberParam })
    const [Search, setSearch] = useState(query.name ?? '')

    const onChangeFilter = (value: string | null) => {
        setQuery({ name: value, page: 1 })
    }
    return (
        <>
            <div className='flex flex-col lg:flex-row items-start justify-center gap-x-10 gap-y-3'>
                <SSearchWithDelay
                    value={Search}
                    onChange={(e) => setSearch(e.target.value)}
                    onDelayChange={onChangeFilter}
                />

                <div className='flex flex-col sm:flex-row items-center justify-center gap-y-3 gap-x-5 whitespace-nowrap w-full lg:w-fit'>
                    <SButton onClick={onOpenModal} size='SM' variant='FilledPrimary'>
                        <Plus />
                        ایجاد فرصت جدید
                    </SButton>
                </div>
            </div>

            <SModal
                topSection={{
                    title: 'ایجاد فرصت جدید',
                    description:
                        'درصورتی که زمان یک شرکت برای بارگذاری مدارک به اتمام رسیده باشد، به او تا یک تاریخ مجددا فرصت ارسال داده میشود'
                }}
                onClose={onCloseModal}
                opened={isShowModal}
            >
                <AddNewAdditionalModal onClose={onCloseModal} />
            </SModal>
        </>
    )
}

export default AdditionalOpportunitiesFilter

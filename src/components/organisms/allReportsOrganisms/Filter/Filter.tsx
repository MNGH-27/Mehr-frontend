'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { NumberParam, StringParam, useQueryParams } from 'use-query-params'

import { SSearchWithDelay } from '@molecules/SSearchWithDelay'

import { SButton } from '@atoms/SButton'

import { PERMISSIONS } from '@core/constants/permission'
import { Routes } from '@core/constants/routes'
import { usePermissions } from '@core/services/stores/permissions.store'

const AllReportsFilter = () => {
    const { getSinglePermission } = usePermissions()

    const permission = useMemo(
        () => getSinglePermission(PERMISSIONS(Routes.ReportsAllReports())),
        [getSinglePermission]
    )

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
                <SButton
                    component={Link}
                    href={permission && permission.lstAccessCodes.includes(2) ? Routes.AddReport() : ''}
                    size='SM'
                    variant='FilledPrimary'
                >
                    <Plus />
                    افزودن گزارش
                </SButton>
            </div>
        </div>
    )
}

export default AllReportsFilter

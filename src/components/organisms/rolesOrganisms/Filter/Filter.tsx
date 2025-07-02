'use client'

import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { NumberParam, StringParam, useQueryParams } from 'use-query-params'
import { useDisclosure } from '@mantine/hooks'

import { SSearchWithDelay } from '@molecules/SSearchWithDelay'

import { SButton } from '@atoms/SButton'
import { SModal } from '@atoms/SModal'

import { PERMISSIONS } from '@core/constants/permission'
import { Routes } from '@core/constants/routes'
import { usePermissions } from '@core/services/stores/permissions.store'

import { AddRoleModal } from './resources'

const RolesFilter = () => {
    const { getSinglePermission } = usePermissions()

    const permission = useMemo(() => getSinglePermission(PERMISSIONS(Routes.Roles())), [getSinglePermission])

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
                <SButton
                    disabled={permission && !permission.lstAccessCodes.includes(2)}
                    onClick={onOpenAddModal}
                    size='SM'
                    variant='FilledPrimary'
                >
                    <Plus />
                    افزودن نقش
                </SButton>
            </div>

            <SModal
                onClose={onCloseAddModal}
                opened={isShowAddModal}
                topSection={{
                    title: 'ایجاد نقش',
                    description: 'مشخصات نقش جدید را وارد کنید:'
                }}
            >
                <AddRoleModal onClose={onCloseAddModal} />
            </SModal>
        </div>
    )
}

export default RolesFilter

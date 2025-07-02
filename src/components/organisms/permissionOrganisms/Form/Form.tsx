'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { StringParam, useQueryParam } from 'use-query-params'
import { useMutation } from '@tanstack/react-query'

import { ErrorBoundary } from '@partials/boundaries/Error'
import { LoadingBoundary } from '@partials/boundaries/Loading'

import { SCheckBoxGroup } from '@molecules/SCheckBoxGroup'

import { SButton } from '@atoms/SButton'

import { Routes } from '@core/constants/routes'
import { postSetPermissionForRoleMutationFn } from '@core/services/api/permissions/post-add-report'
import { useGetAllPermissions } from '@core/services/hooks/permissions/useGetAllPermissions'
import { useGetAllPermissionsByRoleId } from '@core/services/hooks/permissions/useGetAllPermissionsByRoleId'
import { type TCriticalAny } from '@core/types/type-any'

const PermissionsForm = () => {
    const { push } = useRouter()
    const [roleId] = useQueryParam('filter', StringParam)

    const [dataSchema, setDataSchema] = useState<{ [key: string]: string[] }>({})

    const {
        data: addPermissions,
        isLoading: isLoadingAllPermissions,
        isError: isErrorAllPermissions
    } = useGetAllPermissions({})
    const {
        data: permissionsLst,
        isLoading: isLoadingPermissionsLst,
        isError: isErrorPermissionsLst
    } = useGetAllPermissionsByRoleId({ RoleId: roleId ?? '' })

    useEffect(() => {
        if (permissionsLst?.data) {
            const tempDataSchema: { [key: string]: string[] } = {}
            permissionsLst.data.forEach((item) => {
                tempDataSchema[item.permissionId] = item.lstAccessCodes.map((item) => item.toString())
            })
            setDataSchema(tempDataSchema)
        }
    }, [permissionsLst?.data])

    const onChangePermissionHandler = () => {
        const permissionAccess: {
            permissionId: number
            accessCode: number[]
        }[] = []

        Object.entries(dataSchema).map(([key, value]) => {
            permissionAccess.push({
                permissionId: +key,
                accessCode: value.map((item) => +item)
            })
        })

        mutate({
            permissionAccess,
            roleId: roleId !== null && roleId !== undefined ? +roleId : -1
        })
    }

    const { mutate, isPending } = useMutation({
        mutationFn: postSetPermissionForRoleMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'دسترسی ها با موفقیت اضافه شد')

            push(Routes.Roles())
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'اضافه کردن دسترسی با مشکل مواجه شد')
        }
    })

    if (isLoadingAllPermissions || isLoadingPermissionsLst) {
        return <LoadingBoundary />
    }

    if (isErrorAllPermissions || isErrorPermissionsLst) {
        return <ErrorBoundary />
    }

    return (
        <div>
            {addPermissions?.data.map((singlePermission, index) => (
                <div className='space-y-3 my-5' key={index}>
                    <span className='font-medium text-secondary-800 text-lg'>{singlePermission.name}</span>
                    <SCheckBoxGroup
                        name=''
                        options={[
                            {
                                label: 'خواندن',
                                value: '1'
                            },
                            {
                                label: 'ایجاد کردن',
                                value: '2'
                            },
                            {
                                label: 'ویرایش ',
                                value: '3'
                            },
                            {
                                label: 'حذف ',
                                value: '4'
                            }
                        ]}
                        onChange={(value) =>
                            setDataSchema((prevState) => ({
                                ...prevState,
                                [singlePermission.id]: value
                            }))
                        }
                        value={dataSchema[singlePermission.id]}
                    />
                </div>
            ))}

            <SButton isLoading={isPending} onClick={onChangePermissionHandler} variant='FilledPrimary' size='M'>
                ثبت
            </SButton>
        </div>
    )
}

export default PermissionsForm

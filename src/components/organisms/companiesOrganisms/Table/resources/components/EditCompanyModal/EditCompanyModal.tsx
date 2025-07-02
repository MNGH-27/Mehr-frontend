import { type FC, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { MinusCircle, PlusCircle } from 'lucide-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SDatePicker } from '@atoms/SDatePicker'
import { SInput } from '@atoms/SInput'
import { SSelect } from '@atoms/SSelect'
import { SSwitch } from '@atoms/SSwitch'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postUpdateCompanyWithParentsMutationFn } from '@core/services/api/company/post-update-company-with-parents'
import { useGetAllCompanySystemTypesQueryFn } from '@core/services/hooks/company/useGetAllCompanySystemTypesQueryFn'
import { type TCriticalAny } from '@core/types/type-any'
import { convertDataSelectList } from '@core/utils/common/convert-data-select-list'
import { convertDateMicroseconds } from '@core/utils/common/convert-date-micro-seconds'
import { generateGUID } from '@core/utils/common/generate-guid'

import { editCompanySchema, type IEditCompanyModalProps, type TEditCompanyForm } from './resources'

const EditCompanyModal: FC<IEditCompanyModalProps> = ({ onClose, data }) => {
    const queryClient = useQueryClient()

    const [subCompanies, setSubCompanies] = useState<
        {
            id: string | number
            companyName: string
            systemTypeId: string
            fiscalYear: Date
            isForeigner: boolean
        }[]
    >([])

    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<TEditCompanyForm>({
        resolver: yupResolver(editCompanySchema)
    })

    const { data: allCompanySystemType, isLoading: isLoadingCompanySystemType } = useGetAllCompanySystemTypesQueryFn({})

    useEffect(() => {
        if (data?.childCompanies) {
            setSubCompanies(
                data.childCompanies.map((item) => ({
                    companyName: item.companyName,
                    fiscalYear: new Date(item.fiscalYear),
                    id: item.companyId,
                    isForeigner: item.isForeigner,
                    systemTypeId: item.companyTypes.length > 0 ? item.companyTypes[0].id.toString() : ''
                }))
            )
        }
    }, [data?.childCompanies])

    const { mutate, isPending } = useMutation({
        mutationFn: postUpdateCompanyWithParentsMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? ' شرکت با موفقیت ویرایش شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.AllParentCompanyWithChild]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'ویرایش شرکت با مشکل مواجه شد')
        }
    })

    return (
        <form
            className='grid md:grid-cols-2 gap-5'
            onSubmit={handleSubmit((value) => {
                let isCorrect = true

                subCompanies.forEach((item) => {
                    if (item.companyName.trim().length === 0) {
                        isCorrect = false
                        return
                    } else if (!item.systemTypeId || item.systemTypeId === null) {
                        isCorrect = false
                        return
                    }
                })
                if (isCorrect) {
                    const convertedChild: {
                        id?: number
                        companyName: string
                        systemTypeId: number
                        fiscalYear: string
                        isForeigner: boolean
                    }[] = []

                    subCompanies.forEach((item) => {
                        const itemId = item.id
                        if (typeof itemId === 'number') {
                            return convertedChild.push({
                                id: itemId,
                                companyName: item.companyName,
                                fiscalYear: convertDateMicroseconds(item.fiscalYear),
                                isForeigner: item.isForeigner,
                                systemTypeId: +item.systemTypeId
                            })
                        } else {
                            convertedChild.push({
                                companyName: item.companyName,
                                fiscalYear: convertDateMicroseconds(item.fiscalYear),
                                isForeigner: item.isForeigner,
                                systemTypeId: +item.systemTypeId
                            })
                        }
                    })

                    mutate({
                        companyName: value.companyName,
                        fiscalYear: convertDateMicroseconds(value.fiscalYear),
                        isForeigner: value.isForeigner,
                        systemTypeId: +value.systemTypeId,
                        companyId: data?.companyId ?? -1,
                        childs: convertedChild
                    })
                } else toast.error('لطفا مقادیر نوع شرکت زیر مجموعه را به درستی وارد کنید')
            })}
        >
            <Controller
                name='companyName'
                control={control}
                defaultValue={data?.companyName ?? ''}
                render={({ field }) => (
                    <SInputField label='نام شرکت' errors={errors} name={field.name}>
                        <SInput {...field} placeholder='نام شرکت را وارد کنید' />
                    </SInputField>
                )}
            />
            <Controller
                name='systemTypeId'
                control={control}
                defaultValue={data?.companyTypes[0].id.toString() ?? ''}
                render={({ field }) => (
                    <SInputField label='نوع شرکت' errors={errors} name={field.name}>
                        <SSelect
                            isLoading={isLoadingCompanySystemType}
                            data={convertDataSelectList(allCompanySystemType?.data)}
                            {...field}
                            placeholder='نوع شرکت را انتخاب کنید'
                        />
                    </SInputField>
                )}
            />
            <Controller
                name='fiscalYear'
                control={control}
                defaultValue={data?.fiscalYear && new Date(data?.fiscalYear)}
                render={({ field }) => (
                    <SInputField label='شروع سال مالی' errors={errors} name={field.name}>
                        <SDatePicker {...field} placeholder='شروع سال مالی را انتخاب کنید' />
                    </SInputField>
                )}
            />
            <Controller
                name='isForeigner'
                control={control}
                defaultValue={data?.isForeigner}
                render={({ field }) => (
                    <SInputField label='شرکت خارجی' errors={errors} name={field.name}>
                        <SSwitch {...field} />
                    </SInputField>
                )}
            />

            <div className='col-span-full w-full space-y-5  border-2 rounded-md p-3'>
                <div className='col-span-full flex items-center justify-start gap-x-2'>
                    <span>دسته بندی زیرمجموعه</span>
                    <SButton
                        onClick={() => {
                            setSubCompanies((prevState) =>
                                (prevState ?? []).concat([
                                    {
                                        companyName: '',
                                        fiscalYear: new Date(),
                                        id: generateGUID(),
                                        isForeigner: false,
                                        systemTypeId: ''
                                    }
                                ])
                            )
                        }}
                        type='button'
                        variant='TextPrimary'
                        size='None'
                        className='!w-fit'
                    >
                        <PlusCircle />
                        اضافه کردن شرکت
                    </SButton>
                </div>
                {subCompanies?.map((singleSubCompany, index) => (
                    <div className='col-span-full grid md:grid-cols-2 gap-1' key={index}>
                        <SButton
                            onClick={() =>
                                setSubCompanies((prevState) =>
                                    prevState.filter((item) => item.id !== singleSubCompany.id)
                                )
                            }
                            type='button'
                            variant='TextError'
                            size='None'
                            className='!w-fit col-span-full'
                        >
                            <MinusCircle />
                            حذف شرکت
                        </SButton>
                        <SInputField label='نام شرکت' errors={errors} name={''}>
                            <SInput
                                value={singleSubCompany.companyName}
                                onChange={(value) => {
                                    setSubCompanies((prevState) =>
                                        prevState?.map((item) => {
                                            if (item.id === singleSubCompany.id) {
                                                return {
                                                    ...singleSubCompany,
                                                    companyName: value
                                                }
                                            }

                                            return item
                                        })
                                    )
                                }}
                                placeholder='نام شرکت را وارد کنید'
                            />
                        </SInputField>

                        <SInputField label='نوع شرکت' errors={errors} name={''}>
                            <SSelect
                                isLoading={isLoadingCompanySystemType}
                                data={convertDataSelectList(allCompanySystemType?.data)}
                                placeholder='نوع شرکت را انتخاب کنید'
                                value={singleSubCompany.systemTypeId}
                                onChange={(value) => {
                                    if (value)
                                        setSubCompanies((prevState) =>
                                            prevState?.map((item) => {
                                                if (item.id === singleSubCompany.id) {
                                                    return {
                                                        ...singleSubCompany,
                                                        systemTypeId: value
                                                    }
                                                }

                                                return item
                                            })
                                        )
                                }}
                            />
                        </SInputField>

                        <SInputField label='شروع سال مالی' errors={errors} name={''}>
                            <SDatePicker
                                placeholder='شروع سال مالی را انتخاب کنید'
                                value={singleSubCompany.fiscalYear}
                                onChange={(value) => {
                                    if (value)
                                        setSubCompanies((prevState) =>
                                            prevState?.map((item) => {
                                                if (item.id === singleSubCompany.id) {
                                                    return {
                                                        ...singleSubCompany,
                                                        fiscalYear: value
                                                    }
                                                }

                                                return item
                                            })
                                        )
                                }}
                            />
                        </SInputField>

                        <SInputField label='شرکت خارجی' errors={errors} name={''}>
                            <SSwitch
                                value={singleSubCompany.isForeigner}
                                onChange={(value) => {
                                    setSubCompanies((prevState) =>
                                        prevState?.map((item) => {
                                            if (item.id === singleSubCompany.id) {
                                                return {
                                                    ...singleSubCompany,
                                                    isForeigner: value
                                                }
                                            }

                                            return item
                                        })
                                    )
                                }}
                            />
                        </SInputField>
                    </div>
                ))}
            </div>

            <div className='col-span-full flex items-center justify-end gap-3'>
                <SButton type='button' onClick={onClose} size='M' variant='OutlineSecondary'>
                    بازگشت
                </SButton>
                <SButton isLoading={isPending} size='M' variant='FilledSecondary'>
                    ثبت نهایی
                </SButton>
            </div>
        </form>
    )
}

export default EditCompanyModal

import { type FC, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { MinusCircle, PlusCircle } from 'lucide-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SInput } from '@atoms/SInput'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { postUpdateSystemTypeWithParentsMutationFn } from '@core/services/api/company/post-update-system-type-with-parents'
import { type TCriticalAny } from '@core/types/type-any'
import { generateGUID } from '@core/utils/common/generate-guid'

import {
    editCompanySystemTypeSchema,
    type IEditCompanySystemTypeModalProps,
    type TEditCompanySystemTypeForm
} from './resources'

const EditCompanySystemTypeModal: FC<IEditCompanySystemTypeModalProps> = ({ onClose, data }) => {
    const queryClient = useQueryClient()

    const [subCompanyType, setSubCompanyType] = useState<
        {
            id: string | number
            name: string
            type: number
            englishName: string
        }[]
    >([])

    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<TEditCompanySystemTypeForm>({
        resolver: yupResolver(editCompanySystemTypeSchema)
    })

    useEffect(() => {
        if (data?.childs) {
            setSubCompanyType(
                data.childs.map((item) => ({
                    englishName: item.englishName,
                    id: item.id,
                    name: item.name,
                    type: 1
                }))
            )
        }
    }, [data?.childs])

    const { mutate, isPending } = useMutation({
        mutationFn: postUpdateSystemTypeWithParentsMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'دسته‌بندی شرکت با موفقیت ویرایش شد')

            //invalidate queryKeys
            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.AllSystemTypeWithChild]
            })

            //close modal
            onClose()
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'ویرایش دسته‌بندی شرکت با مشکل مواجه شد')
        }
    })

    return (
        <form
            className='grid md:grid-cols-2 gap-5'
            onSubmit={handleSubmit((value) => {
                let isCorrect = true

                subCompanyType.forEach((item) => {
                    if (item.name.trim().length === 0) {
                        isCorrect = false
                        return
                    } else if (item.englishName.trim().length === 0) {
                        isCorrect = false
                        return
                    }
                })
                if (isCorrect) {
                    const convertedChild: {
                        name: string
                        englishName: string
                        type: number
                        id?: number
                    }[] = []

                    subCompanyType.forEach((item) => {
                        const itemId = item.id
                        if (typeof itemId === 'number') {
                            return convertedChild.push({
                                id: itemId,
                                name: item.name,
                                type: 1,
                                englishName: item.englishName
                            })
                        } else {
                            convertedChild.push({
                                name: item.name,
                                type: 1,
                                englishName: item.englishName
                            })
                        }
                    })

                    mutate({
                        ...value,
                        englishName: 'default',
                        type: 1,
                        systemTypeId: data?.id ?? -1,
                        childs: convertedChild
                    })
                } else toast.error('لطفا مقادیر نوع شرکت زیر مجموعه را به درستی وارد کنید')
            })}
        >
            <Controller
                name='name'
                control={control}
                defaultValue={data?.name ?? ''}
                render={({ field }) => (
                    <SInputField label='نام فارسی' errors={errors} name={field.name}>
                        <SInput {...field} placeholder='نام فارسی را وارد کنید' />
                    </SInputField>
                )}
            />

            <div className='col-span-full w-full space-y-5  border-2 rounded-md p-3'>
                <div className='col-span-full flex items-center justify-start gap-x-2'>
                    <span>دسته بندی زیرمجموعه</span>
                    <SButton
                        onClick={() => {
                            setSubCompanyType((prevState) =>
                                (prevState ?? []).concat([
                                    {
                                        englishName: '',
                                        name: '',
                                        id: generateGUID(),
                                        type: 1
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
                        اضافه کردن نوع شرکت
                    </SButton>
                </div>
                {subCompanyType?.map((singleSubCompanyType, index) => (
                    <div className='col-span-full grid md:grid-cols-2 gap-1' key={index}>
                        <SButton
                            onClick={() =>
                                setSubCompanyType((prevState) =>
                                    prevState.filter((item) => item.id !== singleSubCompanyType.id)
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
                        <SInputField label='نام فارسی' errors={errors} name={''}>
                            <SInput
                                value={singleSubCompanyType.name}
                                onChange={(value) => {
                                    setSubCompanyType((prevState) =>
                                        prevState?.map((item) => {
                                            if (item.id === singleSubCompanyType.id) {
                                                return {
                                                    ...singleSubCompanyType,
                                                    name: value
                                                }
                                            }

                                            return item
                                        })
                                    )
                                }}
                                placeholder='نام فارسی را وارد کنید'
                            />
                        </SInputField>
                        <SInputField label='نام انگلیسی' errors={errors} name={''}>
                            <SInput
                                inputType='english-number'
                                value={singleSubCompanyType.englishName}
                                onChange={(value) => {
                                    setSubCompanyType((prevState) =>
                                        prevState?.map((item) => {
                                            if (item.id === singleSubCompanyType.id) {
                                                return {
                                                    ...singleSubCompanyType,
                                                    englishName: value
                                                }
                                            }

                                            return item
                                        })
                                    )
                                }}
                                placeholder='نام انگلیسی را وارد کنید'
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

export default EditCompanySystemTypeModal

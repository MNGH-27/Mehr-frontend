'use client'

import { type FC, useState } from 'react'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

import { SCheckBoxGroup } from '@molecules/SCheckBoxGroup'

import { SButton } from '@atoms/SButton'

import { postSetNewConfigForNotificationMutationFn } from '@core/services/api/notification/post-set-new-config-for-notification'
import { type TCriticalAny } from '@core/types/type-any'

import { type INotificationSettingFormProps } from './resources'

const NotificationSettingForm: FC<INotificationSettingFormProps> = () => {
    const [dataSchema, setDataSchema] = useState<string[]>([])

    // useEffect(() => {
    //     if (permissionsLst?.data) {
    //         const tempDataSchema: { [key: string]: string[] } = {}
    //         permissionsLst.data.forEach((item) => {
    //             tempDataSchema[item.permissionId] = item.lstAccessCodes.map((item) => item.toString())
    //         })
    //         setDataSchema(tempDataSchema)
    //     }
    // }, [permissionsLst?.data])

    const onChangeConfigHandler = () => {
        const finalConfig = {
            isSendSMSAfterOfUnVerifyReport: 0,
            isSendSMSAfterOfLockReport: 0,
            isSendSMSAfterOfVerifyReport: 0,
            isSendSMSAfterOfNewTicket: 0,
            isWarningSendSMSForUploadReport: 0
        }

        dataSchema.forEach((singleItem) => {
            finalConfig[singleItem as keyof typeof finalConfig] = 1
        })

        mutate(finalConfig)
    }

    const { mutate, isPending } = useMutation({
        mutationFn: postSetNewConfigForNotificationMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'تنظیمات اعلان ها با موفقیت اضافه شد')
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'اضافه کردن تنظیمات اعلان با مشکل مواجه شد')
        }
    })

    return (
        <div className='grid grid-cols-2 gap-5'>
            <div className='space-y-3 my-5'>
                <span className='font-medium text-secondary-800 text-lg'>تنظیمات اعلان</span>
                <SCheckBoxGroup
                    name=''
                    options={[
                        {
                            label: 'ارسال پیامک بعد از تایید نشدن',
                            value: 'isSendSMSAfterOfUnVerifyReport'
                        },
                        {
                            label: 'ارسال پیامک بعد قفل شدن',
                            value: 'isSendSMSAfterOfLockReport'
                        },
                        {
                            label: 'ارسال پیامک بعد از تایید',
                            value: 'isSendSMSAfterOfVerifyReport'
                        },
                        {
                            label: 'ارسال پیامک بعد از ساخت تیکت جدید',
                            value: 'isSendSMSAfterOfNewTicket'
                        },
                        {
                            label: 'ارسال هشدار برای آپلود گزارش',
                            value: 'isWarningSendSMSForUploadReport'
                        }
                    ]}
                    onChange={(value) => setDataSchema(value)}
                    value={dataSchema}
                />
            </div>

            <div className='col-span-full flex'>
                <SButton
                    onClick={onChangeConfigHandler}
                    isLoading={isPending}
                    variant='FilledPrimary'
                    size='M'
                    className='!w-fit mr-auto'
                >
                    تایید
                </SButton>
            </div>
        </div>
    )
}

export default NotificationSettingForm

import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { SDropZone } from '@molecules/SDropZone'
import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SInput } from '@atoms/SInput'

import { addReportTypeSchema, type IRejectModalModalProps, type TRejectModalForm } from './resources'

const RejectModal: FC<IRejectModalModalProps> = ({ onClose }) => {
    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<TRejectModalForm>({
        resolver: yupResolver(addReportTypeSchema)
    })

    return (
        <form className='flex flex-col gap-5' onSubmit={handleSubmit((value) => console.log('value : ', value))}>
            <Controller
                name='sendTime'
                control={control}
                render={({ field }) => (
                    <SInputField
                        label='زمان ارسال مجدد فایل (اختیاری)'
                        description='فرصت آپلود از زمان سررسید به مدت زمان تعیین شده'
                        errors={errors}
                        name={field.name}
                    >
                        <SInput {...field} placeholder='زمان ارسال مجدد فایل  را وارد کنید' />
                    </SInputField>
                )}
            />

            <Controller
                name='file'
                control={control}
                render={({ field }) => (
                    <SInputField
                        className='col-span-full'
                        label='پیغام حاوی دلیل خطا'
                        errors={errors}
                        name={field.name}
                    >
                        <SDropZone
                            {...field}
                            onChange={(file) => {
                                console.log('file : ', file)
                            }}
                        />
                    </SInputField>
                )}
            />

            <div className='col-span-full flex items-center justify-end gap-3'>
                <SButton type='button' onClick={onClose} size='M' variant='OutlineSecondary'>
                    بازگشت
                </SButton>
                <SButton size='M' variant='FilledSecondary'>
                    ثبت نهایی
                </SButton>
            </div>
        </form>
    )
}

export default RejectModal

'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { LockKeyhole, User2 } from 'lucide-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import { SInputField } from '@molecules/SInputField'

import { SButton } from '@atoms/SButton'
import { SCaptcha } from '@atoms/SCaptcha'
import { SInput } from '@atoms/SInput'
import { SPasswordInput } from '@atoms/SPasswordInput'

import { Routes } from '@core/constants/routes'
import { postLoginUserMutationFn } from '@core/services/api/sign-up/post-login-user'
import { useGetCaptcha } from '@core/services/hooks/basic-info/useGetCaptcha'
import { type TCriticalAny } from '@core/types/type-any'

import { authenticationSchema, type TAuthForm } from './resources'

const AuthTemplate = () => {
    const { push } = useRouter()

    const {
        formState: { errors },
        control,
        handleSubmit
    } = useForm<TAuthForm>({
        resolver: yupResolver(authenticationSchema)
    })

    const { data: captcha, isFetching: isFetchingCaptcha, refetch: refetchCaptcha } = useGetCaptcha({})

    const { mutate, isPending: isSubmitting } = useMutation({
        mutationFn: postLoginUserMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success('با موفقیت وارد شدید')
            const expirationDate = new Date()
            expirationDate.setHours(expirationDate.getHours() + 6)

            localStorage.setItem('token', response.data.token)
            localStorage.setItem('fullName', response.data.fullName)
            localStorage.setItem('lastRole', JSON.stringify(response.data.lastRole))

            //redirect to panel
            push(Routes.Panel())
        },
        onError: (error: TCriticalAny) => {
            //check if there is message to show
            if (error.data.errors.message) toast.error(error.data.errors.message)
            else toast.error('ورود ناموفق بود')

            //refetch captcha
            refetchCaptcha()
        }
    })

    //redirect user to panel if there is token in cookie
    useEffect(() => {
        const accessToken = localStorage.getItem('token')

        //check if there is token in cookie
        if (!!accessToken) {
            push(Routes.Panel())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='grid p-5 w-screen h-screen bg-gray-100 overflow-y-auto'>
            <div className='flex flex-col items-center justify-center w-full sm:w-3/4 mx-auto'>
                <div className='flex flex-col items-center justify-center bg-primary w-full py-3 md:py-6 rounded-t-2xl'>
                    <Image src={'/images/logo.png'} alt='logo' width={60} height={60} className='w-12 h-10 mb-5' />
                    <span className='text-xl md:text-2xl xl:text-3xl font-semibold text-white'>سامانه گزارش گیری</span>
                    <span className='text-base md:text-lg xl:text-xl font-medium text-white'>وزارت آموزش پرورش</span>
                </div>

                <form
                    onSubmit={handleSubmit((value) =>
                        mutate({ ...value, captchaKey: captcha?.data.imageKey as string, isRememberMe: false })
                    )}
                    className='grid w-full border-2 rounded-b-2xl shadow-sm py-4 sm:py-6 px-8 sm:px-16 md:px-20 xl:px-32 bg-white'
                >
                    <div className='flex flex-col gap-y-1 items-center justify-center max-w-[500px] mx-auto md:px-5 sm:mt-5 mb-7'>
                        <span className='text-primary text-lg md:text-xl xl:text-2xl font-medium  '>
                            ورود به حساب کاربری
                        </span>
                        <span className='text-center text-xs sm:text-sm text-gray-600'>
                            ورود به سامانه تنها برای کاربران دارای سطح دسترسی معتبر امکان‌پذیر است. در صورت بروز مشکل
                            هنگام ورود، لطفاً با مدیر سامانه تماس حاصل فرمایید.
                        </span>
                    </div>

                    <Controller
                        name='userName'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                            <SInputField className='w-full mb-3' errors={errors} name={field.name} label='نام کاربری'>
                                <SInput
                                    inputType='other'
                                    placeholder='نام کاربری خود را وارد کنید'
                                    leftSection={<User2 />}
                                    {...field}
                                />
                            </SInputField>
                        )}
                    />
                    <Controller
                        name='password'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                            <SInputField className='w-full' errors={errors} name={field.name} label='کلمه عبور'>
                                <SPasswordInput
                                    leftSection={<LockKeyhole />}
                                    placeholder='کلمه عبور خود را وارد کنید'
                                    {...field}
                                />
                            </SInputField>
                        )}
                    />

                    <div className='flex items-center justify-center gap-x-2'>
                        <Controller
                            name='captchaValue'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <SInputField
                                    label='کدامنیتی'
                                    description='حساس به حروف بزرگ و کوچک'
                                    errors={errors}
                                    name={field.name}
                                    className='mt-5'
                                >
                                    <SInput {...field} inputType='other' placeholder='مقدار کد امنیتی را وارد کنید' />
                                </SInputField>
                            )}
                        />
                        <SCaptcha
                            captcha={captcha?.data}
                            refetchCaptcha={refetchCaptcha}
                            isFetchingCaptcha={isFetchingCaptcha}
                        />
                    </div>
                    <SButton isLoading={isSubmitting} variant='FilledPrimary' size='M' className='my-5'>
                        ورود به سامانه
                    </SButton>
                </form>
                <p className='text-[10px] sm:text-sm md:text-base text-center mt-3 text-primary font-medium'>
                    کلیه حقوق این سامانه متعلق به وزارت آموزش و پرورش جمهوری اسلامی ایران می‌باشد.
                    <br /> طراحی و پیاده‌سازی این سامانه توسط تیم طراحی دانشگاه تربیت دبیر شهید رجایی انجام شده است.
                </p>
            </div>
        </div>
    )
}

export default AuthTemplate

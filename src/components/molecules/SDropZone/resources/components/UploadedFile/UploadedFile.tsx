import { type FC } from 'react'
import { CheckCircle, Download, Trash } from 'lucide-react'

import { ErrorBoundary } from '@partials/boundaries/Error'
import { LoadingBoundary } from '@partials/boundaries/Loading'

import { SButton } from '@atoms/SButton'
import { SProgress } from '@atoms/SProgress'

import { useGetDocumentById } from '@core/services/hooks/general/useGetDocumentById'

import { type IUploadedFileProps } from './resources'

const UploadedFile: FC<IUploadedFileProps> = ({ progress, value, isUploading, onChange }) => {
    const { data, isLoading, isError } = useGetDocumentById({
        Id: value
    })

    //check if user is uploading file
    if (isUploading) {
        return (
            <div className='p-2 rounded-md border space-y-2'>
                <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>درحال آپلود فایل</span>
                    <span className='text-sm font-medium'>{progress}%</span>
                </div>
                <SProgress value={progress} />
            </div>
        )
    }

    //check if there is file to render
    if (value) {
        if (isLoading) {
            return (
                <div className='p-2 rounded-md border flex items-center justify-between gap-2'>
                    <LoadingBoundary text='درحال دریافت فایل آپلود' />{' '}
                </div>
            )
        } else if (isError) {
            return (
                <div className='p-2 rounded-md border flex items-center justify-between gap-2'>
                    <ErrorBoundary text='خطا در دریافت فایل' />
                </div>
            )
        }

        return (
            <div className='p-2 rounded-md border flex items-center justify-between gap-2'>
                <div className='flex items-center justify-start gap-2 font-medium'>
                    <CheckCircle className=' text-success' />
                    <div className='flex items-center justify-center'>
                        <span className='text-gray-700'>نام فایل : </span> <span> {data?.data.alias} </span>
                    </div>
                </div>

                <div className='flex items-center justify-center gap-x-1'>
                    <button
                        type='button'
                        onClick={() => {
                            const link = document.createElement('a')
                            link.href = `data:${data?.data.contentType};base64,${data?.data.base64File}`
                            link.download = `${data?.data.alias}${data?.data.extension}` // Replace 'file-name.ext' with the desired filename and extension
                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)
                        }}
                        className='!w-fit !p-1 text-primary'
                    >
                        <Download />
                    </button>
                    <SButton onClick={() => onChange('')} size='SM' variant='TextError' className='!w-fit !p-1'>
                        <Trash />
                    </SButton>
                </div>
            </div>
        )
    }

    //there is no file and action
    return <></>
}

export default UploadedFile

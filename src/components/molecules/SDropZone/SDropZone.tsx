import { type ChangeEvent, type DragEvent, forwardRef, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { Images, Paperclip, Send } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'

import { SButton } from '@atoms/SButton'

import { postUploadDocumentMutationFn } from '@core/services/api/general/post-upload-document'
import { type TCriticalAny } from '@core/types/type-any'

import { type ISDropZoneProps, UploadedFile } from './resources'

const SDropZone = forwardRef<HTMLDivElement, ISDropZoneProps>(({ multiple = false, onChange, value, ...rest }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const [progress, setProgress] = useState(0)

    const { mutate, isPending: isUploading } = useMutation({
        mutationFn: postUploadDocumentMutationFn,
        onSuccess: (response: TCriticalAny) => {
            if (response.data.message) {
                toast.success(response.data.message)
            } else toast.success('فایل با موفقیت آپلود شد')

            //set progress to 0
            setProgress(0)

            //add id of uploaded file to parent form
            onChange(response.data)
        },
        onError: (error: TCriticalAny) => {
            if (error.data.message) {
                toast.error(error.data.message)
            } else toast.error('آپلود فایل با مشکل مواجه شد')
        }
    })

    const [isDragging, setIsDragging] = useState(false)

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsDragging(false)

        const selectedFiles = Array.from(event.dataTransfer.files || [])

        //request for upload file
        mutate({
            file: selectedFiles[0] as File,
            setProgress
        })
    }

    // Handle file selection via the file input
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || [])

        //request for upload file
        mutate({
            file: selectedFiles[0] as File,
            setProgress
        })
    }

    // Trigger the file input click
    const handleClick = () => {
        if (fileInputRef?.current) fileInputRef?.current.click()
    }

    return (
        <>
            {!(multiple === false && !!value) && (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={handleClick}
                    className={`w-full ${isDragging ? 'bg-blue-tint-100 border-blue-tint-200' : 'bg-gray-100 border-gray-200'} duration-300 border rounded-lg flex flex-col gap-0 overflow-hidden`}
                >
                    <input
                        ref={fileInputRef}
                        type='file'
                        multiple={multiple}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        {...rest}
                    />
                    <div className='w-full grow h-full pt-3 pb-10 px-4 text-xs text-gray-500'>
                        فایل یا تصویر مورد نطر خود را اینجا بکشید یا از گزینه های زیر استفاده کنید...
                    </div>
                    <div className='flex items-center md:justify-between justify-center h-fit w-full px-3 py-2 border-t border-gray-200'>
                        <SButton type='button' size='XS' variant='FilledSecondary' className='!w-fit'>
                            <Send size='16' />
                            ارسال فایل یا تصویر
                        </SButton>
                        <div className='md:flex items-center gap-5 hidden'>
                            <Images size='18' color='#CBCBCB' className='shrink-0' />
                            <Paperclip size='18' color='#CBCBCB' className='shrink-0' />
                        </div>
                    </div>
                </div>
            )}

            <UploadedFile isUploading={isUploading} onChange={onChange} progress={progress} value={value} />
        </>
    )
})

SDropZone.displayName = 'SDropZone'
export default SDropZone

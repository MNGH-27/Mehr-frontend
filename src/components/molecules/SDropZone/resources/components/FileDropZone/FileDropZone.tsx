import { type DragEvent, useState } from 'react'
import { Images, Paperclip, Send } from 'lucide-react'

import { SButton } from '@atoms/SButton'

const FileDropZone = () => {
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
    }

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`w-full ${isDragging ? 'bg-blue-tint-100 border-blue-tint-200' : 'bg-gray-100 border-gray-200'} duration-300 border rounded-lg flex flex-col gap-0 overflow-hidden`}
        >
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
    )
}

export default FileDropZone

interface IUploadedFileProps {
    progress: number
    value: string
    isUploading?: boolean
    onChange: (value: string | number) => void
}

export type { IUploadedFileProps }

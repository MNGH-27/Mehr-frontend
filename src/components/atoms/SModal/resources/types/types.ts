import type React from 'react'
import { type ModalProps } from '@mantine/core'

interface ISModalProps extends ModalProps {
    topSection?: {
        icon?: React.ReactNode
        title: string
        description: string
    }
}

export type { ISModalProps }

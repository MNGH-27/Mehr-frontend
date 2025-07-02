import { type FC } from 'react'
import { Progress, type ProgressProps } from '@mantine/core'

const SProgress: FC<ProgressProps> = ({ className = '', ...rest }) => {
    return <Progress className={`!h-1 ${className}`} {...rest} />
}

export default SProgress

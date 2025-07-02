import React, { type FC } from 'react'
import { Badge } from '@mantine/core'

import { type ISBadgeProps } from './resources'

const SBadge: FC<ISBadgeProps> = ({ children, className = '', ...rest }) => {
    return (
        <Badge className={'!block !h-auto ' + className} {...rest}>
            {children}
        </Badge>
    )
}

export default SBadge

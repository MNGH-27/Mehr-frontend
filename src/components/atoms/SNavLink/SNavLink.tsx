import { type FC } from 'react'
import { NavLink } from '@mantine/core'

import { type ISNavLinkProp } from './resources'
import Link from 'next/link'

const SNavLink: FC<ISNavLinkProp> = ({ className = '', active = false, ...rest }) => {
    return (
        <NavLink
            component={Link}
            className={`rounded-[10px] hover:!bg-white hover:!text-primary-tinted-950 duration-300 !text-gray-800 font-medium ${className} ${active ? '!bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.15)] !text-primary-tinted-950' : ''}`}
            {...rest}
        />
    )
}

export default SNavLink

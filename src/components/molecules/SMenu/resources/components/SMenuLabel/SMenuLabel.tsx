import { type FC } from 'react'
import { Menu, type MenuLabelProps } from '@mantine/core'

const SMenuLabel: FC<MenuLabelProps> = ({ children, ...rest }) => {
    return <Menu.Label {...rest}>{children}</Menu.Label>
}

export default SMenuLabel

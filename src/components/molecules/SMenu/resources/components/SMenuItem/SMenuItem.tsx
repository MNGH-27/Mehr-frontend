import { type FC } from 'react'
import { Menu, type MenuItemProps } from '@mantine/core'

const SMenuItem: FC<MenuItemProps> = ({ children, ...rest }) => {
    return <Menu.Item {...rest}>{children}</Menu.Item>
}

export default SMenuItem

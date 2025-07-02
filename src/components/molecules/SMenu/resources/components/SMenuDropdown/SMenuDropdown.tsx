import { type FC } from 'react'
import { Menu, type MenuDropdownProps } from '@mantine/core'

const SMenuDropdown: FC<MenuDropdownProps> = ({ children, ...rest }) => {
    return <Menu.Dropdown {...rest}>{children}</Menu.Dropdown>
}

export default SMenuDropdown

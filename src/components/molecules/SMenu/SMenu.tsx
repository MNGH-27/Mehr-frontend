import { type FC } from 'react'
import { Menu } from '@mantine/core'

import { type ISMenu, SMenuDropdown, SMenuItem, SMenuLabel, SMenuTarget } from './resources'

const SMenu: FC<ISMenu> & {
    Target: typeof SMenuTarget
    Label: typeof SMenuLabel
    Item: typeof SMenuItem
    Dropdown: typeof SMenuDropdown
} = ({ children, ...rest }) => {
    return (
        <Menu withArrow {...rest}>
            {children}
        </Menu>
    )
}

SMenu.Target = SMenuTarget
SMenu.Label = SMenuLabel
SMenu.Item = SMenuItem
SMenu.Dropdown = SMenuDropdown

export default SMenu

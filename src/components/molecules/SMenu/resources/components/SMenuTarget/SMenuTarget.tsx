import { type FC } from 'react'
import { Menu, type MenuTargetProps } from '@mantine/core'

const SMenuTarget: FC<MenuTargetProps> = ({ children, ...rest }) => {
    return <Menu.Target {...rest}>{children}</Menu.Target>
}

export default SMenuTarget

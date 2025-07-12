import { type TUserDetailType } from '@core/types/api/users.types'

type TChangePasswordTypeForm = {
    password: string
    repeatedPassword: string
}

interface IChangePasswordProps {
    data?: TUserDetailType
}

export type { IChangePasswordProps, TChangePasswordTypeForm }

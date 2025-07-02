import { type TUserDataType } from '@core/types/api/user/user-data'

type TChangePasswordTypeForm = {
    password: string
    repeatedPassword: string
}

interface IChangePasswordProps {
    data?: TUserDataType
}

export type { IChangePasswordProps, TChangePasswordTypeForm }

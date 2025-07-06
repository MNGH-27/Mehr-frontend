export type TUserListItemType = {
    id: number
    firstName: string
    lastName: string
    natId: string
    phoneNumber: string
    birthDate: Date
}

export type TUserByNatIdType = {
    firstName: string
    lastName: string
    natId: string
    phoneNumber: string
}

export type TUserInOrganItemType = {
    userId: number
    roleId: number
    organId: number
    userFullName: string
    userNatId: string
    userPhoneNumber: string
    roleName: string
}
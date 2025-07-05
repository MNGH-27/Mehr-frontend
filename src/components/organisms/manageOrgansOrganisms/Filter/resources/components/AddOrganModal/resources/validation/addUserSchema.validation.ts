import * as Yup from 'yup'

const addUserSchema = Yup.object().shape({
    organName: Yup.string().required('نام سازمان الزامی است.'),
    fullAddress: Yup.string().required('آدرس کامل سازمان الزامی است.'),
    phoneNumber: Yup.string().required('تلفن الزامی است.'),
    code: Yup.string().required('کد‌ سازمان الزامی است.'),
    regionId: Yup.string().required('منطقه الزامی است.'),
    stateId: Yup.string().required('استان الزامی است.'),
    organLevel: Yup.string().required('سطح سازمان الزامی است.'),
    organTypeId: Yup.string().required('نوع سازمان الزامی است.')
})

export default addUserSchema

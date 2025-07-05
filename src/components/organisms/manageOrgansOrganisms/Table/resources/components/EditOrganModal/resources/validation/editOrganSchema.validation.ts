import * as Yup from 'yup'

const editOrganSchema = Yup.object().shape({
    code: Yup.string().required('کد‌ سازمان الزامی است.'),
    fullAddress: Yup.string().required('آدرس کامل سازمان الزامی است.'),
    organName: Yup.string().required('نام سازمان الزامی است.'),
    phoneNumber: Yup.string().required('تلفن الزامی است.')
})

export default editOrganSchema

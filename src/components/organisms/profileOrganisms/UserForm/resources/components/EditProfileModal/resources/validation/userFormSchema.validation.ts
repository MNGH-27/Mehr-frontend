import * as Yup from 'yup'

const userFormTypeSchema = Yup.object().shape({
    firstName: Yup.string().required('نام الزامی است.'),
    lastName: Yup.string().required('نام خانوادگی الزامی است.'),
    nationalCode: Yup.string().required('کد‌ملی الزامی است.'),
    phoneNumber: Yup.string().required('شماره همراه الزامی است.'),
    email: Yup.string().required('ایمیل الزامی است.'),
    company: Yup.string().required('نام شرکت الزامی است.'),
    role: Yup.string().required('نقش الزامی است.')
})

export default userFormTypeSchema

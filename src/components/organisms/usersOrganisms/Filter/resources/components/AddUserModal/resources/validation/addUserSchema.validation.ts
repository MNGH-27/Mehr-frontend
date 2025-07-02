import * as Yup from 'yup'

const addUserSchema = Yup.object().shape({
    firstName: Yup.string().required('نام الزامی است.'),
    lastName: Yup.string().required('نام خانوادگی الزامی است.'),
    phoneNumber: Yup.string().required('شماره همراه الزامی است.'),
    email: Yup.string()
        .required('ایمیل الزامی است.')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'مقدار ایمیل را به درستی وارد کنید'),
    companyId: Yup.string().required('نام شرکت الزامی است.'),
    nationalCode: Yup.string().required('کد‌ملی الزامی است.'),
    roleId: Yup.string().notRequired(),
    role: Yup.string().required('مقدار سمت در شرکت الزامی است.'),
    password: Yup.string().min(8, 'لطفاً رمزعبور را به درستی وارد کنید.').required('رمزعبور الزامی است.'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'رمزهای عبور مطابقت ندارند.')
        .required('تکرار رمزعبور الزامی است.')
})

export default addUserSchema

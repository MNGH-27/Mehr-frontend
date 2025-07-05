import * as Yup from 'yup'

const editUserSchema = Yup.object().shape({
    firstName: Yup.string().required('نام الزامی است.'),
    lastName: Yup.string().required('نام خانوادگی الزامی است.'),
    phoneNumber: Yup.string().required('شماره همراه الزامی است.'),
    natId: Yup.string().required('کد‌ملی الزامی است.'),
    birthDate: Yup.date().required('تاریخ تولد الزامی است.'),
    password: Yup.string().min(8, 'لطفاً رمزعبور را به درستی وارد کنید.'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'رمزهای عبور مطابقت ندارند.')
})

export default editUserSchema

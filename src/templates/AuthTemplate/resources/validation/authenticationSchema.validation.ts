import * as Yup from 'yup'

const authenticationSchema = Yup.object().shape({
    password: Yup.string().required('مقدار رمز الزامی است'),
    email: Yup.string()
        .required('مقدار ایمیل الزامی است')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'مقدار ایمیل را به درستی وارد کنید')
})

export default authenticationSchema

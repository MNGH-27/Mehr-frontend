import * as Yup from 'yup'

const authenticationSchema = Yup.object().shape({
    password: Yup.string().required('مقدار رمز الزامی است'),
    userName: Yup.string().required('مقدار نام کاربری الزامی است'),
    captchaValue: Yup.string().required('مقدار کدامنیتی الزامی است')
})

export default authenticationSchema

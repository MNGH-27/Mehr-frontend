import * as Yup from 'yup'

const changePasswordSchema = Yup.object().shape({
    password: Yup.string().required('رمز‌عبور الزامی است.'),
    repeatedPassword: Yup.string().required('تکرار رمز‌عبور الزامی است.')
})

export default changePasswordSchema

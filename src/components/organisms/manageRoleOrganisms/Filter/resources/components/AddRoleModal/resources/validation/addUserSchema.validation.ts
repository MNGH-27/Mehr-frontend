import * as Yup from 'yup'

const addUserSchema = Yup.object().shape({
    roleName: Yup.string().required('عنوان الزامی است.'),
    description: Yup.string().required('توضیح الزامی است.'),
    organTypes: Yup.array().min(1, 'حداقل یک نوع سازمان را انتخاب کنید').required('نوع سازمان الزامی است.')
})

export default addUserSchema

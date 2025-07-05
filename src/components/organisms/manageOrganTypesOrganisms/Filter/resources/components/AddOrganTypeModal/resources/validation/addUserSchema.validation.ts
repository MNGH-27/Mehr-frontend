import * as Yup from 'yup'

const addUserSchema = Yup.object().shape({
    Name: Yup.string().required('عنوان نوع سازمان الزامی است.')
})

export default addUserSchema

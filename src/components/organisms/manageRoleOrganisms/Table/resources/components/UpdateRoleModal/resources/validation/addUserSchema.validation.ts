import * as Yup from 'yup'

const addUserSchema = Yup.object().shape({
    roleName: Yup.string().required('عنوان الزامی است.')
})

export default addUserSchema

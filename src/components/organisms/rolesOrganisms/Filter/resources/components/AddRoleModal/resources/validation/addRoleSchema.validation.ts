import * as Yup from 'yup'

const addRoleSchema = Yup.object().shape({
    persianName: Yup.string().required('نام فارسی الزامی است.')
})

export default addRoleSchema

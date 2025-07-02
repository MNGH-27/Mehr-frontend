import * as Yup from 'yup'

const editRoleSchema = Yup.object().shape({
    persianName: Yup.string().required('نام فارسی الزامی است.')
})

export default editRoleSchema

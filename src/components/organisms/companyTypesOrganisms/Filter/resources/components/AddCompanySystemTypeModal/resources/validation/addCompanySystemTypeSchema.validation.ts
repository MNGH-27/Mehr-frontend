import * as Yup from 'yup'

const addCompanySystemTypeSchema = Yup.object().shape({
    name: Yup.string().required('نام فارسی الزامی است.')
})

export default addCompanySystemTypeSchema

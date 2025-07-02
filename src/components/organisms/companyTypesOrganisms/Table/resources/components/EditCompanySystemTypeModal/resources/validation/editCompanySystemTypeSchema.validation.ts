import * as Yup from 'yup'

const editCompanySystemTypeSchema = Yup.object().shape({
    name: Yup.string().required('نام فارسی الزامی است.')
})

export default editCompanySystemTypeSchema

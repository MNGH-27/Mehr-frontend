import * as Yup from 'yup'

const setOrganFormSchema = Yup.object().shape({
    userRole: Yup.string().required('انتخاب نقش الزامی است')
})

export default setOrganFormSchema

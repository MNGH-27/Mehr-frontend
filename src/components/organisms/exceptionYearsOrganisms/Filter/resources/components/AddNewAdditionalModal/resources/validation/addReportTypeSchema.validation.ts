import * as Yup from 'yup'

const addNewAdditionalModalSchema = Yup.object().shape({
    exceptionYear: Yup.string().required('سال استثنا جدید الزامی است.')
})

export default addNewAdditionalModalSchema

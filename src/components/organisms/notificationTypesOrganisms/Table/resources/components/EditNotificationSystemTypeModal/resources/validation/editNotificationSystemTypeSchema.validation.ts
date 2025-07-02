import * as Yup from 'yup'

const editNotificationSystemTypeSchema = Yup.object().shape({
    name: Yup.string().required('نام فارسی الزامی است.')
})

export default editNotificationSystemTypeSchema

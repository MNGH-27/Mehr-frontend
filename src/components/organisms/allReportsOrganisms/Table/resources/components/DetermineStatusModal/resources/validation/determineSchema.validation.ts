import * as Yup from 'yup'

const determineSchema = Yup.object().shape({
    status: Yup.string().required('وضعیت الزامی است.'),
    message: Yup.string().required('توضیح الزامی است.'),
    title: Yup.string().required('عنوان الزامی است.')
})

export default determineSchema

import * as Yup from 'yup'

const determineSchema = Yup.object().shape({
    status: Yup.string().required('وضعیت الزامی است.'),
    message: Yup.string().when('status', {
        is: '2',
        then: () => Yup.string().required('توضیح الزامی است.'),
        otherwise: () => Yup.string()
    }),

    exteraTime: Yup.date()
})

export default determineSchema

import * as Yup from 'yup'

const addReportTypeSchema = Yup.object().shape({
    sendTime: Yup.string().required('عنوان الزامی است.'),
    file: Yup.mixed().required('یک نمونه قالب برای شرکت ها الزامی است.')
})

export default addReportTypeSchema

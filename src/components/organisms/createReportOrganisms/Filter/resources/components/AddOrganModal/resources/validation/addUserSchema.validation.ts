import * as Yup from 'yup'

const addUserSchema = Yup.object().shape({
    title: Yup.string().required('عنوان گزارش الزامی است.'),
    description: Yup.string().required('توضیح گزارش الزامی است.'),
    reportItemType: Yup.string().required('نوع گزارش الزامی است.'),
    reportChart: Yup.string().required('نوع نمودار الزامی است.')
})

export default addUserSchema

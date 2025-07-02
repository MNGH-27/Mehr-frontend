import * as Yup from 'yup'

const addNotificationSchema = Yup.object().shape({
    title: Yup.string().required('عنوان اعلان الزامی است.'),
    systemTypeId: Yup.string().required('دسته‌بندی اعلان الزامی است.'),
    newsType: Yup.string().required('وضعیت اعلان الزامی است.'),
    subTitle: Yup.string().required('توضیح اعلان الزامی است.'),
    description: Yup.string(),
    documentId: Yup.string().nullable()
})

export default addNotificationSchema

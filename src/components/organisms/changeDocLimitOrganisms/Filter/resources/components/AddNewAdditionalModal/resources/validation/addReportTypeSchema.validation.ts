import * as Yup from 'yup'

const addNewAdditionalModalSchema = Yup.object().shape({
    companyId: Yup.string().required('نام شرکت الزامی است.'),
    systemTypeId: Yup.string().required('نوع سند الزامی است.'),
    dayLimit: Yup.string().required('مهلت ارسال الزامی است.')
})

export default addNewAdditionalModalSchema

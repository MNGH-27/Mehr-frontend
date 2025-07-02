import * as Yup from 'yup'

const addCompanySchema = Yup.object().shape({
    companyName: Yup.string().required('نام شرکت الزامی است.'),
    systemTypeId: Yup.string().required('نوع شرکت الزامی است.'),
    fiscalYear: Yup.date().required('شروع سال مالی الزامی است.'),
    isForeigner: Yup.boolean().required('خارجی/داخلی الزامی است.')
})

export default addCompanySchema

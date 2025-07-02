import * as Yup from 'yup'

const editReportSchema = Yup.object().shape({
    title: Yup.string().required('عنوان الزامی است.'),
    reportType: Yup.string().required('نوع الزامی است.'),
    documentFormatId: Yup.string(),
    dayLimit: Yup.string().required('محدودیت زمانی (روز) الزامی است.'),
    timePeriod: Yup.string().required('دوره زمانی الزامی است.'),
    companyTypeId: Yup.array().test('at-least-one', 'حداقل یکی از نوع شرکت یا شرکت باید انتخاب شود.', function (value) {
        const { companyId } = this.parent // Access other sibling values in the object
        return (Array.isArray(value) && value.length > 0) || !!companyId
    }),
    companyId: Yup.string()
        .nullable()
        .test('at-least-one', 'حداقل یکی از نوع شرکت یا شرکت باید انتخاب شود.', function (value) {
            const { companyTypeId } = this.parent // Access other sibling values in the object
            return (value && value.trim() !== '') || (Array.isArray(companyTypeId) && companyTypeId.length > 0)
        }),
    documentId: Yup.mixed()
})
export default editReportSchema

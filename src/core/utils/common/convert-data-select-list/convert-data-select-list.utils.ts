import { type TCriticalAny } from '@core/types/type-any'

const convertDataSelectList = (data?: { [key: string]: TCriticalAny }[]) => {
    //check if there is data and also is array
    if (data && Array.isArray(data)) {
        return data.map((item) => ({
            value: item.value
                ? item.value.toString()
                : item.companyId
                  ? item.companyId.toString()
                  : item.reportId
                    ? item.reportId.toString()
                    : item?.id?.toString(),
            label: item.name || item.title || item.format || item.companyName || item.reportName
        }))
    }

    //there is no data
    return []
}
export default convertDataSelectList

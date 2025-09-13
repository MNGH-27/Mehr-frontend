export type TReportItemType = {
    title: string
    description: string
    id: number
    reportChart: number
    type: number
    typeTitle: string
}
export type TReportOfProvinceItemType = {
    stateId: number
    stateName: string
    reportItemId: number
    reportItemName: string
    sum: number
}

export type TReportDataItemType = {
    userId: number
    id: number
    userFullName: string
    reportItemId: number
    reportItemTitle: string
    answerValue: number
    answerStr: null | string
    stateId: number
    stateName: string
    regionId: number
    regionName: string
    organId: number
    organName: string
}

export type TReportChartItemType = {
    reportItemId: number
    stateId: number | null
    stateName: string | null
    regionId: number | null
    regionName: string | null
    title: string
    sumTotal: number
    date: string
    dateNum: number | null
}

export type TReportTableItemType = {
    reportType: number
    reportTypeTitle: string
    reportDataTables: {
        reportItemId: number
        reportItemName: string
        organId: number | null
        organName: string | null
        regionId: number | null
        regionName: string | null
        stateId: number | null
        stateName: string | null
        answerValue: number
        answerStr: number | null
    }[]
}

export type TShakhesColorItemType = {
    id: number
    frontId: number
    name: string
    shakesValue: number
    subs: {
        id: number
        frontId: number
        name: string
        shakesValue: number
    }[]
}

export type TShakhesReportItemType = {
    shakhesColor: TShakhesColorItemType[]
    signAndClassification: {
        classQuantityTitle: string
        regionDensityTitle: string
        signedUpQuantityTitle: string
        classQuantity: {
            [key: string]: number
        }
        regionDensity: {
            [key: string]: number
        }
        signedUpQuantity: {
            [key: string]: number
        }
    }
    staffReports: {
        militaryEntrancesTitle: string
        ar28EntrancesTitle: string
        transferredEmployeesEntrancesTitle: string
        convertedStatusEmployeesTitle: string
        farhangianEntrancesTitle: string
        currentEmployeesQuantityTitle: string
        retiredEmployeesQuantityTitle: string
        maternityLeaveQuantityTitle: string
        educationalLeaveQuantityTitle: string
        transferredEmployeesExitTitle: string
        organEmployeesQuantityTitle: string
        militaryEntrances: number
        ar28Entrances: number
        transferredEmployeesEntrances: number
        convertedStatusEmployees: number
        farhangianEntrances: number
        currentEmployeesQuantity: number
        retiredEmployeesQuantity: number
        maternityLeaveQuantity: number
        educationalLeaveQuantity: number
        transferredEmployeesExit: number
        organEmployeesQuantity: number
    }
    staffTrainingReport: {
        coursesNumberTitle: string
        coursesHoursNumberTitle: string
        coursesSignedUpTitle: string
        coursesWatchedHoursTitle: string
        coursesNumber: number
        coursesHoursNumber: number
        coursesSignedUp: number
        coursesWatchedHours: number
    }
    educationStatusReport: {
        numberOfSchoolsTitle: string
        sportSpacesTitle: string
        sportSpacesAreaTitle: string
        workshopsNumberTitle: string
        labsNumberTitle: string
        numberOfSchools: {
            [key: string]: number
        }
        sportSpaces: number
        sportSpacesArea: number
        workshopsNumber: number
        labsNumber: number
    }
    bookReport: {
        givenBooksQuantityTitle: string
        givenBooksQuantity: {
            [key: string]: number
        }
    }
}
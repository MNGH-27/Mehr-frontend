import {
    CooperateCompanies,
    DashboardNotification,
    SentReportStatus,
    TotalReportStatus
} from '@organisms/dashboardOrganisms'

import { SMainContainer } from '@molecules/SMainContainer'

const DashboardTemplate = () => {
    return (
        <div className='flex flex-col w-full gap-y-5'>
            <div className='grid grid-cols-12 w-full gap-6'>
                <SMainContainer className='col-span-full xl:col-span-7' title='شرکت های همراه'>
                    <CooperateCompanies />
                </SMainContainer>

                <div className='col-span-full xl:col-span-5 flex flex-col gap-y-5 w-full'>
                    <SMainContainer title='اعلانات'>
                        <DashboardNotification />
                    </SMainContainer>
                    <SMainContainer title='وضعیت گزارشات ارسالی'>
                        <SentReportStatus />
                    </SMainContainer>
                </div>
            </div>

            <SMainContainer className='col-span-7' title='وضعیت گزارشات'>
                <TotalReportStatus />
            </SMainContainer>
        </div>
    )
}

export default DashboardTemplate

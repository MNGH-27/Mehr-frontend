const Routes = {
    Login: () => '/',

    Panel: () => '/panel',

    Users: () => Routes.Panel() + '/users',

    ManageOrgans: () => Routes.Panel() + '/manage-organs',
    ManageOrgansRole: (organId: string | number) => Routes.ManageOrgans() + `/${organId}/roles`,

    ManageOrganTypes: () => Routes.Panel() + '/manage-organ-types',

    ManageRoleTypes: () => Routes.Panel() + '/manage-role',

    CreateReport: () => Routes.Panel() + '/create-report',

    FillReport: () => Routes.Panel() + '/fill-report',
    FillReportForm: (reportId: string | number) => Routes.FillReport() + `/${reportId}/form`
}

export default Routes

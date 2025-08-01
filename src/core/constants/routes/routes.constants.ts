const Routes = {
    Login: () => '/',

    Panel: () => '/panel',

    Profile: () => Routes.Panel() + '/profile',

    Users: () => Routes.Panel() + '/users',

    ManageOrgans: () => Routes.Panel() + '/manage-organs',
    ManageOrgansRole: (organId: string | number) => Routes.ManageOrgans() + `/${organId}/roles`,

    ManageOrganTypes: () => Routes.Panel() + '/manage-organ-types',

    ManageRoleTypes: () => Routes.Panel() + '/manage-role',

    CreateReport: () => Routes.Panel() + '/create-report',
    CreateReportDetail: (reportId: string | number) => Routes.CreateReport() + `/${reportId}`,

    FillReport: () => Routes.Panel() + '/fill-report'
}

export default Routes

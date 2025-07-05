const Routes = {
    Login: () => '/',

    Panel: () => '/panel',

    Users: () => Routes.Panel() + '/users',

    ManageOrgans: () => Routes.Panel() + '/manage-organs'
}

export default Routes

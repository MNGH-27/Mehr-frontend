const Routes = {
    Login: () => '/',

    Panel: () => '/panel',

    Users: () => Routes.Panel() + '/users'
}

export default Routes

const BUTTON_VARIANTS = {
    // Primary color
    FilledPrimary:
        'duration-300 shadow-none border border-transparent text-white bg-primary-tinted-900 hover:bg-primary-shade-100 active:bg-primary-shade-100 disabled:!bg-secondary-100 disabled:!text-gray-200',
    TintPrimary:
        'duration-300 border border-transparent text-gray-800 bg-transparent hover:bg-gray-100 hover:text-primary-tinted-900 disabled:!bg-secondary-100 disabled:!text-gray-200',
    OutlinePrimary:
        'duration-300 shadow-none border border-primary-tinted-900 text-primary-tinted-900 bg-transparent disabled:!bg-secondary-100 disabled:!text-gray-200',
    TextPrimary: 'text-primary-tinted-900 bg-transparent disabled:!text-gray-200',

    //Gray color
    OutlineGray:
        'duration-300 shadow-none border border-gray-700 text-gray-700 bg-transparent disabled:!bg-secondary-100 disabled:!text-gray-200',
    FilledGray:
        'duration-300 shadow-none border border-transparent text-white bg-gray-700 hover:bg-gray-800 active:bg-gray-800 disabled:!bg-secondary-100 disabled:!text-gray-200',
    TextGray: 'text-gray-900 bg-transparent disabled:!text-gray-200',

    //Secondary color
    OutlineSecondary:
        'duration-300 shadow-none border border-secondary-800 text-secondary-800 bg-transparent disabled:!bg-secondary-100 disabled:!text-secondary-200',
    FilledSecondary:
        'duration-300 shadow-none border border-transparent text-white bg-secondary-800 hover:bg-secondary-900 active:bg-secondary-900 disabled:!bg-secondary-100 disabled:!text-secondary-200',
    TextSecondary: 'text-secondary-700 bg-transparent disabled:!text-secondary-200',

    //error color
    OutlineError:
        'duration-300 shadow-none border border-error-light text-error-light bg-transparent disabled:!bg-secondary-100 disabled:!text-gray-200',
    FilledError:
        'duration-300 shadow-none border border-transparent text-white bg-error-light hover:bg-error active:bg-error disabled:!bg-secondary-100 disabled:!text-gray-200',
    TextError: 'text-error bg-transparent disabled:!text-gray-200',

    //success color
    OutlineSuccess:
        'duration-300 shadow-none border border-success-light text-success-light bg-transparent disabled:!bg-secondary-100 disabled:!text-gray-200',
    FilledSuccess:
        'duration-300 shadow-none border border-transparent text-white bg-success-light hover:bg-success active:bg-success disabled:!bg-secondary-100 disabled:!text-gray-200',
    TextSuccess: 'text-success bg-transparent disabled:!text-gray-200',

    //warning color
    OutlineWarning:
        'duration-300 shadow-none border border-warning-light text-warning-light bg-transparent disabled:!bg-secondary-100 disabled:!text-gray-200',
    FilledWarning:
        'duration-300 shadow-none border border-transparent text-white bg-warning-light hover:bg-warning active:bg-warning disabled:!bg-secondary-100 disabled:!text-gray-200',
    TextWarning: 'text-warning bg-transparent disabled:!text-gray-200',

    // none
    None: 'p-0 sm:p-0 md:p-0 lg:p-0 xl:p-0 2xl:p-0'
}

export default BUTTON_VARIANTS

import React from 'react'

const STitleDivider = ({ className = '', title = '' }) => {
    return (
        <div
            className={`mb-5 flex items-center justify-start gap-x-[14px] after:block after:h-[1px] after:bg-secondary-600 after:grow font-semibold text-secondary-600 w-full ${className}`}
        >
            {title}
        </div>
    )
}

export default STitleDivider

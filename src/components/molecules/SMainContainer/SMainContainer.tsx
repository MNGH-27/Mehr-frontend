import { type FC } from 'react'

import { type IMainContainerProps } from './resources'

const SMainContainer: FC<IMainContainerProps> = ({ title, children, className = '' }) => {
    return (
        <div
            style={{
                boxShadow: '0px 0px 12px 0px #0000001A'
            }}
            className={`p-4 sm:p-5 md:p-6 xl:p-7 rounded-xl md:rounded-2xl space-y-3 md:space-y-5 ${className}`}
        >
            {title && (
                <div
                    className={`flex items-center justify-center gap-x-[10px] text-sm md:text-base after:block after:grow after:h-[1px] after:bg-secondary-600 text-secondary-600 font-semibold`}
                >
                    {title}
                </div>
            )}

            {children}
        </div>
    )
}

export default SMainContainer

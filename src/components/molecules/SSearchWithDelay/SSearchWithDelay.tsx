import React, { type FC } from 'react'
import { Search } from 'lucide-react'

import { type ISSearchWithDelayProps } from './resources'

const SSearchWithDelay: FC<ISSearchWithDelayProps> = ({
    placeholder = 'جستجو کنید...',
    value,
    onChange,
    onDelayChange,
    className = '',
    ...rest
}) => {
    //timeout timer for request filter in delay
    let typingTimer: ReturnType<typeof setTimeout>

    //set filter for filter name after 500 milliseconds
    const onChangeFilter = () => {
        if (value && String(value).length > 0) {
            onDelayChange(String(value))
        } else {
            onDelayChange(null)
        }
    }

    return (
        <div className='flex items-center justify-center gap-x-2 bg-secondary-200 py-[10px] px-8 rounded-[10px] grow w-full'>
            <Search color='#ADADAD' size={20} />
            <input
                onKeyUp={() => {
                    clearTimeout(typingTimer)
                    typingTimer = setTimeout(onChangeFilter, 500)
                }}
                onKeyDown={() => {
                    clearTimeout(typingTimer)
                }}
                className={`outline-none bg-transparent text-sm grow ${className}`}
                value={value}
                onChange={(value) => onChange && onChange(value)}
                placeholder={placeholder}
                {...rest}
            />
        </div>
    )
}

export default SSearchWithDelay

import { forwardRef } from 'react'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import DatePicker from 'react-multi-date-picker'
import { Calendar, X } from 'lucide-react'

import { type ISDatePickerProps } from './resources'

const SDatePicker = forwardRef<HTMLInputElement, ISDatePickerProps>(
    ({ className, onChange, value, leftSection, disabled, ...rest }, ref) => {
        return (
            <div ref={ref} className={`relative w-full ${disabled ? '!cursor-not-allowed' : 'cursor-pointer'}`}>
                {!disabled && value && (
                    <X
                        onClick={() => onChange(undefined)}
                        style={{ display: value ? undefined : 'none' }}
                        size='18'
                        color='gray'
                        className='pointer-events-auto cursor-pointer absolute left-2 top-3.5'
                    />
                )}
                <DatePicker
                    inputClass={
                        `!border !border-gray-200 !rounded-lg pr-9 !py-2 md:!py-3 !h-auto placeholder:!text-secondary-700 placeholder:!text-base !text-base focus:!border-primary-tinted-700 hover:!border-primary !w-full ${disabled ? '!text-gray-600 hover:!border-blue-tint-600' : 'focus:border-blue-tint-700 focus:outline-none hover:border-primary cursor-pointer'}` +
                        className
                    }
                    containerClassName='w-full'
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition='bottom-right'
                    portal
                    onChange={(e) => {
                        if (e) onChange(new Date(e.toDate()))
                    }}
                    editable={false}
                    value={value}
                    disabled={disabled}
                    {...rest}
                />
                <div className='pointer-events-none absolute text-sm font-medium flex items-center gap-2 top-3.5 right-3 text-gray-600/70 '>
                    {leftSection ?? <Calendar size={20} />}
                </div>
            </div>
        )
    }
)

SDatePicker.displayName = 'SDatePicker'

export default SDatePicker

import { forwardRef, useEffect } from 'react'
import { Switch } from '@mantine/core'

import { type ISSwitchProps } from './resources'

const DEFAULT_THUMB_COLOR = { on: '#00BA88', off: '#ED2E2E', disabled: '#E1E1E1' }
const DEFAULT_TRACK_COLOR = { on: '#F3FDFA', off: '#FFF2F2', disabled: '#F9F9F9' }

const SSwitch = forwardRef<HTMLInputElement, ISSwitchProps>(
    (
        {
            trackColor = DEFAULT_TRACK_COLOR,
            thumbColor = DEFAULT_THUMB_COLOR,
            onLabel = 'بله',
            offLabel = 'خیر',
            onChange,
            disabled,
            value = false,
            ...rest
        },
        ref
    ) => {
        useEffect(() => {
            if (value === '1') {
                onChange(true)
            } else if (value === '2') {
                onChange(false)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [value])

        return (
            <div className='flex items-center gap-2'>
                <span>{offLabel}</span>
                <Switch
                    ref={ref}
                    onChange={(event) => onChange(Boolean(event.currentTarget.checked))}
                    styles={{
                        track: {
                            backgroundColor: disabled
                                ? trackColor.disabled
                                : value === true || value === '1'
                                  ? trackColor.on
                                  : trackColor.off,
                            borderColor: disabled
                                ? trackColor.disabled
                                : value === true || value === '1'
                                  ? trackColor.on
                                  : trackColor.off,
                            cursor: 'pointer'
                        },
                        thumb: {
                            backgroundColor: disabled
                                ? thumbColor.disabled
                                : value === true || value === '1'
                                  ? thumbColor.on
                                  : thumbColor.off
                        }
                    }}
                    // value={value === '1' ? true : value === '2' ? false : value}
                    checked={value === '1' ? true : value === '2' ? false : !!value}
                    disabled={disabled}
                    {...rest}
                />
                <span>{onLabel}</span>
            </div>
        )
    }
)

SSwitch.displayName = 'SSwitch'

export default SSwitch

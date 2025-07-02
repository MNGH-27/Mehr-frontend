'use client'

import { useState } from 'react'
import { JsonParam, useQueryParam } from 'use-query-params'

import { SSearchWithDelay } from '@molecules/SSearchWithDelay'

import { type TCriticalAny } from '@core/types/type-any'

const MyCompaniesFilter = () => {
    const [filter, setQuery] = useQueryParam('filter', JsonParam)

    const [filterSchema, setFilterSchema] = useState({ ...filter })

    return (
        <div className='flex flex-col lg:flex-row items-start justify-center gap-x-10 gap-y-3'>
            <SSearchWithDelay
                onChange={(value) => setFilterSchema((prevState: TCriticalAny) => ({ ...prevState, Name: value }))}
                onDelayChange={(value) => {
                    setQuery({
                        ...filter,
                        PageNumber: 1,
                        Name: value
                    })
                }}
                value={filterSchema.Name ?? ''}
                placeholder='وارد کنید'
            />
        </div>
    )
}

export default MyCompaniesFilter

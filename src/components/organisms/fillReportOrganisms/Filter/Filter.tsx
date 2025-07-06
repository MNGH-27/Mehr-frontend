'use client'

import { useState } from 'react'
import { NumberParam, StringParam, useQueryParams } from 'use-query-params'

import { SSearchWithDelay } from '@molecules/SSearchWithDelay'

const FillReportFilter = () => {
    const [query, setQuery] = useQueryParams({ name: StringParam, page: NumberParam })
    const [Search, setSearch] = useState(query.name ?? '')

    const onChangeFilter = (value: string | null) => {
        setQuery({ name: value, page: 1 })
    }

    return (
        <div className='flex flex-col lg:flex-row items-start justify-center gap-x-10 gap-y-3'>
            <SSearchWithDelay
                value={Search}
                onChange={(e) => setSearch(e.target.value)}
                onDelayChange={onChangeFilter}
            />
        </div>
    )
}

export default FillReportFilter

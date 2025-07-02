import { type TableProps } from '@mantine/core'

interface ISTableProps extends TableProps {
    TABLE_HEAD: { title: string; icon?: React.ReactNode }[]
}

export type { ISTableProps }

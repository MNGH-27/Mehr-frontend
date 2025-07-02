import { type BreadcrumbsProps } from '@mantine/core'

interface ISBreadCrumbsProps extends Omit<BreadcrumbsProps, 'children'> {
    items: {
        href: string
        title: string
    }[]
}

export type { ISBreadCrumbsProps }

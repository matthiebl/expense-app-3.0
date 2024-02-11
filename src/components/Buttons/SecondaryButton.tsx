'use client'

import Link from 'next/link'
import { MouseEventHandler, ReactNode } from 'react'

type Props = {
    // props
    link?: boolean
    href?: string

    // events
    onClick?: MouseEventHandler<HTMLButtonElement>

    // slots
    children: ReactNode
}

export function SecondaryButton({ link = false, href, onClick, children }: Props) {
    if (link && !href) {
        console.error('[SecondaryButton] link button with no href (defaulting to root)')
    }

    const className =
        'inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'

    if (link) {
        return (
            <Link href={href ?? '/'} className={className}>
                Spend Categories
            </Link>
        )
    }
    return (
        <button type='button' onClick={onClick ?? (() => {})} className={className}>
            {children}
        </button>
    )
}

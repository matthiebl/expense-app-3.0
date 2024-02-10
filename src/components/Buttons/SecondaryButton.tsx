'use client'

import { MouseEventHandler, ReactNode } from 'react'

type Props = {
    children: ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export function SecondaryButton({ children, onClick }: Props) {
    return (
        <button
            type='button'
            onClick={onClick || (() => {})}
            className='inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
            {children}
        </button>
    )
}

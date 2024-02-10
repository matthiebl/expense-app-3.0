'use client'

import { MouseEventHandler, ReactNode } from 'react'

type Props = {
    children: ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export function PrimaryButton({ children, onClick }: Props) {
    return (
        <button
            type='button'
            onClick={onClick || (() => {})}
            className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
            {children}
        </button>
    )
}

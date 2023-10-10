'use client'

import { ReactNode } from 'react'
import toast, { Toast } from 'react-hot-toast'

export function ToastWrapper({ t, children }: { t: Toast; children: ReactNode }) {
    return (
        <div
            className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
            } pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
        >
            <div className='p-4'>{children}</div>
        </div>
    )
}

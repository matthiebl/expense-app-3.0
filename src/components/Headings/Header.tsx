import { ReactNode } from 'react'

export function Header({ title, action }: { title: string; action?: ReactNode }) {
    return (
        <div className='md:flex md:items-center md:justify-between'>
            <div className='min-w-0 flex-1'>
                <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
                    {title}
                </h2>
            </div>
            {action && <div className='mt-4 flex md:ml-4 md:mt-0'>{action}</div>}
        </div>
    )
}

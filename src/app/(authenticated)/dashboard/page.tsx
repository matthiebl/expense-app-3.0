'use client'

import { toastError } from '@/components/Toasts'

export default function Dashboard() {
    return (
        <div className='bg-white'>
            <b>Hello</b>
            <button onClick={() => toastError('Test toast!')}>Toast!</button>
        </div>
    )
}

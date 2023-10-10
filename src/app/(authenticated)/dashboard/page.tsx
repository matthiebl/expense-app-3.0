'use client'

import { toast } from 'react-hot-toast'
import { toastError } from '@/components/Toasts'
// import { ToastError } from '@/components/Toasts/ToastError'

export default function Dashboard() {
    return (
        <>
            <b>Hello</b>
            <button onClick={() => toastError('Test toast!')}>Toast!</button>
        </>
    )
}

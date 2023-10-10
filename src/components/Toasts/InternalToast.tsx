import toast, { Toast, ToastType } from 'react-hot-toast'
import { ToastWrapper } from './Wrapper'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'

export type InternalToastType = 'success' | 'error'

export function InternalToast({
    t,
    type,
    message,
    detail,
}: {
    t: Toast
    type: InternalToastType
    message: string
    detail?: string
}) {
    let Icon = <ExclamationCircleIcon className='h-6 w-6 text-red-500' aria-hidden='true' />
    if (type === 'success') {
        Icon = <CheckCircleIcon className='h-6 w-6 text-green-400' aria-hidden='true' />
    }

    return (
        <ToastWrapper t={t}>
            <div className='flex items-start'>
                <div className='flex-shrink-0'>{Icon}</div>
                <div className='ml-3 w-0 flex-1 pt-0.5'>
                    <p className='text-sm font-medium text-gray-900'>{message}</p>
                    {detail && <p className='mt-1 text-sm text-gray-500'>{detail}</p>}
                </div>
                <div className='ml-4 flex flex-shrink-0'>
                    <button
                        type='button'
                        className='inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        onClick={() => toast.dismiss(t.id)}
                    >
                        <span className='sr-only'>Close</span>
                        <XMarkIcon className='h-5 w-5' aria-hidden='true' />
                    </button>
                </div>
            </div>
        </ToastWrapper>
    )
}

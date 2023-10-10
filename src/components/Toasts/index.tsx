import toast from 'react-hot-toast'
import { ToastError } from './ToastError'
import { ToastSuccess } from './ToastSuccess'

export function toastError(message: string, detail?: string) {
    toast.custom(t => <ToastError t={t} message={message} detail={detail} />)
}

export function toastSuccess(message: string, detail?: string) {
    toast.custom(t => <ToastSuccess t={t} message={message} detail={detail} />)
}

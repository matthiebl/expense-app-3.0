import { Toast } from 'react-hot-toast'
import { InternalToast } from './InternalToast'

export function ToastSuccess({
    t,
    message,
    detail,
}: {
    t: Toast
    message: string
    detail?: string
}) {
    return <InternalToast t={t} type='success' message={message} detail={detail} />
}

import { Toast } from 'react-hot-toast'
import { InternalToast } from './InternalToast'

export function ToastError({ t, message, detail }: { t: Toast; message: string; detail?: string }) {
    return <InternalToast t={t} type='error' message={message} detail={detail} />
}

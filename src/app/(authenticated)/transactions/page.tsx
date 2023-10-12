import { TransactionsHeader } from '@/components/Headings/Transactions'
import { Transactions } from '@/components/Tables/Transactions'

export default function TransactionsPage() {
    return (
        <>
            <TransactionsHeader />
            <Transactions />
        </>
    )
}

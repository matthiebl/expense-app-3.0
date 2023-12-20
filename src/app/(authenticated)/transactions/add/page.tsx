import { Header } from '@/components/Headings'
import { AddTransaction } from '@/components/AddTransactionPage'
import { DataRules } from '@/components/DataRules'

export default function NewDataPage() {
    return (
        <>
            <Header title='Add Transactions' />
            <AddTransaction />
            <DataRules />
        </>
    )
}

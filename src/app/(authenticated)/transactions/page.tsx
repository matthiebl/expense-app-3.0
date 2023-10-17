import Link from 'next/link'
import { Header } from '@/components/Headings'
import { Transactions } from '@/components/Tables/Transactions'

export default function TransactionsPage() {
    return (
        <>
            <Header
                title='Transactions'
                action={
                    <Link
                        href='/transactions/add'
                        type='button'
                        className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                        Add
                    </Link>
                }
            />
            <Transactions />
        </>
    )
}

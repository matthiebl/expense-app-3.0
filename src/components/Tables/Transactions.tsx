'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Transaction, db } from '@/lib/firebase/database'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase/auth'

const formatAmount = (value: number): string => {
    if (value < 0) {
        return '-$' + Math.abs(value)
    }
    return '$' + value
}

export function Transactions() {
    const [transactions, setTransactions] = useState<(Transaction & { kind: string })[]>([])

    useEffect(() => {
        const fetchData = async (uid: string) => {
            db.categories(uid, categories => {
                const findCategories: Record<string, { kind: string; category: string }> = {}
                categories.forEach(({ id, kind, category }) => {
                    findCategories[id] = { kind, category }
                })
                db.transactions(uid, data => {
                    const transactions = data.map(transaction => ({
                        ...transaction,
                        kind: findCategories[transaction.category].kind,
                        category: findCategories[transaction.category].category,
                    }))
                    // const sort = query.get('sort')
                    // const reversed = query.get('reversed')
                    // if (sort === 'category' || sort === 'type') {
                    //     data = sortCategories(data, sort)
                    // }
                    // if (reversed === 'true') {
                    //     data.reverse()
                    // }
                    setTransactions(transactions)
                })
            })
        }
        onAuthStateChanged(auth.fb, user => {
            if (user) {
                fetchData(user.uid)
            }
        })
    }, [])

    return (
        <div className='-mx-4 -my-2 mt-8 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle'>
                <table className='min-w-full divide-y divide-gray-300'>
                    <thead>
                        <tr>
                            <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8'
                            >
                                Title
                            </th>
                            <th
                                scope='col'
                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                            >
                                Type
                            </th>
                            <th
                                scope='col'
                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                            >
                                Category
                            </th>
                            <th
                                scope='col'
                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                            >
                                Amount
                            </th>
                            <th
                                scope='col'
                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                            >
                                Group
                            </th>
                            <th
                                scope='col'
                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                            >
                                Date
                            </th>
                            <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8'>
                                <span className='sr-only'>Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 bg-white'>
                        {transactions.map(t => (
                            <tr key={t.id}>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'>
                                    <span className='group relative hover:cursor-help'>
                                        {t.title}
                                        <span className='fixed hidden -translate-y-0.5 translate-x-3 rounded-md bg-white px-2 py-1 text-xs font-light text-gray-600 outline outline-1 outline-gray-200 group-hover:inline-block'>
                                            {t.description}
                                        </span>
                                    </span>
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                    <span
                                        className={`${
                                            t.kind === 'Income'
                                                ? 'bg-green-50 text-green-800 ring-green-600/20'
                                                : 'bg-red-50 text-red-800 ring-red-600/20'
                                        }
                                                                 mr-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset`}
                                    >
                                        {t.kind}
                                    </span>
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                    {t.category}
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                    {formatAmount(t.amount)}
                                </td>
                                <td
                                    data-no-group={t.group === ''}
                                    className='whitespace-nowrap px-3 py-4 text-sm text-gray-500 data-[no-group=true]:text-gray-400'
                                >
                                    {t.group || 'No group'}
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                    {t.date}
                                </td>
                                <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8'>
                                    <Link
                                        href={`/transactions/${t.id}`}
                                        className='text-indigo-600 hover:text-indigo-900'
                                    >
                                        Edit<span className='sr-only'>, {t.title}</span>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

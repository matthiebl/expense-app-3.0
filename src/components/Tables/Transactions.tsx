'use client'

import { Database } from '@/lib/supabase/database'
import Link from 'next/link'

const ts = [
    {
        id: 'abc',
        title: 'Payment',
        type: 'Income',
        category: 'Salary',
        amount: 100.54,
        group: '',
        date: '01/04/2023',
    },
]

export function Transactions() {
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
                        {ts.map(t => (
                            <tr key={t.id}>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'>
                                    {t.title}
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                    {t.type}
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                    {t.category}
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                    {t.amount}
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

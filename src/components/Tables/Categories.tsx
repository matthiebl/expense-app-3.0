'use client'

import Link from 'next/link'

const ts = [
    {
        id: 'abc',
        category: 'Salary',
        type: 'Income',
    },
]

export function Categories() {
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
                                Category
                            </th>
                            <th
                                scope='col'
                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                            >
                                Type
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
                                    {t.category}
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                    {t.type}
                                </td>
                                <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8'>
                                    <button className='text-indigo-600 hover:text-indigo-900'>
                                        Edit<span className='sr-only'>, {t.category}</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { Category, db } from '@/lib/firebase/database'
import { auth } from '@/lib/firebase/auth'
import { PlusIcon } from '@heroicons/react/24/outline'
import { DefaultCategoriesModal } from '../Modals/DefaultCategories'

export function Categories() {
    const [categories, setCategories] = useState<Category[]>([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const fetchData = async (uid: string) => {
            const data = await db.categories(uid)
            setCategories(data)
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
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'>
                                    {category.category}
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                    {category.kind}
                                </td>
                                <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8'>
                                    <button className='text-indigo-600 hover:text-indigo-900'>
                                        Edit<span className='sr-only'>, {category.category}</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && (
                            <tr>
                                <td></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {categories.length === 0 && (
                    <div className='py-6 text-center'>
                        <svg
                            className='mx-auto h-12 w-12 text-gray-400'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            aria-hidden='true'
                        >
                            <path
                                vectorEffect='non-scaling-stroke'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z'
                            />
                        </svg>
                        <h3 className='mt-2 text-sm font-semibold text-gray-900'>No categories</h3>
                        <p className='mt-1 text-sm text-gray-500'>
                            Add your own above, or get started with our defaults.
                        </p>
                        <div className='mt-6'>
                            <button
                                type='button'
                                onClick={() => setOpen(true)}
                                className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            >
                                <PlusIcon className='-ml-0.5 mr-1.5 h-5 w-5' aria-hidden='true' />
                                Use Defaults
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <DefaultCategoriesModal open={open} setOpen={setOpen} />
        </div>
    )
}

'use client'

import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'

import { classNames } from '@/lib/classes'
import { categorySorts } from '@/lib/sorts/categorySorts'
import { useCategories } from '@/contexts/CategoryContext'
import { DefaultCategoriesModal } from '../Modals/DefaultCategories'
import { CategoryEditActions } from '../Dropdowns/CategoryActions'
import { useRouter, useSearchParams } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export function Categories() {
    const query = useSearchParams()
    const router = useRouter()

    const [open, setOpen] = useState(false)

    const sort = query.get('sort')
    const reversed = query.get('reversed')
    const { sortByKind, sortByCategory } = categorySorts()

    const { categories } = useCategories()
    const displayCategories = categories

    if (sort === 'category') {
        displayCategories.sort(sortByCategory)
    } else if (sort === 'type') {
        displayCategories.sort(sortByKind)
    }
    if (reversed === 'true') {
        displayCategories.reverse()
    }

    const toggleSort = (input: string) => {
        if (input === sort) {
            const newReversed = reversed === 'true' ? 'false' : 'true'
            router.replace(`/transactions/categories?sort=${sort}&reversed=${newReversed}`)
        } else {
            router.replace(`/transactions/categories?sort=${input}`)
        }
    }

    return (
        <div className='-mx-4 -my-2 mt-8 overflow-x-auto pb-16 sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle'>
                <table className='min-w-full divide-y divide-gray-300'>
                    <thead>
                        <tr>
                            <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8'
                            >
                                <button
                                    onClick={() => toggleSort('category')}
                                    className='group inline-flex'
                                >
                                    Category
                                    <span
                                        data-selected={query.get('sort') === 'category'}
                                        className='invisible ml-2 flex-none rounded text-gray-400 group-hover:visible data-[selected=true]:visible data-[selected=true]:bg-gray-100 data-[selected=true]:text-gray-900 data-[selected=true]:group-hover:bg-gray-200'
                                    >
                                        {query.get('reversed') === 'true' ? (
                                            <ChevronUpIcon className='h-5 w-5' aria-hidden='true' />
                                        ) : (
                                            <ChevronDownIcon
                                                className='h-5 w-5'
                                                aria-hidden='true'
                                            />
                                        )}
                                    </span>
                                </button>
                            </th>
                            <th
                                scope='col'
                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                            >
                                <button
                                    onClick={() => toggleSort('type')}
                                    className='group inline-flex'
                                >
                                    Type
                                    <span
                                        data-selected={query.get('sort') === 'type'}
                                        className='invisible ml-2 flex-none rounded text-gray-400 group-hover:visible data-[selected=true]:visible data-[selected=true]:bg-gray-100 data-[selected=true]:text-gray-900 data-[selected=true]:group-hover:bg-gray-200'
                                    >
                                        {query.get('reversed') === 'true' ? (
                                            <ChevronUpIcon className='h-5 w-5' aria-hidden='true' />
                                        ) : (
                                            <ChevronDownIcon
                                                className='h-5 w-5'
                                                aria-hidden='true'
                                            />
                                        )}
                                    </span>
                                </button>
                            </th>
                            <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8'>
                                <span className='sr-only'>Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 bg-white'>
                        {displayCategories.map(category => (
                            <tr key={category.id}>
                                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'>
                                    {category.category}
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                    <span
                                        className={classNames(
                                            category.kind === 'Income'
                                                ? 'bg-green-50 text-green-800 ring-green-600/20'
                                                : 'bg-red-50 text-red-800 ring-red-600/20',
                                            'mr-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset',
                                        )}
                                    >
                                        {category.kind}
                                    </span>
                                </td>
                                <td className='relative flex items-center justify-end py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8'>
                                    <CategoryEditActions
                                        id={category.id}
                                        category={category.category}
                                    />
                                    <span className='sr-only'>Edit, {category.category}</span>
                                </td>
                            </tr>
                        ))}
                        {displayCategories.length === 0 && (
                            <tr>
                                <td></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {displayCategories.length === 0 && (
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

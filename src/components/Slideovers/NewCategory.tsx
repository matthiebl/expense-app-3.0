'use client'

import { Dispatch, FormEvent, Fragment, SetStateAction, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { LinkIcon, PlusIcon } from '@heroicons/react/20/solid'

export function NewCategorySlide({
    open,
    setOpen,
}: {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}) {
    const [newTitle, setNewTitle] = useState('')
    const [kind, setKind] = useState<'Income' | 'Expense'>('Income')

    const onSubmitNewCategory = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log('Create new', newTitle, kind)
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={setOpen}>
                <div className='fixed inset-0' />

                <div className='fixed inset-0 overflow-hidden'>
                    <div className='absolute inset-0 overflow-hidden'>
                        <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16'>
                            <Transition.Child
                                as={Fragment}
                                enter='transform transition ease-in-out duration-500 sm:duration-700'
                                enterFrom='translate-x-full'
                                enterTo='translate-x-0'
                                leave='transform transition ease-in-out duration-500 sm:duration-700'
                                leaveFrom='translate-x-0'
                                leaveTo='translate-x-full'
                            >
                                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                                    <form
                                        onSubmit={onSubmitNewCategory}
                                        className='flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl'
                                    >
                                        <div className='h-0 flex-1 overflow-y-auto'>
                                            <div className='z-50 mt-14 bg-indigo-700 px-4 py-6 sm:px-6 lg:mt-0'>
                                                <div className='flex items-center justify-between'>
                                                    <Dialog.Title className='text-base font-semibold leading-6 text-white'>
                                                        New Category
                                                    </Dialog.Title>
                                                    <div className='ml-3 flex h-7 items-center'>
                                                        <button
                                                            type='button'
                                                            className='relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className='absolute -inset-2.5' />
                                                            <span className='sr-only'>
                                                                Close panel
                                                            </span>
                                                            <XMarkIcon
                                                                className='h-6 w-6'
                                                                aria-hidden='true'
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='mt-1'>
                                                    <p className='text-sm text-indigo-300'>
                                                        Get started by filling in the information
                                                        below to create your new category.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex flex-1 flex-col justify-between'>
                                                <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                                                    <div className='space-y-6 pb-5 pt-6'>
                                                        <div>
                                                            <label
                                                                htmlFor='category-name'
                                                                className='block text-sm font-medium leading-6 text-gray-900'
                                                            >
                                                                Category name
                                                            </label>
                                                            <div className='mt-2'>
                                                                <input
                                                                    type='text'
                                                                    name='category-name'
                                                                    id='category-name'
                                                                    required
                                                                    value={newTitle}
                                                                    onChange={e =>
                                                                        setNewTitle(e.target.value)
                                                                    }
                                                                    pattern='[a-zA-Z ]{2,25}'
                                                                    className='block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                                />
                                                            </div>
                                                            <p
                                                                className='mt-2 text-sm text-gray-500'
                                                                id='email-description'
                                                            >
                                                                Must be 2-25 letters or spaces
                                                            </p>
                                                        </div>
                                                        <fieldset>
                                                            <legend className='text-sm font-medium leading-6 text-gray-900'>
                                                                Category type
                                                            </legend>
                                                            <div className='mt-2 space-y-4'>
                                                                <div className='relative flex items-start'>
                                                                    <div className='absolute flex h-6 items-center'>
                                                                        <input
                                                                            id='type-income'
                                                                            name='type'
                                                                            type='radio'
                                                                            checked={
                                                                                kind === 'Income'
                                                                            }
                                                                            onChange={() =>
                                                                                setKind('Income')
                                                                            }
                                                                            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                                                                        />
                                                                    </div>
                                                                    <div className='pl-7 text-sm leading-6'>
                                                                        <label
                                                                            htmlFor='type-income'
                                                                            className='font-medium text-gray-900'
                                                                        >
                                                                            Income
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className='relative flex items-start'>
                                                                        <div className='absolute flex h-6 items-center'>
                                                                            <input
                                                                                id='type-expense'
                                                                                name='type'
                                                                                type='radio'
                                                                                checked={
                                                                                    kind ===
                                                                                    'Expense'
                                                                                }
                                                                                onChange={() =>
                                                                                    setKind(
                                                                                        'Expense',
                                                                                    )
                                                                                }
                                                                                className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                                                                            />
                                                                        </div>
                                                                        <div className='pl-7 text-sm leading-6'>
                                                                            <label
                                                                                htmlFor='type-expense'
                                                                                className='font-medium text-gray-900'
                                                                            >
                                                                                Expense
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </fieldset>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-shrink-0 justify-end px-4 py-4'>
                                            <button
                                                type='button'
                                                className='rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                                                onClick={() => setOpen(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type='submit'
                                                className='ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                            >
                                                Create
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

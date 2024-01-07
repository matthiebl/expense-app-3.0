'use client'

import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

import { db } from '@/lib/firebase/database'
import { classNames } from '@/lib/classes'
import { toastError, toastSuccess } from '../Toasts'
import { EditCategorySlide } from '../Slideovers/EditCategory'
import { EditDataRuleSlide } from '../Slideovers/EditDataRule'

export function DataRuleEditActions({ id, category }: { id: string; category: string }) {
    // const handleDeleteDataRule = async () => {
    //     const { error } = await db.deleteCategory(id)
    //     if (error) {
    //         toastError(error.message)
    //     } else {
    //         toastSuccess('Successfully deleted rule')
    //     }
    // }

    const [open, setOpen] = useState(false)

    return (
        <>
            <Menu as='div' className='relative inline-block text-left'>
                <div>
                    <Menu.Button className='flex items-center rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'>
                        <span className='sr-only'>Open options</span>
                        <EllipsisVerticalIcon className='h-5 w-5' aria-hidden='true' />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                >
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <div className='py-1'>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => setOpen(true)}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block w-full px-4 py-2 text-left text-sm',
                                        )}
                                    >
                                        Edit
                                    </button>
                                )}
                            </Menu.Item>
                            {/* <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={handleDeleteDataRule}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block w-full px-4 py-2 text-left text-sm',
                                        )}
                                    >
                                        Delete
                                    </button>
                                )}
                            </Menu.Item> */}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            <EditDataRuleSlide
                open={open}
                setOpen={setOpen}
                id={id}
                dataRule={{ title: '', regex: '', category: null }}
            />
        </>
    )
}

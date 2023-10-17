import { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { toastSuccess } from '../Toasts'
import { db } from '@/lib/firebase/database'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase/auth'

const defaultIncome = [
    'Paycheck',
    'Bonus',
    'Savings Withdrawal',
    'Interest',
    'Dividends',
    'Refund',
    'Gift',
    'Other',
]
const defaultExpenses = [
    'Rent',
    'Mortgage',
    'Utilities',
    'Fuel',
    'Groceries',
    'Food and Drinks',
    'Clothes',
    'Hobbies',
    'Fitness',
    'Streaming Services',
    'Concerts and Clubbing',
    'Grooming',
    'Gifts',
    'Mobile',
    'Software',
    'Technology',
    'Transport',
    'Flights and Travel',
    'Accomodation',
    'Holiday Entertainment',
    'Holiday Food and Drinks',
    'Insurance',
    'Education',
    'Tax',
    'Pets',
    'Other',
]

type CategoryKind = 'Income' | 'Expense'
type SelectCategory = { kind: CategoryKind; category: string; include: boolean }

const defaultCategories: SelectCategory[] = [
    ...defaultIncome.map(category => ({ category, kind: 'Income' as CategoryKind, include: true })),
    ...defaultExpenses.map(category => ({
        category,
        kind: 'Expense' as CategoryKind,
        include: true,
    })),
]

export function DefaultCategoriesModal({
    open,
    setOpen,
}: {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}) {
    const cancelButtonRef = useRef(null)
    const [uid, setUID] = useState<string | null>(null)
    const [categories, setCategories] = useState(defaultCategories)

    useEffect(() => {
        onAuthStateChanged(auth.fb, user => {
            if (user) {
                setUID(user.uid)
            }
        })
    }, [])

    const handleSubmitCategories = async () => {
        if (!uid) {
            return
        }

        await db.addCategories(
            uid,
            categories
                .filter(({ include }) => include)
                .map(({ kind, category }) => ({ kind, category })),
        )

        setOpen(false)
        toastSuccess('Successfully added selected categories')
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-[100]'
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 z-[100] w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:mb-24 sm:mt-16 sm:w-full sm:max-w-lg'>
                                <div className='bg-white px-4 pb-1 pt-5 sm:p-6 sm:pb-2'>
                                    <div className='sm:flex sm:items-start'>
                                        <div className='mt-3 text-center sm:mt-0 sm:text-left'>
                                            <Dialog.Title
                                                as='h3'
                                                className='text-base font-semibold leading-6 text-gray-900'
                                            >
                                                Add Default Categories
                                            </Dialog.Title>
                                            <div className='mt-2'>
                                                <p className='text-sm text-gray-500'>
                                                    Review the default categories that we suggest
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='px-4 pb-4 sm:p-6 sm:pb-4 sm:pt-0'>
                                    <fieldset>
                                        <div className='divide-y divide-gray-200'>
                                            {categories.map((category, index) => (
                                                <div
                                                    key={index}
                                                    className='relative flex items-start py-4'
                                                >
                                                    <div className='flex min-w-0 flex-1 justify-between text-sm leading-6'>
                                                        <label
                                                            htmlFor={`category-${index}`}
                                                            className='mr-2 select-none font-medium text-gray-900'
                                                        >
                                                            {category.category}
                                                        </label>
                                                        <span
                                                            className={`${
                                                                category.kind === 'Income'
                                                                    ? 'bg-green-50 text-green-800 ring-green-600/20'
                                                                    : 'bg-red-50 text-red-800 ring-red-600/20'
                                                            }
                                                                 mr-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset`}
                                                        >
                                                            {category.kind}
                                                        </span>
                                                    </div>
                                                    <div className='ml-3 flex h-6 items-center'>
                                                        <input
                                                            id={`category-${index}`}
                                                            name={`category-${index}`}
                                                            type='checkbox'
                                                            checked={category.include}
                                                            onChange={() => {
                                                                const copied = [...categories]
                                                                copied[index].include =
                                                                    !copied[index].include
                                                                setCategories(copied)
                                                            }}
                                                            className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </fieldset>
                                </div>
                                <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                                    <button
                                        type='button'
                                        className='inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto'
                                        onClick={handleSubmitCategories}
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        type='button'
                                        className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

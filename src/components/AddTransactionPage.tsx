'use client'

import { FormEvent, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase/auth'
import { Rule, db } from '@/lib/firebase/database'
import { CategorySelect, CategoryOption } from './Dropdowns/CategorySelect'
import { CalendarIcon } from '@heroicons/react/20/solid'
import { toastError, toastSuccess } from './Toasts'
import { TransactionFileDrop } from './TransactionFileDrop'

export function AddTransaction() {
    const [uid, setUID] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState({ id: '0', main: 'Select an option', secondary: '' })
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')

    const [categories, setCategories] = useState<CategoryOption[]>([])
    const [rules, setRules] = useState<Rule[]>([])
    const [fileEntries, setFileEntries] = useState<
        { date: string; amount: string; description: string }[]
    >([])

    useEffect(() => {
        onAuthStateChanged(auth.fb, user => {
            if (user) {
                setUID(user.uid)
                db.categories(user.uid, data => {
                    const categories = data
                        .map(d => ({
                            id: d.id,
                            main: d.category,
                            secondary: d.kind,
                        }))
                        .sort((a, b) => (a.main > b.main ? 1 : -1))
                    setCategories(categories)
                })
                db.rules(user.uid, data => setRules(data))
            }
        })
    }, [])

    const handleClear = () => {
        setTitle('')
        setDescription('')
        setCategory({ id: '0', main: 'Select an option', secondary: '' })
        setAmount('')
        setDate('')

        if (fileEntries.length) {
            setFileEntries(fileEntries.slice(1))
        }
    }

    const handleSubmitTransaction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (uid === '') return
        if (category.secondary === '') {
            toastError('Select a category')
            return
        }
        try {
            Number.parseFloat(amount)
        } catch {
            toastError('Amount is not a valid number')
            return
        }
        if (!/^\d\d\d\d-\d\d-\d\d$/.test(date)) {
            console.log(date)
            toastError('Select a valid date')
            return
        }

        db.addTransaction(uid, { title, description, category: category.id, amount, date })
        toastSuccess('Successfully created transaction', title)
        handleClear()

        if (fileEntries.length) {
            setFileEntries(fileEntries.slice(1))
        }
    }

    useEffect(() => {
        if (fileEntries.length === 0) {
            return
        }
        const { date, amount, description } = fileEntries[0]
        setDate(date)
        setAmount(amount)
        setDescription(description)

        for (const rule of rules) {
            const re = new RegExp(rule.regex)
            if (re.test(description.toLowerCase())) {
                setTitle(rule.title)
                const cat = categories.find(c => c.id === rule.category)
                if (cat) {
                    setCategory(cat)
                }
                return
            }
        }
    }, [fileEntries])

    return (
        <form onSubmit={handleSubmitTransaction}>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'>
                <div className='sm:col-span-4'>
                    <label
                        htmlFor='title'
                        className='block text-sm font-medium leading-6 text-gray-900'
                    >
                        Title
                    </label>
                    <div className='mt-2'>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            required
                            pattern='([a-zA-Z0-9.#]| |-){2,35}'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                    </div>
                    <p className='mt-2 text-sm text-gray-500'>
                        Must be 2-35 letters, numbers, spaces or (- . #)
                    </p>
                </div>

                <div className='col-span-full'>
                    <label
                        htmlFor='description'
                        className='block text-sm font-medium leading-6 text-gray-900'
                    >
                        Description
                    </label>
                    <div className='mt-2'>
                        <input
                            type='text'
                            name='description'
                            id='description'
                            required
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                    </div>
                </div>

                <div className='col-span-full'>
                    <CategorySelect
                        options={categories}
                        selected={category}
                        setSelected={setCategory}
                    />
                </div>

                <div className='col-span-full'>
                    <label
                        htmlFor='price'
                        className='block text-sm font-medium leading-6 text-gray-900'
                    >
                        Amount
                    </label>
                    <div className='relative mt-2 rounded-md shadow-sm'>
                        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                            <span className='text-gray-500 sm:text-sm'>$</span>
                        </div>
                        <input
                            type='number'
                            name='price'
                            id='price'
                            className='block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            placeholder='0.00'
                            required
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            aria-describedby='price-currency'
                        />
                    </div>
                </div>

                <div className='col-span-full'>
                    <label
                        htmlFor='date'
                        className='block text-sm font-medium leading-6 text-gray-900'
                    >
                        Date
                    </label>
                    <div className='relative mt-2 rounded-md shadow-sm'>
                        <div className='pointer-events-none absolute inset-y-0 left-0 -ml-0.5 flex items-center pl-3 text-gray-500'>
                            <CalendarIcon className='h-4 w-4' />
                        </div>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            className='block w-full rounded-md border-0 py-1.5 pl-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            placeholder='0.00'
                            required
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            aria-describedby='date-currency'
                        />
                    </div>
                </div>

                <div className='col-span-full flex justify-end'>
                    <button
                        type='button'
                        onClick={handleClear}
                        className='rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                    >
                        Clear
                    </button>
                    <button
                        type='submit'
                        className='ml-3 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                        {fileEntries.length > 1 ? 'Create and next' : 'Create'}
                    </button>
                </div>
                <div className='col-span-full'>
                    <TransactionFileDrop fileEntries={setFileEntries} />
                    {fileEntries.length > 0 && (
                        <p className='mt-2 text-sm text-gray-500'>
                            Uploaded file with {fileEntries.length - 1} entries remaining
                        </p>
                    )}
                </div>
            </div>
        </form>
    )
}

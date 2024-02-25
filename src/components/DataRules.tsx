'use client'

import { FormEvent, useState } from 'react'
import { useUserProfile } from '@/contexts/UserProfileContext'
import { useCategories } from '@/contexts/CategoryContext'
import { useDataRules } from '@/contexts/DataRuleContext'
import { db } from '@/lib/firebase/database'
import { CategorySelect } from './Dropdowns/CategorySelect'
import { toastError, toastSuccess } from './Toasts'
import { Header } from './Headings'
import { DataRulesTable } from './Tables/DataRules'

export function DataRules() {
    const { uid } = useUserProfile()
    const { dataRules } = useDataRules()
    const { categories } = useCategories()
    const categoryOptions = categories
        .map(d => ({
            id: d.id,
            main: d.category,
            secondary: d.kind,
        }))
        .sort((a, b) => (a.main > b.main ? 1 : -1))

    const [regex, setRegex] = useState('')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState({ id: '0', main: 'Select an option', secondary: '' })

    const handleClear = () => {
        setRegex('')
        setTitle('')
        setCategory({ id: '0', main: 'Select an option', secondary: '' })
    }

    const handleSubmitTransaction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (uid === '') return
        if (category.secondary === '') {
            toastError('Select a category')
            return
        }

        db.addRule(uid, { title, category: category.id, regex, sortIndex: dataRules.length })
        toastSuccess('Successfully created data rule', title)
        handleClear()
    }

    return (
        <div className='py-16'>
            <Header title='Data Rules' />
            <p className='mt-2 text-sm text-gray-500'>
                Creating data rules makes adding data faster and easier. When you add a new entry
                using the batch upload feature, it will apply the regex against the description of
                that entry, and fill in the title and category automatically based on your preset
                data rules.
            </p>

            <form onSubmit={handleSubmitTransaction}>
                <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6'>
                    <div className='sm:col-span-4'>
                        <label
                            htmlFor='regex'
                            className='block text-sm font-medium leading-6 text-gray-900'
                        >
                            Regex
                        </label>
                        <div className='mt-2'>
                            <input
                                type='text'
                                name='regex'
                                id='regex'
                                required
                                value={regex}
                                onChange={e => setRegex(e.target.value)}
                                className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                        <p className='mt-2 text-sm text-gray-500'>
                            Use Node.js regex patterns. Gets applied against the description as
                            lowercase
                        </p>
                    </div>

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
                        <CategorySelect
                            options={categoryOptions}
                            selected={category}
                            setSelected={setCategory}
                        />
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
                            Create
                        </button>
                    </div>
                </div>
            </form>

            <DataRulesTable />
        </div>
    )
}

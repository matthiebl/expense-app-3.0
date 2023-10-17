'use client'

import { useState } from 'react'
import { Header } from '.'
import { NewCategorySlide } from '../Slideovers/NewCategory'

export function CategoriesHeader() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Header
                title='Categories'
                action={
                    <button
                        type='button'
                        onClick={() => setOpen(true)}
                        className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                        Add Category
                    </button>
                }
            />
            <NewCategorySlide open={open} setOpen={setOpen} />
        </>
    )
}

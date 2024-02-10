'use client'

import { useState } from 'react'
import { Header } from '.'
import { NewCategorySlide } from '../Slideovers/NewCategory'
import { PrimaryButton, SecondaryButton } from '../Buttons'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function CategoriesHeader() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Header
                title='Categories'
                action={
                    <>
                        <Link
                            href='/transactions/categories/spend'
                            type='button'
                            className='inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                            Spend Categories
                        </Link>
                        <PrimaryButton onClick={() => setOpen(true)}>Add Category</PrimaryButton>
                    </>
                }
            />
            <NewCategorySlide open={open} setOpen={setOpen} />
        </>
    )
}

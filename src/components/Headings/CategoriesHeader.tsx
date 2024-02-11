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
                        <SecondaryButton href='/transactions/categories/spend' link>
                            Spend Categories
                        </SecondaryButton>
                        <PrimaryButton onClick={() => setOpen(true)}>Add Category</PrimaryButton>
                    </>
                }
            />
            <NewCategorySlide open={open} setOpen={setOpen} />
        </>
    )
}

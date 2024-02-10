'use client'

import { useState } from 'react'
import { Header } from '.'
import { NewCategorySlide } from '../Slideovers/NewCategory'
import { PrimaryButton, SecondaryButton } from '../Buttons'
import { useRouter } from 'next/navigation'

export function CategoriesHeader() {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    return (
        <>
            <Header
                title='Categories'
                action={
                    <>
                        <SecondaryButton
                            onClick={() => router.push('/transactions/categories/spend')}
                        >
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

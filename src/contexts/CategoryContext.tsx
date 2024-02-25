'use client'

import { CategoriesHook, useFetchCategories } from '@/hooks/data/useFetchCategories'
import { ReactNode, createContext, useContext } from 'react'

const CategoryContext = createContext<CategoriesHook | null>(null)

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
    const categories = useFetchCategories()
    return <CategoryContext.Provider value={categories}>{children}</CategoryContext.Provider>
}

export const useCategories = () => {
    const context = useContext(CategoryContext)
    if (!context) {
        throw new Error('useCategories must be used within a CategoryProvider')
    }
    return context
}

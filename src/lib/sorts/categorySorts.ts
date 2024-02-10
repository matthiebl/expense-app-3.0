import { Category } from '@/models/categories'

export const categorySorts = () => {
    const sortByKind = (a: Category, b: Category) => a.kind.localeCompare(b.kind)

    const sortByCategory = (a: Category, b: Category) => a.category.localeCompare(b.category)

    return {
        sortByKind,
        sortByCategory,
    }
}

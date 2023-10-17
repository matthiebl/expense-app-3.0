import { CategoriesHeader } from '@/components/Headings/CategoriesHeader'
import { Categories } from '@/components/Tables/Categories'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function CategoriesPage() {
    return (
        <>
            <CategoriesHeader />
            <Categories />
        </>
    )
}

import { SpendCategories } from '@/components/DND/SpendCategories'
import { Header } from '@/components/Headings'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function CategoriesPage() {
    return (
        <>
            <Header title='Spend Categories' />
            <SpendCategories />
        </>
    )
}

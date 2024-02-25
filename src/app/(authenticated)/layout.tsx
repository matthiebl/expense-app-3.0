import { Navigation } from '@/components/Navigation'
import { AuthListener } from '@/components/AuthListener'
import { CategoryProvider } from '@/contexts/CategoryContext'
import { UserProfileProvider } from '@/contexts/UserProfileContext'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function SidebarLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AuthListener />
            <Navigation />

            <UserProfileProvider>
                <CategoryProvider>
                    <main className='h-full bg-white py-10 lg:pl-72'>
                        <div className='px-4 sm:px-6 lg:px-8'>{children}</div>
                    </main>
                </CategoryProvider>
            </UserProfileProvider>
        </>
    )
}

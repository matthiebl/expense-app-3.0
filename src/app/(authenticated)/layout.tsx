import { Navigation } from '@/components/Navigation'

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navigation />

            <main className='h-full bg-white py-10 lg:pl-72'>
                <div className='px-4 sm:px-6 lg:px-8'>{children}</div>
            </main>
        </>
    )
}

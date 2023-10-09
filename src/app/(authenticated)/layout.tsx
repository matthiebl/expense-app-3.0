import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/supabase/database'
import { Navigation } from '@/components/Navigation'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function SidebarLayout({ children }: { children: React.ReactNode }) {
    const supabase = createServerComponentClient<Database>({ cookies })

    const { error } = await supabase.auth.getUser()
    if (error) {
        console.error('Not logged in')
        redirect('/')
    }

    return (
        <>
            <Navigation />

            <main className='h-full bg-white py-10 lg:pl-72'>
                <div className='px-4 sm:px-6 lg:px-8'>{children}</div>
            </main>
        </>
    )
}

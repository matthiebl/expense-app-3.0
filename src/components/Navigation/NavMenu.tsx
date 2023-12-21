import { classNames } from '@/lib/classes'
import { navigation } from '.'
import { Profile } from './Profile'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function NavMenu({ desktop = false }: { desktop?: boolean }) {
    const pathname = usePathname()

    return (
        <>
            <div className='flex h-16 shrink-0 items-end'>
                <h1 className='text-3xl font-bold text-indigo-500'>Expenses Pro</h1>
            </div>
            <nav className='flex flex-1 flex-col'>
                <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                    <li>
                        <ul role='list' className='-mx-2 space-y-1'>
                            {navigation.map(item => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={classNames(
                                            pathname === item.href
                                                ? 'bg-gray-800 text-white'
                                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                        )}
                                    >
                                        <item.icon
                                            className='h-6 w-6 shrink-0'
                                            aria-hidden='true'
                                        />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className='-mx-6 mt-auto'>
                        <Profile />
                    </li>
                </ul>
            </nav>
        </>
    )
}

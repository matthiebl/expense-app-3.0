import { classNames } from '@/lib/classes'
import { navigation } from '.'
import { Profile } from './Profile'

export function NavMenu({ desktop = false }: { desktop?: boolean }) {
    return (
        <>
            <div className='flex h-16 shrink-0 items-center'>
                <img
                    className='h-8 w-auto'
                    src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                    alt='Your Company'
                />
            </div>
            <nav className='flex flex-1 flex-col'>
                <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                    <li>
                        <ul role='list' className='-mx-2 space-y-1'>
                            {navigation.map(item => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className={classNames(
                                            item.current
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
                                    </a>
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

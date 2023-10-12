import {
    DocumentIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    TagIcon,
} from '@heroicons/react/24/outline'

export * from './Navigation'
export const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Transactions', href: '/transactions', icon: DocumentIcon },
    { name: 'New Data', href: '/transactions/add', icon: DocumentDuplicateIcon },
    { name: 'Categories', href: '/transactions/categories', icon: FolderIcon },
    { name: 'Groups', href: '/transactions/groups', icon: TagIcon },
]

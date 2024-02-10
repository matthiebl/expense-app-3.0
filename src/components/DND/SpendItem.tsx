import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { classNames } from '@/lib/classes'
import { Category } from '@/models/categories'

export const SortableItem = ({ item }: { item: Category }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: item.id,
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <ItemCard item={item} />
        </div>
    )
}

export const ItemCard = ({ item }: { item: Category }) => {
    return (
        <div
            className={classNames(
                item.kind === 'Income'
                    ? 'bg-green-50 text-green-800 ring-green-600/20'
                    : 'bg-red-50 text-red-800 ring-red-600/20',
                'w-full rounded px-3 py-2 ring-1 ring-inset',
            )}
        >
            {item.category}
        </div>
    )
}

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableItem } from './SpendItem'
import { Category } from '@/models/categories'

export const Section = ({ id, title, items }: { id: string; title: string; items: Category[] }) => {
    const { setNodeRef } = useDroppable({
        id,
    })

    return (
        <div className='min-h-full w-full min-w-[250px] overflow-hidden rounded-lg bg-gray-50 p-4 shadow-inner'>
            <h3 className='mb-2'>{title}</h3>
            <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
                <div ref={setNodeRef} className='flex flex-col gap-3'>
                    {items.map(item => (
                        <SortableItem key={item.id} item={item} />
                    ))}
                </div>
            </SortableContext>
        </div>
    )
}

'use client'

import { classNames } from '@/lib/classes'
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core'
import { ReactNode, useState } from 'react'

type SpendCategory =
    | 'Dining'
    | 'Entertainment'
    | 'Groceries'
    | 'Shopping'
    | 'Transport'
    | 'Utilities'
    | 'Uncategorised'

const defaultSpendCategories: Record<SpendCategory, ReactNode[]> = {
    Dining: [],
    Entertainment: [],
    Groceries: [],
    Shopping: [],
    Transport: [],
    Utilities: [],
    Uncategorised: [<Draggable id='1' />, <Draggable id='2' />, <Draggable id='3' />],
}

export function SpendCategories() {
    const [drags, setDrags] = useState(defaultSpendCategories)

    const handleDrop = (event: DragEndEvent) => {
        if (event.over && event.over.id) return
    }

    return (
        <DndContext onDragEnd={handleDrop}>
            <div className='w-[calc(100% + 64px)] -mx-8 flex gap-3 overflow-x-auto px-8 py-2 pb-6'>
                {Object.keys(defaultSpendCategories).map(title => (
                    <Droppable key={title} id={title} items={drags[title as SpendCategory]} />
                ))}
            </div>
        </DndContext>
    )
}

function Draggable({ id }: { id: string }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    })
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined
    return (
        <button
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={classNames(
                'w-full rounded bg-indigo-300 px-3 py-2',
                transform ? 'z-[1000]' : 'z-40',
            )}
        >
            Drag Me
        </button>
    )
}

function Droppable({ id, items }: { id: string; items: ReactNode[] }) {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    })

    return (
        <div
            ref={setNodeRef}
            className={classNames(
                'min-h-full w-full min-w-[300px] overflow-hidden rounded-lg bg-gray-50 shadow-inner',
                isOver ? 'ring-2 ring-indigo-500' : '',
            )}
        >
            <div className='flex flex-col gap-3 px-4 py-3'>
                {id}
                {items}
            </div>
        </div>
    )
}

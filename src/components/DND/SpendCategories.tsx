'use client'

import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core'
import { useFetchCategories } from '@/hooks/data/useFetchCategories'
import { useSortableLists } from '@/hooks/dnd/useSortableLists'
import { Category } from '@/models/categories'
import { Section } from './SpendSection'
import { ItemCard } from './SpendItem'

const initalSections: Record<string, Category[]> = {
    Bills: [],
    Subscriptions: [],
    Dining: [],
    Entertainment: [],
    Uncategorised: [],
}

export function SpendCategories() {
    const { categories } = useFetchCategories()
    initalSections['Uncategorised'] = categories

    const {
        sections,
        activeItemId,
        sensors,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
        dropAnimation,
    } = useSortableLists(categories, initalSections)

    const activeItem = activeItemId ? categories.find(item => item.id === activeItemId) : null

    return (
        <div className='w-[calc(100% + 64px)] -mx-8 mt-4 flex gap-3 overflow-x-auto px-8 py-2 pb-6'>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                {Object.keys(sections).map(sectionKey => (
                    <Section
                        key={sectionKey}
                        id={sectionKey}
                        title={sectionKey}
                        items={sections[sectionKey]}
                    />
                ))}
                <DragOverlay dropAnimation={dropAnimation}>
                    {activeItem ? (
                        <div className='cursor-grabbing'>
                            <ItemCard item={activeItem} />
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    )
}

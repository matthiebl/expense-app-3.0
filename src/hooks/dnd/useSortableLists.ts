import {
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    DropAnimation,
    KeyboardSensor,
    PointerSensor,
    defaultDropAnimation,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useState } from 'react'

export interface MinItem {
    id: string
}

export const useSortableLists = <T extends MinItem>(
    initialItems: T[],
    initialSections: Record<string, T[]>,
) => {
    const [sections, setSections] = useState(initialSections)

    const [activeItemId, setActiveItemId] = useState<null | string>(null)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    const handleDragStart = ({ active }: DragStartEvent) => {
        setActiveItemId(active.id as string)
    }

    const handleDragOver = ({ active, over }: DragOverEvent) => {
        // Find the containers
        const activeContainer = findSectionContainer(sections, active.id as string)
        const overContainer = findSectionContainer(sections, over?.id as string)

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
            return
        }

        setSections(section => {
            const activeItems = section[activeContainer]
            const overItems = section[overContainer]

            // Find the indexes for the items
            const activeIndex = activeItems.findIndex(item => item.id === active.id)
            const overIndex = overItems.findIndex(item => item.id !== over?.id)

            return {
                ...section,
                [activeContainer]: [
                    ...section[activeContainer].filter(item => item.id !== active.id),
                ],
                [overContainer]: [
                    ...section[overContainer].slice(0, overIndex),
                    sections[activeContainer][activeIndex],
                    ...section[overContainer].slice(overIndex, section[overContainer].length),
                ],
            }
        })
    }

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        const activeContainer = findSectionContainer(sections, active.id as string)
        const overContainer = findSectionContainer(sections, over?.id as string)

        if (!activeContainer || !overContainer || activeContainer !== overContainer) {
            return
        }

        const activeIndex = sections[activeContainer].findIndex(task => task.id === active.id)
        const overIndex = sections[overContainer].findIndex(task => task.id === over?.id)

        if (activeIndex !== overIndex) {
            setSections(section => ({
                ...section,
                [overContainer]: arrayMove(section[overContainer], activeIndex, overIndex),
            }))
        }

        setActiveItemId(null)
    }

    const dropAnimation: DropAnimation = {
        ...defaultDropAnimation,
    }

    return {
        sections,
        activeItemId,
        sensors,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
        dropAnimation,
    }
}

const findSectionContainer = <T extends MinItem>(sections: Record<string, T[]>, id: string) => {
    if (id in sections) {
        return id
    }

    return Object.keys(sections).find(key => sections[key].find(item => item.id === id))
}

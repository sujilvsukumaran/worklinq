'use client';

import { useDraggable } from '@dnd-kit/core';
import { Task } from '@/types';

type Props = {
    task: Task;
};

export default function DraggableTask({ task }: Props) {
    const { attributes, listeners, setNodeRef } = useDraggable({ id: task.id });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="border rounded px-4 py-2 shadow-sm bg-white cursor-move"
        >
            <p className="font-medium">{task.title}</p>
            <p className="text-sm text-gray-500">{task.status}</p>
        </div>
    );
}
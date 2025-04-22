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
            className="border border-gray-300 rounded-md px-4 py-3 bg-white shadow hover:shadow-md transition cursor-move"
        >
            <p className="text-base font-medium text-gray-800">{task.title}</p>
            <span className={`text-xs px-2 py-1 mt-1 inline-block rounded-full text-white ${
                task.status === 'OPEN'
                    ? 'bg-gray-500'
                    : task.status === 'IN_PROGRESS'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
            }`}>
      {task.status}
    </span>
        </div>
    );
}
'use client';

import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Task } from '@/types';
import AddTaskModal from '@/components/AddTaskModal';
import DraggableTask from '@/components/DraggableTask';
import { v4 as uuidv4 } from 'uuid';

type Props = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function TaskPanel({ tasks, setTasks }: Props) {
    const [showModal, setShowModal] = useState(false);
    const { setNodeRef } = useDroppable({ id: 'unassigned' });

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Tasks</h2>
                <button
                    onClick={() => setShowModal (true)}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                    + Add Task
                </button>
            </div>
            <div ref={setNodeRef}
                 className={`space-y-3 min-h-[80px] bg-white rounded border border-dashed border-gray-300 px-4 py-2`}>
                {tasks.length === 0 ? (
                    <p className="text-sm text-gray-400 italic">Drop tasks here</p>
                ) : (
                    tasks.map ((task) => <DraggableTask key={task.id} task={task}/>)
                )}
            </div>
            <AddTaskModal
                isOpen={showModal}
                onClose={() => setShowModal (false)}
                onAdd={(title, status) => {
                    const newTask = {
                        id: uuidv4 (),
                        title,
                        status,
                    };
                    setTasks ((prev) => [...prev, newTask]);
                }}
            />
        </section>
    );
}
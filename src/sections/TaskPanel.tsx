'use client';

import { useState } from 'react';
import AddTaskModal from '@/components/AddTaskModal';
import { Task } from '@/types';
import { useDraggable } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';


type Props = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};



const TaskPanel = ({ tasks, setTasks }: Props) => {
    // const [tasks, setTasks] = useState<Task[]>([
    //     { id: '1', title: 'Design wireframes', status: 'OPEN' },
    //     { id: '2', title: 'Implement drag and drop', status: 'IN_PROGRESS' },
    // ]);

    const [showModal, setShowModal] = useState(false);

    const DraggableTask = ({ task }: { task: Task }) => {
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
    };

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Tasks</h2>
                <button
                    onClick={() => setShowModal (true)}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                    + Add Task
                </button>
            </div>

            <div className="space-y-2">
                {tasks.map((task) => (
                    <DraggableTask key={task.id} task={task} />
                ))}
            </div>
            <AddTaskModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onAdd={(title, status) => {
                    const newTask = {
                        id: uuidv4(),
                        title,
                        status,
                    };
                    setTasks((prev) => [...prev, newTask]);
                }}
            />
        </section>
    );
};

export default TaskPanel;
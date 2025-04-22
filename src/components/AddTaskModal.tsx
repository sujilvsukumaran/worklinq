'use client';

import { useState } from 'react';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (title: string, status: 'OPEN' | 'IN_PROGRESS' | 'DONE') => void;
};

const AddTaskModal = ({ isOpen, onClose, onAdd }: Props) => {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState<'OPEN' | 'IN_PROGRESS' | 'DONE'>('OPEN');

    const handleSubmit = () => {
        if (title.trim()) {
            onAdd(title, status);
            setTitle('');
            setStatus('OPEN');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Add Task</h2>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task title"
                    className="border w-full mb-4 p-2 rounded"
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="border w-full mb-4 p-2 rounded"
                >
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                </select>

                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-1 border rounded">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTaskModal;
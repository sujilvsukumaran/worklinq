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
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none px-6">
            <div
                className="relative z-10 w-full max-w-3xl h-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 pointer-events-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Task</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle (e.target.value)}
                            placeholder="Enter task title"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus (e.target.value as any)}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition"
                        >
                            <option value="OPEN">Open</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="DONE">Done</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
                    >
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTaskModal;
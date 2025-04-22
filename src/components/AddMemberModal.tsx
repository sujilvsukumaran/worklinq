'use client';

import { useState } from 'react';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (name: string) => void;
};

const AddMemberModal = ({ isOpen, onClose, onAdd }: Props) => {
    const [name, setName] = useState('');

    const handleSubmit = () => {
        if (name.trim()) {
            onAdd(name.trim());
            setName('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Add Member</h2>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Member name"
                    className="border w-full mb-4 p-2 rounded"
                />

                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-1 border rounded">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMemberModal;
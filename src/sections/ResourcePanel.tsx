'use client';

import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Member, Task } from '@/types';
import  DraggableTask  from '@/components/DraggableTask';

type Props = {
    members: Member[];
    setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
};

const statusColors = {
    OPEN: 'bg-gray-300',
    IN_PROGRESS: 'bg-yellow-300',
    DONE: 'bg-green-300',
};

export default function ResourcePanel({ members, setMembers }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');

    const addMember = () => {
        if (!name.trim()) return;

        const newMember: Member = {
            id: Date.now().toString(),
            name,
            tasks: [],
        };
        setMembers((prev) => [...prev, newMember]);
        setName('');
        setShowModal(false);
    };

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Resources</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                    + Add Member
                </button>
            </div>

            <div className="space-y-3">
                {members.map((member) => (
                    <MemberBlock key={member.id} member={member} />
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm space-y-4">
                        <h3 className="text-lg font-semibold">Add Member</h3>
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-600 hover:underline"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addMember}
                                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

function MemberBlock({ member }: { member: Member }) {
    const { setNodeRef } = useDroppable({
        id: member.id,
    });

    return (
        <div
            ref={setNodeRef}
            className="border rounded px-4 py-3 bg-white shadow-sm"
        >
            <p className="font-semibold mb-1">{member.name}</p>
            {member.tasks.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No tasks assigned</p>
            ) : (
                member.tasks.map((task: Task) => (
                    <DraggableTask key={task.id} task={task} />
                ))
            )}
        </div>
    );
}
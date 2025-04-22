'use client';

import AddMemberModal from '@/components/AddMemberModal';

import { useState } from 'react';
import { Member } from '@/types';
import { useDroppable } from '@dnd-kit/core';

type Props = {
    members: Member[];
    setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
};

const ResourcePanel = ({ members, setMembers }: Props) => {

    const [showModal, setShowModal] = useState(false);

    const DroppableMember = ({ member }: { member: Member }) => {
        const { isOver, setNodeRef } = useDroppable({ id: member.id });

        return (
            <div
                ref={setNodeRef}
                className={`border rounded p-4 bg-gray-100 shadow-sm transition ${
                    isOver ? 'bg-green-100' : ''
                }`}
            >
                <h3 className="font-bold mb-2">{member.name}</h3>
                <div className="space-y-2">
                    {member.tasks.map((task) => (
                        <div key={task.id} className="bg-white px-3 py-2 rounded shadow text-sm">
                            <p className="font-medium">{task.title}</p>
                            <p className="text-xs text-gray-500">{task.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <section>
            <div className="flex items-center justify-between mb-4 mt-8">
                <h2 className="text-xl font-semibold">Resources</h2>
                <button
                    onClick={() => setShowModal (true)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
                    + Add Member
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map((member) => (
                    <DroppableMember key={member.id} member={member} />
                ))}
            </div>
            <AddMemberModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onAdd={(name) => {
                    const newMember = {
                        id: Date.now().toString(),
                        name,
                        tasks: [],
                    };
                    setMembers((prev) => [...prev, newMember]);
                }}
            />
        </section>
    );
};

export default ResourcePanel;
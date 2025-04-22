'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DndContext, DragOverlay } from '@dnd-kit/core';

import TaskPanel from '@/sections/TaskPanel';
import ResourcePanel from '@/sections/ResourcePanel';
import ClientOnly from '@/components/ClientOnly';
import { Task, Member } from '@/types';

export default function Home() {
    const router = useRouter();
    const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    const [unassignedTasks, setUnassignedTasks] = useState<Task[]>([]);
    const [members, setMembers] = useState<Member[]>([]);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    useEffect(() => {
        const authed = localStorage.getItem('isAuthenticated');
        const email = localStorage.getItem('userEmail');
        if (authed === 'true') {
            setIsAuthed(true);
            setUserEmail(email);
        } else {
            setIsAuthed(false);
            router.push('/auth');
        }
    }, [router]);

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const draggedTask = unassignedTasks.find((t) => t.id === active.id);
            if (!draggedTask) return;

            setUnassignedTasks((prev) => prev.filter((t) => t.id !== active.id));
            setMembers((prev) =>
                prev.map((member) =>
                    member.id === over.id
                        ? { ...member, tasks: [...member.tasks, draggedTask] }
                        : member
                )
            );
        }

        setActiveTask(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
        router.push('/auth');
    };

    if (isAuthed === false) return null; // Avoid flash

    return (
        <ClientOnly>
            <DndContext
                onDragStart={(event) => {
                    const taskId = event.active.id;
                    const task = unassignedTasks.find((t) => t.id === taskId);
                    if (task) setActiveTask(task);
                }}
                onDragEnd={handleDragEnd}
            >
                <main className="min-h-screen p-6 bg-white">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Worklinq</h1>
                        <div className="flex items-center gap-4">
                            {userEmail && (
                                <span className="text-sm text-gray-500">Signed in as {userEmail}</span>
                            )}
                            <button
                                onClick={handleLogout}
                                className="text-sm text-red-500 hover:text-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    <TaskPanel tasks={unassignedTasks} setTasks={setUnassignedTasks} />
                    <div className="my-6 border-t border-gray-300" />
                    <ResourcePanel members={members} setMembers={setMembers} />

                    <DragOverlay>
                        {activeTask ? (
                            <div className="border px-4 py-2 bg-white shadow-lg rounded pointer-events-none">
                                <p className="font-medium">{activeTask.title}</p>
                                <p className="text-sm text-gray-500">{activeTask.status}</p>
                            </div>
                        ) : null}
                    </DragOverlay>
                </main>
            </DndContext>
        </ClientOnly>
    );
}